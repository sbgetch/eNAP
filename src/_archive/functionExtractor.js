const fs = require('fs');

const filePath = process.argv[2];
const outputFilePath = process.argv[3] || 'functions.txt';  // optional output file name

if (!filePath) {
  console.error('Usage: node extractFunctions.js <path-to-js-file> [output-file]');
  process.exit(1);
}

const code = fs.readFileSync(filePath, 'utf-8');

// Regex to capture function names (group 1)
const functionRegex = /function\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*{/g;
const funcExprRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*function\s*\([^)]*\)\s*{/g;
const arrowFuncRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*\([^)]*\)\s*=>\s*{/g;

function extractFunctionNames(regex) {
  let match;
  const names = [];
  while ((match = regex.exec(code)) !== null) {
    names.push(match[1]);  // capturing group 1 = function name
  }
  return names;
}

const funcDeclNames = extractFunctionNames(functionRegex);
const funcExprNames = extractFunctionNames(funcExprRegex);
const arrowFuncNames = extractFunctionNames(arrowFuncRegex);

const allFunctionNames = [ 
  "Function Declaration",
  ...funcDeclNames,
  "Function Expression",
  ...funcExprNames,
  "Arrow Functions",
  ...arrowFuncNames,
];

// Write to output file
fs.writeFileSync(outputFilePath, allFunctionNames.join('\n'), 'utf-8');

console.log(`Extracted ${allFunctionNames.length} function names to ${outputFilePath}`);
