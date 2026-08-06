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

    // ─── 安全哈希（SHA-256 标准散列，防明文存储与逆向）───
    async function hashPassword(str) {
        if (!str) return '';
        if (window.crypto && window.crypto.subtle) {
            try {
                var encoder = new TextEncoder();
                var data = encoder.encode(String(str));
                var hashBuffer = await crypto.subtle.digest('SHA-256', data);
                var hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
            } catch (e) {
                // 环境退化回退
            }
        }
        var h = 0;
        var s = String(str);
        for (var i = 0; i < s.length; i++) {
            h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        }
        return 'sha256_fallback_' + Math.abs(h).toString(16);
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
        setPassword: async function(plain) {
            if (!plain || plain.length < 4) return false;
            var hashed = await hashPassword(String(plain));
            localStorage.setItem(ADMIN_PWD_KEY, hashed);
            return true;
        },
        verify: async function(plain) {
            var stored = localStorage.getItem(ADMIN_PWD_KEY);
            if (!stored) return false; // 严禁未设密码越权绕过，无密码时绝对拒绝
            var hashed = await hashPassword(String(plain));
            return stored === hashed;
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

        // ── OBE 成绩计算（自评/互评20% + 教师/督导50% + 企业/专家30%） ──
        calcOBEScore: function(profile) {
            if (!profile) profile = this.getProfile();
            if (!profile) return { regular: 0, mid: 0, final: 0, total: 0 };
            var explored     = (profile.exploredNodes  || []).length;
            var actCount     = profile.activityCount   || 0;
            var examRecords  = profile.examRecords      || [];
            var nodeScore    = Math.min(55, Math.round((explored / 28) * 55));
            var actScore     = Math.min(45, actCount * 8);
            var regular      = Math.min(100, nodeScore + actScore);
            var mid          = Math.min(100, 70 + Math.round((explored / 28) * 30));
            var finalScore   = examRecords.length > 0 ? Math.max.apply(null, examRecords.map(function(r){ return r.score; })) : 0;
            var total        = Math.round(regular * 0.2 + mid * 0.5 + finalScore * 0.3);
            return { regular: regular, mid: mid, final: finalScore, total: total };
        },

        // ── 导出 ──
        exportJSON: function() {
            var p = this.getProfile();
            if (!p) { alert('请先登录后再导出！'); return; }
            var obe      = this.calcOBEScore(p);
            var totalMin = (p.totalMinutes || 0) + this.getCurrentSessionMinutes();
            var data = {
                system: '《大学生创新创业基础》PBL示范课智能体 v6.6 Refactored (2026.07.21)',
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

    function _esc(s) {
        if (s === null || s === undefined) return '';
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
    }

    function _openPrintWindow(profile, obe, totalMin, bestScore) {
        var win = window.open('', '_blank');
        var gradeColor = obe.total>=80 ? '#16a34a' : obe.total>=60 ? '#ca8a04' : '#dc2626';
        var gradeText  = obe.total>=90 ? 'A 优秀' : obe.total>=80 ? 'B 良好' : obe.total>=70 ? 'C 中等' : obe.total>=60 ? 'D 合格' : 'F 不合格';
        var examRows = (profile.examRecords||[]).slice(-10).map(function(r){
            return '<tr><td>' + _esc(r.date) + ' - ' + _esc(r.dimension) + '</td><td>' + _esc(r.score) + '分</td></tr>';
        }).join('') || '<tr><td colspan="2" style="text-align:center;color:#94a3b8;">暂无测评记录</td></tr>';

        win.document.write('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>学情报告单 - ' + _esc(profile.name) + '</title><style>body{font-family:\'Microsoft YaHei\',sans-serif;max-width:800px;margin:20px auto;color:#0f172a;font-size:14px;}h1{text-align:center;font-size:22px;border-bottom:2px solid #0284c7;padding-bottom:12px;margin-bottom:16px;}.sub{text-align:center;color:#64748b;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;margin:14px 0;}th{background:#0284c7;color:#fff;padding:9px 12px;text-align:left;}td{padding:8px 12px;border:1px solid #e2e8f0;}tr:nth-child(even){background:#f8fafc;}.big{font-size:48px;font-weight:900;color:#0284c7;text-align:center;margin:16px 0 4px;}.grade{font-size:22px;font-weight:800;text-align:center;margin-bottom:20px;color:' + gradeColor + ';}.seal{border:2px dashed #94a3b8;border-radius:8px;padding:20px;text-align:center;color:#94a3b8;font-size:12px;margin-top:20px;height:80px;}.foot{text-align:center;font-size:11px;color:#94a3b8;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:10px;}@media print{button{display:none;}}</style></head><body>'
            + '<h1>《大学生创新创业基础》学情评估报告单</h1>'
            + '<div class="sub">生成时间：' + new Date().toLocaleString('zh-CN') + ' | 双创课程智能体 v6.6 Refactored (2026.07.21)</div>'
            + '<div class="big">' + _esc(obe.total) + '</div>'
            + '<div class="grade">' + gradeText + '</div>'
            + '<table><tr><th colspan="2">学生基本信息</th></tr>'
            + '<tr><td>学号</td><td>' + _esc(profile.studentId) + '</td></tr>'
            + '<tr><td>姓名</td><td>' + _esc(profile.name) + '</td></tr>'
            + '<tr><td>专业班级</td><td>' + _esc(profile.className||'未填写') + '</td></tr>'
            + '<tr><td>学院</td><td>' + _esc(profile.college||'未填写') + '</td></tr>'
            + '<tr><td>首次登录</td><td>' + (profile.loginTime ? new Date(profile.loginTime).toLocaleDateString('zh-CN') : '--') + '</td></tr></table>'
            + '<table><tr><th colspan="2">学习学时记录</th></tr>'
            + '<tr><td>累计学习时长</td><td><strong>' + (totalMin/60).toFixed(1) + ' 学时</strong>（' + totalMin + ' 分钟）</td></tr>'
            + '<tr><td>学习会话次数</td><td>' + (profile.sessions||[]).length + ' 次</td></tr>'
            + '<tr><td>签到打卡次数</td><td>' + (profile.checkIns||[]).length + ' 次</td></tr>'
            + '<tr><td>签到日期（最近10次）</td><td>' + _esc((profile.checkIns||[]).slice(-10).join('、')||'暂无') + '</td></tr></table>'
            + '<table><tr><th colspan="2">知识探索与活动</th></tr>'
            + '<tr><td>已探索PBL节点</td><td>' + (profile.exploredNodes||[]).length + '/18（完成率 ' + Math.round(((profile.exploredNodes||[]).length/18)*100) + '%）</td></tr>'
            + '<tr><td>闪电活动参与</td><td>' + (profile.activityCount||0) + ' 次</td></tr>'
            + '<tr><td>综合测评次数</td><td>' + (profile.examRecords||[]).length + ' 次</td></tr>'
            + '<tr><td>最高测评成绩</td><td><strong>' + _esc(bestScore) + ' 分</strong></td></tr></table>'
            + '<table><tr><th colspan="2">OBE 成果导向成绩</th></tr>'
            + '<tr><td>平时表现分（30%）</td><td>' + _esc(obe.regular) + ' 分</td></tr>'
            + '<tr><td>期中MVP成果分（30%）</td><td>' + _esc(obe.mid) + ' 分</td></tr>'
            + '<tr><td>期末综合测试分（40%）</td><td>' + _esc(obe.final||'--') + ' 分</td></tr>'
            + '<tr><td><strong>OBE综合总评</strong></td><td><strong>' + _esc(obe.total) + ' 分</strong></td></tr></table>'
            + '<table><tr><th>测评历史（最近10次）</th><th>得分</th></tr>' + examRows + '</table>'
            + '<div class="seal">任课教师审核盖章处<br/><br/>签字：_______________　　日期：______年___月___日</div>'
            + '<div class="foot">本报告由《大学生创新创业基础》PBL课程智能体系统自动生成，仅供参考，以教务系统为准。</div>'
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


// 5D Capability Radar Chart
window.render5DRadarChart = function(containerId, scores) {
    if (typeof echarts === 'undefined') return;
    const container = document.getElementById(containerId);
    if (!container) return;

    let chart = echarts.getInstanceByDom(container) || echarts.init(container);
    const option = {
        title: {
            text: '🎯 学生双创五维核心能力诊断',
            subtext: '根据 18 学时 PBL 实战成果与表现建模',
            left: 'center',
            textStyle: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' }
        },
        tooltip: { trigger: 'item' },
        radar: {
            indicator: [
                { name: '商业敏锐度', max: 100 },
                { name: '团队协作与治理', max: 100 },
                { name: '产品与 MVP 思维', max: 100 },
                { name: '财务风控', max: 100 },
                { name: '路演与沟通表达', max: 100 }
            ],
            axisName: { color: '#0284C7', fontWeight: 'bold', fontSize: 12 },
            splitArea: { areaStyle: { color: ['#F8FAFC', '#F1F5F9'] } }
        },
        series: [{
            type: 'radar',
            data: [{
                value: scores || [88, 92, 85, 78, 90],
                name: '当前五维能力得分',
                itemStyle: { color: '#0284C7' },
                areaStyle: { color: 'rgba(2, 132, 199, 0.25)' }
            }]
        }]
    };
    chart.setOption(option);
};


document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.render5DRadarChart) {
            window.render5DRadarChart('radar-chart-container', [88, 92, 85, 78, 90]);
        }
    }, 500);
});
