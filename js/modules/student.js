/**
 * 学生学情档案与学时管理系统 (Student Archive & Learning Record System)
 * 《大学生创新创业基础》知识图谱智能体 v6.6 Refactored (2026.07.21)
 *
 * 新增功能：
 * - 花名册验证：学生必须在管理员导入的名单中才能登录
 * - 带密码保护的管理后台 API
 * - 全班学情数据聚合导出
 */

(function() {
    'use strict';

    window.IEKG = window.IEKG || {};

    // ─── Storage Key 常量 ───
    const STORAGE_KEY       = 'iekg_student_v2';      // 当前登录学生档案
    const SESSION_START_KEY = 'iekg_session_start';   // 当前会话开始时间戳
    const ROSTER_KEY        = 'iekg_roster_v1';       // 管理员导入的花名册
    const ADMIN_PWD_KEY     = 'iekg_admin_pwd';       // 管理员密码（哈希）
    const ALL_PROFILES_KEY  = 'iekg_all_profiles';    // 所有学生学情（多人共用设备时）

    // ─── 默认学生档案结构 ───
    function createDefaultProfile(studentId, name, className, college) {
        return {
            studentId, name,
            className: className || '',
            college:   college   || '',
            loginTime:  new Date().toISOString(),
            lastActive: new Date().toISOString(),
            totalMinutes: 0,
            sessions:       [],
            exploredNodes:  [],
            examRecords:    [],
            activityCount:  0,
            activityRecords:[],
            checkIns:       [],
            _verified: true,
        };
    }

    // ─── 简单哈希（防明文存储密码）───
    function simpleHash(str) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
        }
        return h.toString(36);
    }

    // ─── 花名册工具 ───
    var Roster = {
        get: function() {
            try { return JSON.parse(localStorage.getItem(ROSTER_KEY) || '[]'); }
            catch(e) { return []; }
        },
        save: function(list) {
            localStorage.setItem(ROSTER_KEY, JSON.stringify(list));
        },
        isEmpty: function() {
            return this.get().length === 0;
        },
        /** 验证：学号存在且姓名匹配，返回花名册条目或 null */
        verify: function(studentId, name) {
            if (this.isEmpty()) {
                // 未设置花名册 -> 全放行（兼容初期使用）
                return { studentId: studentId, name: name, className: '', college: '' };
            }
            var list = this.get();
            var sid  = String(studentId).trim();
            var nm   = String(name).trim().replace(/\s/g, '');
            for (var i = 0; i < list.length; i++) {
                var s = list[i];
                if (String(s.studentId).trim() === sid &&
                    String(s.name).trim().replace(/\s/g, '') === nm) {
                    return s;
                }
            }
            return null;
        },
        /** 解析 CSV 文本，返回花名册数组与清洗日志报告 */
        parseCSV: function(text) {
            if (!text) return [];
            // 替换全角逗号为半角逗号
            var cleanText = text.replace(/，/g, ',');
            var rawLines  = cleanText.trim().split(/\r?\n/).filter(function(l) { return l.trim(); });
            var result = [];
            var seenMap = {};
            
            if (rawLines.length === 0) return result;
            
            // 检测首行是否表头
            var firstCell = rawLines[0].split(',')[0].replace(/^"|"$/g,'').trim();
            var hasHeader = isNaN(firstCell) && firstCell.length < 8;
            var startIdx  = hasHeader ? 1 : 0;
            
            for (var i = startIdx; i < rawLines.length; i++) {
                var cols = rawLines[i].split(',').map(function(c){ return c.replace(/^"|"$/g,'').trim(); });
                if (!cols[0] || !cols[1]) continue;
                
                var sid = cols[0];
                var name = cols[1];
                
                // 去重机制
                if (seenMap[sid]) continue;
                seenMap[sid] = true;
                
                result.push({
                    studentId: sid,
                    name:      name,
                    className: cols[2] || '',
                    college:   cols[3] || '',
                });
            }
            return result;
        },
    };


    // ─── 管理员密码 ───
    var Admin = {
        hasPassword: function() { return !!localStorage.getItem(ADMIN_PWD_KEY); },
        setPassword: function(plain) {
            if (!plain || plain.length < 4) return false;
            localStorage.setItem(ADMIN_PWD_KEY, simpleHash(String(plain)));
            return true;
        },
        verify: function(plain) {
            var stored = localStorage.getItem(ADMIN_PWD_KEY);
            if (!stored) return true; // 未设置密码 -> 开放管理权限
            return stored === simpleHash(String(plain));
        },
    };

    // ─── 全班学情聚合（本机所有登录学生）───
    var AllProfiles = {
        get: function() {
            try { return JSON.parse(localStorage.getItem(ALL_PROFILES_KEY) || '{}'); }
            catch(e) { return {}; }
        },
        save: function(map) { localStorage.setItem(ALL_PROFILES_KEY, JSON.stringify(map)); },
        upsert: function(profile) {
            var map = this.get();
            map[profile.studentId] = profile;
            this.save(map);
        },
        list: function() { return Object.values(this.get()); },
    };

    // ─── 核心学生 API ───
    var StudentSystem = {

        // ── 读写 ──
        getProfile: function() {
            try {
                var raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return null;
                return JSON.parse(raw);
            } catch(e) { return null; }
        },

        saveProfile: function(profile) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
            AllProfiles.upsert(profile); // 同步到全班聚合
        },

        isLoggedIn: function() {
            var p = this.getProfile();
            return !!(p && p.studentId && p.name && p._verified);
        },

        // ── 登录（带花名册验证）──
        login: function(studentId, name, className, college) {
            studentId = String(studentId).trim();
            name      = String(name).trim();

            if (!studentId || !name) return { ok: false, msg: '学号和姓名不能为空！' };

            // ★ 花名册核验
            var rosterEntry = Roster.verify(studentId, name);
            if (!rosterEntry) {
                return {
                    ok: false,
                    msg: '❌ 学号或姓名与花名册不匹配，请核对后重新输入！\n如有问题请联系任课教师。'
                };
            }

            var autoClass   = className || rosterEntry.className || '';
            var autoCollege = college   || rosterEntry.college   || '';

            var profile = this.getProfile();
            var isNew   = !profile || profile.studentId !== studentId;

            if (isNew) {
                profile = createDefaultProfile(studentId, name, autoClass, autoCollege);
            } else {
                profile.name      = name;
                profile.className = autoClass   || profile.className;
                profile.college   = autoCollege || profile.college;
                profile._verified = true;
            }

            profile.lastActive = new Date().toISOString();
            this.saveProfile(profile);
            this.startSession();

            return { ok: true, isNew: isNew, profile: profile };
        },

        logout: function() {
            this.endSession();
            var p = this.getProfile();
            if (p) { p._verified = false; this.saveProfile(p); }
        },

        // ── 学时计时 ──
        startSession: function() {
            localStorage.setItem(SESSION_START_KEY, Date.now().toString());
        },

        endSession: function() {
            var startStr = localStorage.getItem(SESSION_START_KEY);
            if (!startStr) return;
            var minutes = Math.round((Date.now() - parseInt(startStr)) / 60000);
            if (minutes < 1) { localStorage.removeItem(SESSION_START_KEY); return; }
            var profile = this.getProfile();
            if (!profile) return;
            profile.totalMinutes = (profile.totalMinutes || 0) + minutes;
            profile.sessions     = profile.sessions || [];
            profile.sessions.push({ date: new Date().toLocaleDateString('zh-CN'), minutes: minutes, timestamp: new Date().toISOString() });
            if (profile.sessions.length > 100) profile.sessions = profile.sessions.slice(-100);
            this.saveProfile(profile);
            localStorage.removeItem(SESSION_START_KEY);
        },

        getCurrentSessionMinutes: function() {
            var s = localStorage.getItem(SESSION_START_KEY);
            if (!s) return 0;
            return Math.round((Date.now() - parseInt(s)) / 60000);
        },

        // ── 记录（仅已登录）──
        _requireLogin: function(op) {
            if (!this.isLoggedIn()) {
                if (typeof showToast === 'function') showToast('⚠️ 请先登录后再使用记录功能！');
                return false;
            }
            return true;
        },

        recordExamScore: function(score, dimension, details) {
            if (!this._requireLogin('recordExamScore')) return;
            var p = this.getProfile();
            p.examRecords = p.examRecords || [];
            p.examRecords.push({ date: new Date().toLocaleDateString('zh-CN'), timestamp: new Date().toISOString(), score: score, dimension: dimension || '综合测评', details: details || null });
            if (p.examRecords.length > 50) p.examRecords = p.examRecords.slice(-50);
            this.saveProfile(p);
            localStorage.setItem('ag_exam_score', score.toString());
        },

        recordNodeExplored: function(nodeId) {
            if (!this._requireLogin('recordNodeExplored')) return;
            var p = this.getProfile();
            p.exploredNodes = p.exploredNodes || [];
            if (!p.exploredNodes.includes(String(nodeId))) {
                p.exploredNodes.push(String(nodeId));
                this.saveProfile(p);
                localStorage.setItem('ag_explored_nodes', JSON.stringify(p.exploredNodes));
            }
        },

        recordActivity: function(activityName) {
            if (!this._requireLogin('recordActivity')) return;
            var p = this.getProfile();
            p.activityCount   = (p.activityCount || 0) + 1;
            p.activityRecords = p.activityRecords || [];
            p.activityRecords.push({ date: new Date().toLocaleDateString('zh-CN'), name: activityName || '闪电活动', timestamp: new Date().toISOString() });
            this.saveProfile(p);
            localStorage.setItem('ag_activity_count', p.activityCount.toString());
        },

        checkIn: function() {
            if (!this._requireLogin('checkIn')) return { ok: false, msg: '请先登录后再签到！' };
            var p     = this.getProfile();
            var today = new Date().toLocaleDateString('zh-CN');
            p.checkIns = p.checkIns || [];
            if (p.checkIns.includes(today)) return { ok: false, msg: '今日已签到！' };
            p.checkIns.push(today);
            this.saveProfile(p);
            return { ok: true, msg: '签到成功！今日打卡完成 ✅' };
        },

        // ── OBE 成绩计算 ──
        calcOBEScore: function(profile) {
            if (!profile) profile = this.getProfile();
            if (!profile) return { regular: 0, mid: 0, final: 0, total: 0 };
            var explored     = (profile.exploredNodes  || []).length;
            var actCount     = profile.activityCount   || 0;
            var examRecords  = profile.examRecords      || [];
            var nodeScore    = Math.min(55, Math.round((explored / 18) * 55));
            var actScore     = Math.min(45, actCount * 8);
            var regular      = Math.min(100, nodeScore + actScore);
            var mid          = Math.min(100, 70 + Math.round((explored / 18) * 30));
            var finalScore   = examRecords.length > 0 ? Math.max.apply(null, examRecords.map(function(r){ return r.score; })) : 0;
            var total        = Math.round(regular * 0.3 + mid * 0.3 + finalScore * 0.4);
            return { regular: regular, mid: mid, final: finalScore, total: total };
        },

        // ── 导出 ──
        exportJSON: function() {
            var p = this.getProfile();
            if (!p) { alert('请先登录后再导出！'); return; }
            var obe      = this.calcOBEScore(p);
            var totalMin = (p.totalMinutes || 0) + this.getCurrentSessionMinutes();
            var data = {
                system: '《大学生创新创业基础》PBL精品课程智能体 v6.6 Refactored (2026.07.21)',
                exportTime: new Date().toLocaleString('zh-CN'),
                studentInfo: { studentId: p.studentId, name: p.name, className: p.className, college: p.college, firstLogin: p.loginTime },
                learningRecord: { totalMinutes: totalMin, totalHours: (totalMin/60).toFixed(1), sessions: p.sessions, checkIns: p.checkIns||[] },
                explorationRecord: { exploredCount: (p.exploredNodes||[]).length, totalNodes: 18, exploredNodes: p.exploredNodes||[] },
                examRecord: { attempts: (p.examRecords||[]).length, records: p.examRecords||[] },
                activityRecord: { count: p.activityCount||0, records: p.activityRecords||[] },
                obeScore: { regular_30: obe.regular, mid_30: obe.mid, final_40: obe.final, total: obe.total }
            };
            _download(JSON.stringify(data, null, 2), '\u53cc\u521b\u91d1\u8bfe_\u6863\u6848_' + p.name + '_' + p.studentId + '.json', 'application/json');
        },

        exportCSV: function() {
            var p = this.getProfile();
            if (!p) { alert('请先登录后再导出！'); return; }
            _exportProfileCSV([p], this);
        },

        printReport: function() {
            var p = this.getProfile();
            if (!p) { alert('请先登录后再打印！'); return; }
            var obe      = this.calcOBEScore(p);
            var totalMin = (p.totalMinutes||0) + this.getCurrentSessionMinutes();
            var best     = (p.examRecords||[]).length > 0 ? Math.max.apply(null, p.examRecords.map(function(r){ return r.score; })) : '--';
            _openPrintWindow(p, obe, totalMin, best);
        },

        // ── 管理员 API ──
        admin: {
            verify:         function(pwd)  { return Admin.verify(pwd); },
            setPassword:    function(pwd)  { return Admin.setPassword(pwd); },
            hasPassword:    function()     { return Admin.hasPassword(); },
            getRoster:      function()     { return Roster.get(); },
            saveRoster:     function(list) { Roster.save(list); },
            parseCSV:       function(text) { return Roster.parseCSV(text); },
            isRosterEnabled:function()     { return !Roster.isEmpty(); },
            getAllProfiles:  function()     { return AllProfiles.list(); },
            exportAllCSV:   function()     { _exportProfileCSV(AllProfiles.list(), StudentSystem); },
            clearRoster:    function()     { localStorage.removeItem(ROSTER_KEY); },
            clearAllData:   function()     { localStorage.removeItem(ALL_PROFILES_KEY); },
        },
    };

    // ─── 私有工具函数 ───
    function _download(content, filename, mime) {
        var blob = new Blob([content], { type: mime });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    }

    function _exportProfileCSV(profiles, sys) {
        var headers = ['学号','姓名','专业班级','学院','累计学时(h)','已探索节点','测评次数','最高成绩','活动次数','打卡次数','平时分(30%)','期中分(30%)','期末分(40%)','OBE总评','等级'];
        var rows = profiles.map(function(p) {
            var obe      = sys.calcOBEScore(p);
            var totalMin = p.totalMinutes || 0;
            var best     = (p.examRecords||[]).length > 0 ? Math.max.apply(null, p.examRecords.map(function(r){ return r.score; })) : 0;
            return [
                p.studentId, p.name, p.className||'', p.college||'',
                (totalMin/60).toFixed(1), (p.exploredNodes||[]).length,
                (p.examRecords||[]).length, best,
                p.activityCount||0, (p.checkIns||[]).length,
                obe.regular, obe.mid, obe.final, obe.total,
                obe.total>=90?'A优秀':obe.total>=80?'B良好':obe.total>=70?'C中等':obe.total>=60?'D合格':'F不合格'
            ].join(',');
        });
        var csv = '\uFEFF' + headers.join(',') + '\n' + rows.join('\n');
        _download(csv, '\u53cc\u521b\u91d1\u8bfe_\u5168\u73ed\u6210\u7ee9\u5355_' + new Date().toISOString().slice(0,10) + '.csv', 'text/csv;charset=utf-8');
    }

    function _openPrintWindow(profile, obe, totalMin, bestScore) {
        var win = window.open('', '_blank');
        var gradeColor = obe.total>=80 ? '#16a34a' : obe.total>=60 ? '#ca8a04' : '#dc2626';
        var gradeText  = obe.total>=90 ? 'A 优秀' : obe.total>=80 ? 'B 良好' : obe.total>=70 ? 'C 中等' : obe.total>=60 ? 'D 合格' : 'F 不合格';
        var examRows = (profile.examRecords||[]).slice(-10).map(function(r){
            return '<tr><td>' + r.date + ' - ' + r.dimension + '</td><td>' + r.score + '分</td></tr>';
        }).join('') || '<tr><td colspan="2" style="text-align:center;color:#94a3b8;">暂无测评记录</td></tr>';

        win.document.write('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>学情报告单 - ' + profile.name + '</title><style>body{font-family:\'Microsoft YaHei\',sans-serif;max-width:800px;margin:20px auto;color:#0f172a;font-size:14px;}h1{text-align:center;font-size:22px;border-bottom:2px solid #0284c7;padding-bottom:12px;margin-bottom:16px;}.sub{text-align:center;color:#64748b;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin:14px 0;}th{background:#0284c7;color:#fff;padding:9px 12px;text-align:left;}td{padding:8px 12px;border:1px solid #e2e8f0;}tr:nth-child(even){background:#f8fafc;}.big{font-size:48px;font-weight:900;color:#0284c7;text-align:center;margin:16px 0 4px;}.grade{font-size:22px;font-weight:800;text-align:center;margin-bottom:20px;color:' + gradeColor + ';}.seal{border:2px dashed #94a3b8;border-radius:8px;padding:20px;text-align:center;color:#94a3b8;font-size:12px;margin-top:20px;height:80px;}.foot{text-align:center;font-size:11px;color:#94a3b8;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:10px;}@media print{button{display:none;}}</style></head><body>'
            + '<h1>《大学生创新创业基础》学情评估报告单</h1>'
            + '<div class="sub">生成时间：' + new Date().toLocaleString('zh-CN') + ' | 双创精品课程智能体 v6.6 Refactored (2026.07.21)</div>'
            + '<div class="big">' + obe.total + '</div>'
            + '<div class="grade">' + gradeText + '</div>'
            + '<table><tr><th colspan="2">学生基本信息</th></tr>'
            + '<tr><td>学号</td><td>' + profile.studentId + '</td></tr>'
            + '<tr><td>姓名</td><td>' + profile.name + '</td></tr>'
            + '<tr><td>专业班级</td><td>' + (profile.className||'未填写') + '</td></tr>'
            + '<tr><td>学院</td><td>' + (profile.college||'未填写') + '</td></tr>'
            + '<tr><td>首次登录</td><td>' + (profile.loginTime ? new Date(profile.loginTime).toLocaleDateString('zh-CN') : '--') + '</td></tr></table>'
            + '<table><tr><th colspan="2">学习学时记录</th></tr>'
            + '<tr><td>累计学习时长</td><td><strong>' + (totalMin/60).toFixed(1) + ' 学时</strong>（' + totalMin + ' 分钟）</td></tr>'
            + '<tr><td>学习会话次数</td><td>' + (profile.sessions||[]).length + ' 次</td></tr>'
            + '<tr><td>签到打卡次数</td><td>' + (profile.checkIns||[]).length + ' 次</td></tr>'
            + '<tr><td>签到日期（最近10次）</td><td>' + ((profile.checkIns||[]).slice(-10).join('、')||'暂无') + '</td></tr></table>'
            + '<table><tr><th colspan="2">知识探索与活动</th></tr>'
            + '<tr><td>已探索PBL节点</td><td>' + (profile.exploredNodes||[]).length + '/18（完成率 ' + Math.round(((profile.exploredNodes||[]).length/18)*100) + '%）</td></tr>'
            + '<tr><td>闪电活动参与</td><td>' + (profile.activityCount||0) + ' 次</td></tr>'
            + '<tr><td>综合测评次数</td><td>' + (profile.examRecords||[]).length + ' 次</td></tr>'
            + '<tr><td>最高测评成绩</td><td><strong>' + bestScore + ' 分</strong></td></tr></table>'
            + '<table><tr><th colspan="2">OBE 成果导向成绩</th></tr>'
            + '<tr><td>平时表现分（30%）</td><td>' + obe.regular + ' 分</td></tr>'
            + '<tr><td>期中MVP成果分（30%）</td><td>' + obe.mid + ' 分</td></tr>'
            + '<tr><td>期末综合测试分（40%）</td><td>' + (obe.final||'--') + ' 分</td></tr>'
            + '<tr><td><strong>OBE综合总评</strong></td><td><strong>' + obe.total + ' 分</strong></td></tr></table>'
            + '<table><tr><th>测评历史（最近10次）</th><th>得分</th></tr>' + examRows + '</table>'
            + '<div class="seal">任课教师审核盖章处<br/><br/>签字：_______________　　日期：______年___月___日</div>'
            + '<div class="foot">本报告由《大学生创新创业基础》PBL精品课程智能体系统自动生成，仅供参考，以教务系统为准。</div>'
            + '<div style="text-align:center;margin-top:20px;"><button onclick="window.print()" style="background:#0284c7;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:14px;cursor:pointer;font-weight:700;">🖨️ 打印 / 导出 PDF</button></div>'
            + '</body></html>');
        win.document.close();
    }

    // ─── 挂载至全局命名空间 ───
    window.IEKG.student = StudentSystem;

    // ─── 全局快捷别名 ───
    window.studentLogin       = function(id, nm, cls, col) { return StudentSystem.login(id, nm, cls, col); };
    window.studentLogout      = function() { StudentSystem.logout(); };
    window.getStudentProfile  = function() { return StudentSystem.getProfile(); };
    window.isStudentLoggedIn  = function() { return StudentSystem.isLoggedIn(); };
    window.recordExamScore    = function(s, d, det) { StudentSystem.recordExamScore(s, d, det); };
    window.recordNodeExplored = function(id) { StudentSystem.recordNodeExplored(id); };
    window.studentCheckIn     = function() { return StudentSystem.checkIn(); };
    window.exportStudentJSON  = function() { StudentSystem.exportJSON(); };
    window.exportStudentCSV   = function() { StudentSystem.exportCSV(); };
    window.printStudentReport = function() { StudentSystem.printReport(); };

    // ─── 页面关闭前保存会话 ───
    window.addEventListener('beforeunload', function() {
        if (StudentSystem.isLoggedIn()) StudentSystem.endSession();
    });

    // ─── 页面加载时恢复计时 ───
    document.addEventListener('DOMContentLoaded', function() {
        if (StudentSystem.isLoggedIn()) {
            var p = StudentSystem.getProfile();
            p.lastActive = new Date().toISOString();
            StudentSystem.saveProfile(p);
            StudentSystem.startSession();
            localStorage.setItem('ag_student_id', p.studentId);
            localStorage.setItem('ag_student_name', p.name);
            if (p.exploredNodes) localStorage.setItem('ag_explored_nodes', JSON.stringify(p.exploredNodes));
        }
    });

})();

    // ─── Dynamic OBE Assessment Calculation Model ───
    function calculateOBERatings() {
        let explored = [];
        try {
            explored = JSON.parse(localStorage.getItem('ag_explored_nodes') || '[]');
        } catch (e) {}
        
        let quizScore = 0;
        try {
            quizScore = parseInt(localStorage.getItem('ag_last_quiz_score') || '0', 10);
        } catch (e) {}
        
        let taskCount = 0;
        try {
            taskCount = JSON.parse(localStorage.getItem('ag_completed_tasks') || '[]').length;
        } catch (e) {}

        const clo1 = Math.min(100, Math.max(55, Math.round((explored.length / 18) * 40 + (quizScore / 100) * 50 + 20)));
        const clo2 = Math.min(100, Math.max(60, Math.round((explored.length / 18) * 80 + 20)));
        const clo3 = Math.min(100, Math.max(50, Math.round((taskCount / 6) * 70 + 30)));
        const clo4 = Math.min(100, Math.max(65, Math.round((quizScore > 0 ? quizScore : 75) * 0.6 + (explored.length * 2) + 20)));
        const clo5 = Math.min(100, Math.max(58, quizScore > 0 ? quizScore : 70));
        const clo6 = Math.min(100, Math.max(62, Math.round((explored.length / 18) * 45 + (taskCount / 6) * 45 + 25)));

        return [clo1, clo2, clo3, clo4, clo5, clo6];
    }

    // ─── 能力拆解与蜘蛛网/雷达图多维度渲染 ───
    var CAPABILITY_DIMENSIONS = [
        {
            key: 'clo1',
            name: 'CLO1: 痛点识别与需求定义',
            shortName: '需求定义',
            icon: 'fa-bullseye',
            desc: '能够精准捕捉用户真实痛点与真伪需求，具备问卷设计、深度访谈、痛点卡片建模与竞品痛点分析能力。',
            category: 'academic',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '具备独创性需求挖掘方法与痛点验证模型', advise: '可带领团队进行复杂市场验证' },
                { min: 80, name: 'L4 精通级', desc: '能熟练运用访谈法与痛点卡片定位精准需求', advise: '结合商业模式进行二次验证' },
                { min: 70, name: 'L3 熟练级', desc: '掌握基础需求挖掘工具，能识别显性痛点', advise: '强化伪需求甄别与深度访谈技巧' },
                { min: 0,  name: 'L2 入门级', desc: '理解需求定义概念，需在实践中进一步锻炼', advise: '建议多完成图谱前置理论节点' }
            ]
        },
        {
            key: 'clo2',
            name: 'CLO2: 商业模式构架与设计',
            shortName: '模式设计',
            icon: 'fa-cubes',
            desc: '掌握精益商业模式图谱九大要素，能够设计可行性商业闭环，完成价值主张、客户细分与渠道通路规划。',
            category: 'academic',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '精通多边平台与订阅制等创新商业模式设计', advise: '可进行跨界商业模式创新' },
                { min: 80, name: 'L4 精通级', desc: '独立完成商业模式画布，逻辑清晰可行', advise: '加强成本结构与收入流的精细测算' },
                { min: 70, name: 'L3 熟练级', desc: '理解画布基本组件，能完成标准模式梳理', advise: '深入研究标杆企业商业模式案例' },
                { min: 0,  name: 'L2 入门级', desc: '对商业模式概念有初步认知', advise: '推荐学习商业模式九要素核心课程' }
            ]
        },
        {
            key: 'clo3',
            name: 'CLO3: MVP构建与敏捷验证',
            shortName: 'MVP验证',
            icon: 'fa-rocket',
            desc: '具备最小可行性产品（MVP）定义、快速原型搭建、黑盒测试及基于 Build-Measure-Learn 循环的敏捷迭代能力。',
            category: 'practical',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '极速打造极简 MVP 并完成高转化验证闭环', advise: '可探索无代码工具提升搭建效率' },
                { min: 80, name: 'L4 精通级', desc: '能合理拆解核心功能，快速推出原型试错', advise: '优化数据埋点与用户反馈收集机制' },
                { min: 70, name: 'L3 熟练级', desc: '理解 MVP 原理，能制作低保真原型', advise: '控制研发成本，聚焦核心价值点' },
                { min: 0,  name: 'L2 入门级', desc: '掌握原型制作基础', advise: '参考案例库中的经典 MVP 验证路径' }
            ]
        },
        {
            key: 'clo4',
            name: 'CLO4: 团队管理与股权治理',
            shortName: '团队股权',
            icon: 'fa-users-cog',
            desc: '理解创业团队组建原则、互补性人才匹配、动态股权分配机制（如 1/n 动态股权与期权池设定）及风险防控。',
            category: 'academic',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '具备成熟合伙人协议拟定与股权架构设计能力', advise: '关注后续融资中的股权稀释防范' },
                { min: 80, name: 'L4 精通级', desc: '合理搭建初创团队，制定公平股权激励机制', advise: '完善团队考核与退出现权机制' },
                { min: 70, name: 'L3 熟练级', desc: '了解常见股权分配模型，注重团队协作', advise: '学习创业团队避坑指南与法律风险' },
                { min: 0,  name: 'L2 入门级', desc: '具备基本的团队合作意识', advise: '参阅团队治理与股权计算工具' }
            ]
        },
        {
            key: 'clo5',
            name: 'CLO5: 财务测算与 BP 撰写',
            shortName: '财务BP',
            icon: 'fa-file-invoice-dollar',
            desc: '熟练进行启动资金预算、损益表/现金流预测、盈亏平衡点计算及高质量商业计划书（BP）的结构化撰写。',
            category: 'practical',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '财务模型严密，BP 具备极强投融资说服力', advise: '可对接真实投资机构路演评审' },
                { min: 80, name: 'L4 精通级', desc: '财务数据推演合理，BP 逻辑严密图文并茂', advise: '精简 BP 结构，突出核心亮点' },
                { min: 70, name: 'L3 熟练级', desc: '能完成基础财务测算与标准格式 BP', advise: '加强现金流预测与风险控制分析' },
                { min: 0,  name: 'L2 入门级', desc: '掌握财务基本概念', advise: '建议多使用离线财务测算工具' }
            ]
        },
        {
            key: 'clo6',
            name: 'CLO6: 路演表达与防守问答',
            shortName: '路演答辩',
            icon: 'fa-microphone-alt',
            desc: '具备 5 分钟精益路演 Presentation 能力，擅长 PPT 视觉叙事、现场情绪把控及面对专家评委的犀利防守问答。',
            category: 'practical',
            levels: [
                { min: 90, name: 'L5 专家级', desc: '路演感染力强，问答对答如流，具备金奖水准', advise: '保持自信心态，参加省国赛选拔' },
                { min: 80, name: 'L4 精通级', desc: '表达流畅重点突出，能够从容应答常见提问', advise: '强化应对突发与质疑问题的技巧' },
                { min: 70, name: 'L3 熟练级', desc: '能完整陈述项目内容，PPT 排版规范', advise: '多进行模拟演练，提升临场应变' },
                { min: 0,  name: 'L2 入门级', desc: '完成基本汇报演练', advise: '推荐观摩全国金奖项目路演视频' }
            ]
        }
    ];

    window.initStudentRadarChart = function(filterCategory) {
        var container = document.getElementById('radar-chart-container');
        if (!container || typeof echarts === 'undefined') return;

        if (window.studentRadarChartInstance) {
            window.studentRadarChartInstance.dispose();
        }

        var instance = echarts.init(container);
        window.studentRadarChartInstance = instance;

        var scores = calculateOBERatings();
        var isDay = document.body.classList.contains('day-mode') || document.body.classList.contains('light-mode');
        var textColor = isDay ? '#1e293b' : '#f8fafc';
        var splitLineColor = isDay ? 'rgba(37, 99, 235, 0.2)' : 'rgba(0, 229, 255, 0.2)';
        var areaColor = isDay ? 'rgba(37, 99, 235, 0.25)' : 'rgba(0, 229, 255, 0.25)';
        var lineColor = isDay ? '#2563eb' : '#00e5ff';

        var filteredDims = CAPABILITY_DIMENSIONS.filter(function(d) {
            return !filterCategory || filterCategory === 'all' || d.category === filterCategory;
        });

        var indicators = filteredDims.map(function(d) {
            return { name: d.shortName, max: 100 };
        });

        var values = filteredDims.map(function(d) {
            var idx = CAPABILITY_DIMENSIONS.findIndex(function(item) { return item.key === d.key; });
            return scores[idx] || 75;
        });

        var option = {
            tooltip: {
                trigger: 'item',
                backgroundColor: isDay ? '#ffffff' : '#0f172a',
                borderColor: isDay ? '#e2e8f0' : '#334155',
                textStyle: { color: textColor, fontSize: 12 }
            },
            radar: {
                indicator: indicators,
                radius: '68%',
                center: ['50%', '52%'],
                splitNumber: 4,
                axisName: {
                    color: textColor,
                    fontSize: 12,
                    fontWeight: '600'
                },
                splitLine: { lineStyle: { color: splitLineColor } },
                splitArea: {
                    areaStyle: {
                        color: isDay 
                            ? ['rgba(241,245,249,0.5)', 'rgba(226,232,240,0.5)'] 
                            : ['rgba(30,41,59,0.4)', 'rgba(15,23,42,0.4)']
                    }
                }
            },
            series: [{
                type: 'radar',
                data: [{
                    value: values,
                    name: '学生核心能力得分',
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: { color: lineColor },
                    lineStyle: { width: 2, color: lineColor },
                    areaStyle: { color: areaColor }
                }]
            }]
        };

        instance.setOption(option);

        // 渲染能力简明卡片网格
        renderCapabilityListGrid(scores);
        // 默认显示第一个维度的详细分析
        updateCapabilityDetailCard(0, scores[0]);

        // 点击图谱事件
        instance.on('click', function(params) {
            if (params && params.name) {
                var idx = filteredDims.findIndex(function(d) { return d.shortName === params.name; });
                if (idx !== -1) {
                    var fullIdx = CAPABILITY_DIMENSIONS.findIndex(function(d) { return d.key === filteredDims[idx].key; });
                    updateCapabilityDetailCard(fullIdx, scores[fullIdx]);
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.studentRadarChartInstance) window.studentRadarChartInstance.resize();
        });
    };

    function renderCapabilityListGrid(scores) {
        var grid = document.getElementById('capability-list-grid');
        if (!grid) return;

        grid.innerHTML = CAPABILITY_DIMENSIONS.map(function(d, index) {
            var score = scores[index] || 75;
            var badgeClass = score >= 90 ? 'score-a' : score >= 80 ? 'score-b' : score >= 70 ? 'score-c' : 'score-d';
            return '<div onclick="selectCapabilityDimension(' + index + ')" class="cap-item-card" id="cap-card-' + index + '" style="background:var(--card-bg); padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); cursor:pointer; transition:all 0.2s; display:flex; justify-content:space-between; align-items:center;">' +
                '<div style="display:flex; align-items:center; gap:8px;">' +
                    '<i class="fas ' + d.icon + '" style="color:var(--primary-blue); font-size:14px;"></i>' +
                    '<span style="font-size:12.5px; font-weight:600; color:var(--text-main);">' + d.shortName + '</span>' +
                '</div>' +
                '<span class="score-badge ' + badgeClass + '" style="font-size:11px; padding:2px 8px;">' + score + '分</span>' +
            '</div>';
        }).join('');
    }

    window.selectCapabilityDimension = function(index) {
        var scores = calculateOBERatings();
        updateCapabilityDetailCard(index, scores[index]);
        // 突出显示选中的卡片
        var cards = document.querySelectorAll('.cap-item-card');
        cards.forEach(function(c, i) {
            if (i === index) {
                c.style.borderColor = 'var(--primary-blue)';
                c.style.background = 'var(--bg-muted)';
            } else {
                c.style.borderColor = 'var(--border-color)';
                c.style.background = 'var(--card-bg)';
            }
        });
    };

    function updateCapabilityDetailCard(index, score) {
        var d = CAPABILITY_DIMENSIONS[index];
        if (!d) return;

        score = score || 75;
        var levelObj = d.levels.find(function(l) { return score >= l.min; }) || d.levels[d.levels.length - 1];

        var titleEl = document.getElementById('cap-detail-title');
        var scoreEl = document.getElementById('cap-detail-score');
        var descEl = document.getElementById('cap-detail-desc');
        var levelEl = document.getElementById('cap-detail-level');
        var levelDescEl = document.getElementById('cap-detail-level-desc');
        var adviseEl = document.getElementById('cap-detail-advise');

        var badgeClass = score >= 90 ? 'score-a' : score >= 80 ? 'score-b' : score >= 70 ? 'score-c' : 'score-d';
        var statusLabel = score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 70 ? '中等' : '需提升';

        if (titleEl) titleEl.innerHTML = '<span><i class="fas ' + d.icon + '" style="color:var(--primary-blue); margin-right:6px;"></i> ' + d.name + '</span>';
        if (scoreEl) {
            scoreEl.className = 'score-badge ' + badgeClass;
            scoreEl.textContent = '得分：' + score + '分 (' + statusLabel + ')';
        }
        if (descEl) descEl.textContent = d.desc;
        if (levelEl) levelEl.textContent = levelObj.name;
        if (levelDescEl) levelDescEl.textContent = levelObj.desc;
        if (adviseEl) adviseEl.textContent = levelObj.advise;
    }

    window.switchRadarDimension = function(cat) {
        var btns = document.querySelectorAll('.radar-btn');
        btns.forEach(function(b) {
            b.style.background = 'var(--card-bg)';
            b.style.color = 'var(--text-sub)';
        });

        var activeBtn = document.getElementById('btn-radar-' + cat);
        if (activeBtn) {
            activeBtn.style.background = 'var(--primary-blue)';
            activeBtn.style.color = '#fff';
        }

        window.initStudentRadarChart(cat);
    };

    // 页面加载完成后自动初始化雷达图
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            if (typeof window.initStudentRadarChart === 'function') {
                window.initStudentRadarChart('all');
            }
        }, 300);
    });
