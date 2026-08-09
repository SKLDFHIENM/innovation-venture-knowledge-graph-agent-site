const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./setup.js');

// Load namespace, utils, tools
const namespaceCode = fs.readFileSync(path.join(__dirname, '../js/modules/namespace.js'), 'utf8');
const utilsCode = fs.readFileSync(path.join(__dirname, '../js/modules/utils.js'), 'utf8');
const toolsCode = fs.readFileSync(path.join(__dirname, '../js/modules/tools.js'), 'utf8');

eval(namespaceCode);
eval(utilsCode);
eval(toolsCode);

test('IEKG Namespace Initialization', (t) => {
    assert.ok(window.IEKG, 'IEKG namespace should be defined');
    assert.ok(window.IEKG.config, 'IEKG config should be initialized');
    assert.strictEqual(window.IEKG.config.version, '5.2 Refactored');
    assert.ok(window.IEKG.utils, 'IEKG utils should exist');
    assert.ok(window.IEKG.modules, 'IEKG modules should exist');
});

test('IEKG Utils - escapeHTML', (t) => {
    const escapeHTML = window.IEKG.utils.escapeHTML;
    assert.strictEqual(escapeHTML(null), '');
    assert.strictEqual(escapeHTML(undefined), '');
    assert.strictEqual(escapeHTML('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    assert.strictEqual(escapeHTML("a & b ' c"), 'a &amp; b &#039; c');
    assert.strictEqual(escapeHTML(123), '123');
});

test('IEKG Utils - debounce', async (t) => {
    const debounce = window.IEKG.utils.debounce;
    let callCount = 0;
    const fn = debounce(() => {
        callCount++;
    }, 50);

    fn();
    fn();
    fn();
    assert.strictEqual(callCount, 0, 'Function should not be called immediately');

    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.strictEqual(callCount, 1, 'Function should be called once after delay');
});

test('IEKG Tools Module - BMC Canvas Operations', (t) => {
    const tools = window.IEKG.modules.tools;
    assert.ok(tools, 'Tools module should exist');
    assert.strictEqual(typeof tools.autoFillBMCCanvas, 'function');
    assert.strictEqual(typeof tools.clearBMCCanvas, 'function');

    // Test autofill
    tools.autoFillBMCCanvas();
    const vpEl = document.getElementById('bmc-vp');
    assert.ok(vpEl.value.includes('AI+非遗文创'), 'BMC value should be auto-filled');

    // Test clear
    tools.clearBMCCanvas();
    assert.strictEqual(vpEl.value, '', 'BMC value should be cleared');
});

test('IEKG Tools Module - Theme Toggle', (t) => {
    const tools = window.IEKG.modules.tools;
    assert.strictEqual(typeof tools.toggleTheme, 'function');

    tools.toggleTheme();
    assert.strictEqual(localStorage.getItem('ag_theme'), 'day');
    tools.toggleTheme();
    assert.strictEqual(localStorage.getItem('ag_theme'), 'night');
});
