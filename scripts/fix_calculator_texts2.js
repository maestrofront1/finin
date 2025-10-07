const fs = require('fs');
const path = require('path');
const p = path.join('features','home','components','CalculatorSection.tsx');
let s = fs.readFileSync(p, 'utf8');
let L = s.split(/\r?\n/);

for (let i = 0; i < L.length; i++) {
  // Heading line after <h2>
  if (L[i].includes('<h2') && i + 1 < L.length) {
    L[i+1] = '\t\t\t\tРассчитать доходность инвестиций';
  }
  // RUB -> ₽
  L[i] = L[i].replace(/replace\('RUB', '\?'\)/g, "replace('RUB', '₽')");
  // Grid axis currency
  L[i] = L[i].replace(/toLocaleString\('ru-RU'\)\} \?/g, "toLocaleString('ru-RU')} ₽");
  // Month label under axis
  L[i] = L[i].replace(/\{i \+ 1\} [^<]*\?\./, '{i + 1} мес.');
  // Tooltip month header
  if (L[i].includes('{hoverIndex + 1}')) {
    L[i] = L[i].replace(/\{hoverIndex \+ 1\}[^<]*\?+/, '{hoverIndex + 1} мес.');
  }
  // Legend fintech label
  L[i] = L[i].replace(/type\.key === 'fintech' \? '\?+'/, "type.key === 'fintech' ? 'Финин'");
  // Tooltip entry label
  L[i] = L[i].replace('{entry.label}', "{entry.key === 'fintech' ? 'Финин' : entry.label}");
  // Tooltip rate text ending
  L[i] = L[i].replace(/\% \?+/, '% годовых');
}

s = L.join('\n');
fs.writeFileSync(p, s, 'utf8');
console.log('Applied textual fixes to', p);

