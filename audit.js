const fs = require('fs');
const path = require('path');

// Recursive function to get all tsx files
const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles('./');
const issues = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Skip context itself
  if (file.includes('LanguageContext.tsx')) return;

  const lines = content.split('\n');
  const hasUseLanguage = content.includes('useLanguage');
  const tMatches = [...content.matchAll(/t\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  
  let hasText = false;
  
  lines.forEach((line, i) => {
    const lineNum = i + 1;
    // VERY simple heuristic for hardcoded text in JSX: 
    // Look for >Text< or > Text <
    // But exclude obvious code > { < or html <br />
    const jsxTextMatches = line.match(/>([^<>{]+)</g);
    if (jsxTextMatches) {
      jsxTextMatches.forEach(match => {
        const text = match.slice(1, -1).trim();
        // Skip empty or purely symbolic strings
        if (text && text.length > 1 && /[a-zA-Z]/.test(text) && !text.includes('use client')) {
           issues.push({ type: 'HARDCODED', file: file.replace(__dirname, ''), line: lineNum, text });
           hasText = true;
        }
      });
    }
    
    // String literals passed as props or in arrays that might be text
    // Like title="Some text"
    const propMatches = line.match(/(title|label|description|placeholder|alt)=["']([^"'{]+)["']/g);
    if (propMatches) {
        propMatches.forEach(m => {
            const val = m.split('=')[1].slice(1, -1).trim();
            if (val && /[a-zA-Z]/.test(val)) {
                issues.push({ type: 'HARDCODED_PROP', file: file.replace(__dirname, ''), line: lineNum, text: val });
                hasText = true;
            }
        });
    }
  });

  if (hasText && !hasUseLanguage) {
    issues.push({ type: 'MISSING_IMPORT', file: file.replace(__dirname, '') });
  }
  
  // Check translation keys
  tMatches.forEach(key => {
    issues.push({ type: 'T_USAGE', file: file.replace(__dirname, ''), key });
  });
});

fs.writeFileSync('audit_results.json', JSON.stringify(issues, null, 2));
console.log('Audit complete');
