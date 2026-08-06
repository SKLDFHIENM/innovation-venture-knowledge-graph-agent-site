const fs = require('fs');

global.window = global;
global.window.IEKG = { data: {} };

const dataCode = fs.readFileSync('./js/data.js', 'utf8').replace('const KNOWLEDGE_GRAPH_DATA', 'global.KNOWLEDGE_GRAPH_DATA');
eval(dataCode);

const detailsCode = fs.readFileSync('./js/data_details.js', 'utf8').replace('const NODE_DETAILS', 'global.NODE_DETAILS');
eval(detailsCode);

const nodes = global.KNOWLEDGE_GRAPH_DATA.nodes || [];
const links = global.KNOWLEDGE_GRAPH_DATA.links || [];
const details = global.NODE_DETAILS || global.window.KNOWLEDGE_DETAILS || {};
const detailsKeys = Object.keys(details);

const nodeIds = new Set(nodes.map(n => n.id));
const categories = [...new Set(nodes.map(n => n.category))];

const invalidLinkSources = links.filter(l => !nodeIds.has(typeof l.source === 'object' ? l.source.id : l.source));
const invalidLinkTargets = links.filter(l => !nodeIds.has(typeof l.target === 'object' ? l.target.id : l.target));
const unmappedDetailsNodes = nodes.filter(n => !details[n.id]);

console.log({
  totalNodes: nodes.length,
  totalLinks: links.length,
  totalCategories: categories.length,
  totalDetailPages: detailsKeys.length,
  invalidLinkSourcesCount: invalidLinkSources.length,
  invalidLinkTargetsCount: invalidLinkTargets.length,
  nodesWithoutDetailCount: unmappedDetailsNodes.length
});
