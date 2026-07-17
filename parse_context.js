const fs = require('fs');

const content = fs.readFileSync('./contexts/LanguageContext.tsx', 'utf8');
// VERY simple parser for translations object
const uzMatch = content.match(/uz:\s*\{([\s\S]*?)\},\s*\/\/\s*─/);
const ruMatch = content.match(/ru:\s*\{([\s\S]*?)\},\s*\/\/\s*─/);
const enMatch = content.match(/en:\s*\{([\s\S]*?)\}\s*\};/);

// Just print out all keys that are used in T_USAGE but are missing in contexts
const issues = JSON.parse(fs.readFileSync('audit_results.json', 'utf8'));

// Filter out some UI component noise
const filteredIssues = issues.filter(i => !i.file.includes('/ui/'));

console.log(`Total issues found: ${filteredIssues.length}`);

const hardcoded = filteredIssues.filter(i => i.type.startsWith('HARDCODED'));
console.log(`Hardcoded strings: ${hardcoded.length}`);

// We'll write them to a log file
fs.writeFileSync('audit_report.txt', 'HARDCODED:\n' + hardcoded.map(i => `${i.file}:${i.line} -> ${i.text}`).join('\n') + '\n\n');

const missingImports = filteredIssues.filter(i => i.type === 'MISSING_IMPORT');
fs.appendFileSync('audit_report.txt', 'MISSING IMPORTS:\n' + missingImports.map(i => i.file).join('\n') + '\n\n');

const usages = [...new Set(filteredIssues.filter(i => i.type === 'T_USAGE').map(i => i.key))];
fs.appendFileSync('audit_report.txt', 'KEYS USED:\n' + usages.join('\n'));
