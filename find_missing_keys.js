const fs = require('fs');

const contextContent = fs.readFileSync('contexts/LanguageContext.tsx', 'utf8');
const usedKeys = fs.readFileSync('audit_report.txt', 'utf8').split('KEYS USED:\n')[1].split('\n').filter(k => k.trim() !== '');

const extractKeys = (obj, prefix = '') => {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
      keys = keys.concat(extractKeys(obj[key], `${prefix}${key}.`));
    } else if (Array.isArray(obj[key])) {
      // Arrays are accessed via index, e.g. about.values.0
      obj[key].forEach((_, i) => {
        keys.push(`${prefix}${key}.${i}`);
      });
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
};

// Extremely naive approach: eval the uz part
const uzMatch = contextContent.match(/uz:\s*(\{[\s\S]*?\n\s*\})\s*,\s*\/\/\s*─/);
let uzKeys = [];
if (uzMatch) {
  try {
    const uzObjStr = uzMatch[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
    // Using eval carefully just on the object part
    const uzObj = eval('(' + uzMatch[1] + ')');
    uzKeys = extractKeys(uzObj);
  } catch (e) {
    console.error("Failed to parse uz object");
  }
}

const ruMatch = contextContent.match(/ru:\s*(\{[\s\S]*?\n\s*\})\s*,\s*\/\/\s*─/);
let ruKeys = [];
if (ruMatch) {
    const ruObj = eval('(' + ruMatch[1] + ')');
    ruKeys = extractKeys(ruObj);
}

const enMatch = contextContent.match(/en:\s*(\{[\s\S]*?\n\s*\})\s*\};/);
let enKeys = [];
if (enMatch) {
    const enObj = eval('(' + enMatch[1] + ')');
    enKeys = extractKeys(enObj);
}

const missingInUz = usedKeys.filter(k => !uzKeys.includes(k) && !k.includes(',') && !k.includes(' '));
const missingInRu = usedKeys.filter(k => !ruKeys.includes(k) && !k.includes(',') && !k.includes(' '));
const missingInEn = usedKeys.filter(k => !enKeys.includes(k) && !k.includes(',') && !k.includes(' '));

const allMissingKeys = [...new Set([...missingInUz, ...missingInRu, ...missingInEn])];

console.log("Missing keys total:", allMissingKeys.length);
allMissingKeys.forEach(k => {
    console.log(`Key ${k} missing in: ${missingInUz.includes(k) ? 'uz ' : ''}${missingInRu.includes(k) ? 'ru ' : ''}${missingInEn.includes(k) ? 'en ' : ''}`);
});
