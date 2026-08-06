const fs = require('fs');

const css = fs.readFileSync('./css/style.css', 'utf8');

const rootVariables = (css.match(/--[\w-]+:[^;]+;/g) || []);
const mediaQueries = (css.match(/@media[^{]+\{/g) || []);
const keyframes = (css.match(/@keyframes[^{]+\{/g) || []);
const darkModeRules = (css.match(/\[data-theme=["']dark["']\]/g) || []).length;

console.log({
  totalCssSize: css.length,
  rootVariableCount: rootVariables.length,
  mediaQueryCount: mediaQueries.length,
  keyframeAnimationCount: keyframes.length,
  darkModeSupport: darkModeRules > 0
});
