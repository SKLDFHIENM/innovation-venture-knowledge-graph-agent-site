const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
require('./setup.js');

// Load namespace, utils, data, data_details, graph_core, data_loader
const namespaceCode = fs.readFileSync(path.join(__dirname, '../js/modules/namespace.js'), 'utf8');
const utilsCode = fs.readFileSync(path.join(__dirname, '../js/modules/utils.js'), 'utf8');
const dataCode = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');
const dataDetailsCode = fs.readFileSync(path.join(__dirname, '../js/data_details.js'), 'utf8');
const graphCoreCode = fs.readFileSync(path.join(__dirname, '../js/modules/graph_core.js'), 'utf8');
const dataLoaderCode = fs.readFileSync(path.join(__dirname, '../js/modules/data_loader.js'), 'utf8');

eval(namespaceCode);
eval(utilsCode);
eval(dataCode);
eval(dataDetailsCode);
eval(graphCoreCode);
eval(dataLoaderCode);

test('KNOWLEDGE_GRAPH_DATA Structure Verification', (t) => {
    assert.ok(window.KNOWLEDGE_GRAPH_DATA, 'KNOWLEDGE_GRAPH_DATA should be defined globally');
    assert.ok(Array.isArray(window.KNOWLEDGE_GRAPH_DATA.nodes), 'Nodes should be an array');
    assert.ok(Array.isArray(window.KNOWLEDGE_GRAPH_DATA.links), 'Links should be an array');
    assert.ok(Array.isArray(window.KNOWLEDGE_GRAPH_DATA.categories), 'Categories should be an array');

    assert.ok(window.KNOWLEDGE_GRAPH_DATA.nodes.length > 0, 'Nodes array should not be empty');
    assert.ok(window.KNOWLEDGE_GRAPH_DATA.links.length > 0, 'Links array should not be empty');
});

test('GraphCore Module API Test', (t) => {
    const graphModule = window.IEKG.modules.graph;
    assert.ok(graphModule, 'GraphCore module should exist in IEKG namespace');
    assert.strictEqual(typeof graphModule.initKnowledgeGraph, 'function');
    assert.strictEqual(typeof graphModule.openNodeCard, 'function');
    assert.strictEqual(typeof graphModule.closeNodeCard, 'function');
});

test('DataLoader Data API Test', (t) => {
    const dataApi = window.IEKG.data;
    assert.ok(dataApi, 'IEKG.data should exist');
    assert.strictEqual(typeof dataApi.loadDetails, 'function');
    assert.strictEqual(typeof dataApi.getNodeDetails, 'function');
    assert.strictEqual(typeof dataApi.getNodeDetailsSync, 'function');
});

test('GraphCore Node Card Modal Integration Test', async (t) => {
    const graphModule = window.IEKG.modules.graph;
    
    // Get modal and info elements via document.getElementById
    const modal = document.getElementById('knowledge-card-modal');
    modal.style.display = 'none';

    const cardBody = document.getElementById('knowledge-card-body');
    const infoPanel = document.getElementById('info-panel');
    const sidebarDetail = document.getElementById('sidebar-detail');

    // Call openNodeCard with node ID 'node_academic_11'
    await graphModule.openNodeCard('node_academic_11');

    assert.strictEqual(graphModule.currentNodeId, 'node_academic_11', 'Current node ID should be updated');
    assert.strictEqual(modal.style.display, 'flex', 'Modal display should be flex when opened');

    // Call closeNodeCard
    graphModule.closeNodeCard();
    assert.strictEqual(modal.style.display, 'none', 'Modal display should be none when closed');
});
