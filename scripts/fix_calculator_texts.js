const fs = require('fs');
const path = require('path');

const p = path.join('features','home','components','CalculatorSection.tsx');
let s = fs.readFileSync(p, 'utf8');

// Heading text
s = s.replace(/(<h2[^>]*>)[\s\S]*?(<\/h2>)/, '$1\n\t\t\t\tРассчитать доходность инвестиций\n\t\t\t\t$2');

// Month label under axis (e.g., "{i + 1} ???.")
s = s.replace(/\{i \+ 1\}[^\n]*\?/,'{i + 1} мес.');

// Y axis currency '?' on grid labels
s = s.replace(/toLocaleString\('ru-RU'\)\} \?/g, "toLocaleString('ru-RU')} ₽");

// Replace RUB -> ₽ in amounts
s = s.replace(/replace\('RUB', '\?'\)/g, "replace('RUB', '₽')");

// Tooltip month line '?????'
s = s.replace(/\{hoverIndex \+ 1\}[^\n]*\?/,'{hoverIndex + 1} мес.');

// Legend fintech label '?????'
s = s.replace(/type\.key === 'fintech' \? '\?+'/g, "type.key === 'fintech' ? 'Финин'");

// Tooltip entry label to use mapping if exists later; for now, leave as is

fs.writeFileSync(p, s, 'utf8');
console.log('Fixes applied to', p);

