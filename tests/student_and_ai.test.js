const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./setup.js');

const namespaceCode = fs.readFileSync(path.join(__dirname, '../js/modules/namespace.js'), 'utf8');
const utilsCode = fs.readFileSync(path.join(__dirname, '../js/modules/utils.js'), 'utf8');
const studentCode = fs.readFileSync(path.join(__dirname, '../js/modules/student.js'), 'utf8');
const aiAgentCode = fs.readFileSync(path.join(__dirname, '../js/modules/ai_agent.js'), 'utf8');

eval(namespaceCode);
eval(utilsCode);
eval(studentCode);
eval(aiAgentCode);

test('Student Profile System Unit Test', (t) => {
    assert.strictEqual(typeof window.studentLogin, 'function');
    assert.strictEqual(typeof window.getStudentProfile, 'function');
    assert.strictEqual(typeof window.recordNodeExplored, 'function');

    // Test Login with valid roster ID & name (or standard parameters)
    const loginResult = window.studentLogin('2024001', '张三');
    assert.ok(typeof loginResult === 'object', 'Login result should be object');

    const profile = window.getStudentProfile();
    assert.ok(profile, 'Profile should exist');

    // Test Node Explored recording
    window.recordNodeExplored('node_scamper_01');
    const updatedProfile = window.getStudentProfile();
    assert.ok(Array.isArray(updatedProfile.exploredNodes), 'exploredNodes should be array');
});

test('AI Agent Local Knowledge Base & Prompt Matcher', async (t) => {
    const aiModule = window.IEKG.modules.ai;
    assert.ok(aiModule, 'IEKG.modules.ai should exist');
    assert.strictEqual(typeof aiModule.askDeepSeek, 'function');

    // Test local knowledge base direct search
    if (typeof aiModule.queryLocalKnowledge === 'function') {
        const scamperReply = aiModule.queryLocalKnowledge('SCAMPER');
        assert.ok(scamperReply, 'Local query for SCAMPER should return matching answer');
    }

    // Test AI query call fallback
    const response = await aiModule.askDeepSeek('商业模式画布如何填写');
    assert.ok(response, 'AI query should return reply string');
});
