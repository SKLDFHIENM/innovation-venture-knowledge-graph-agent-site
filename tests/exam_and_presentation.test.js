const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./setup.js');

const namespaceCode = fs.readFileSync(path.join(__dirname, '../js/modules/namespace.js'), 'utf8');
const presentationCode = fs.readFileSync(path.join(__dirname, '../js/modules/presentation.js'), 'utf8');
const examCode = fs.readFileSync(path.join(__dirname, '../js/exam.js'), 'utf8');

eval(namespaceCode);
eval(presentationCode);
eval(examCode.replace('const BASE_EXAM_QUESTIONS =', 'window.BASE_EXAM_QUESTIONS ='));

test('Exam Questions Dataset & Logic Test', (t) => {
    assert.ok(Array.isArray(window.BASE_EXAM_QUESTIONS), 'BASE_EXAM_QUESTIONS should be an array');
    assert.ok(window.BASE_EXAM_QUESTIONS.length >= 50, 'BASE_EXAM_QUESTIONS should contain at least 50 core questions');

    const firstQ = window.BASE_EXAM_QUESTIONS[0];
    assert.ok(firstQ.question, 'Question should have question text');
    assert.ok(Array.isArray(firstQ.options), 'Question should have options');
    assert.strictEqual(typeof firstQ.answer, 'number', 'Answer index should be number');
});

test('Presentation Module & PBL Index Test', (t) => {
    const presModule = window.IEKG.modules.presentation;
    assert.ok(presModule, 'IEKG.modules.presentation should exist');
    assert.ok(Array.isArray(presModule.pblIndexList), 'pblIndexList should be an array');
    assert.ok(presModule.pblIndexList.length >= 10, 'pblIndexList should have 10 standard PBL slide items');

    // Test Quick Drawer Opening
    presModule.openQuickDrawer();
    const drawer = document.getElementById('global-pres-quick-drawer');
    assert.ok(drawer, 'Quick drawer DOM element should be created');
    assert.strictEqual(drawer.style.display, 'flex', 'Quick drawer should set display to flex');
});
