const fs=require('fs');
const p='features/home/components/CalculatorSection.tsx';
let s=fs.readFileSync(p,'utf8');
s=s.replace(/replace\('RUB', '.*?'\)/g, "replace('RUB', '?')");
// Fix Y-axis currency lines ending with replacement char(s)
s=s.replace(/toLocaleString\('ru-RU'\)\} [^\n]*/g, "toLocaleString('ru-RU')} ?");
// Fix month labels
s=s.replace(/\{i \+ 1\} [^<]*<\/text>/, '{i + 1} мес.</text>');
s=s.replace(/\{hoverIndex \+ 1\} [^<]*/, '{hoverIndex + 1} мес.');
// Fix fintech label in tooltip and legend
s=s.replace(/\{entry\.key === 'fintech' \? '[^']*' : entry\.label\}/, "{entry.key === 'fintech' ? 'Финин' : entry.label}");
s=s.replace(/\{type\.key === 'fintech' \? '[^']*' : type\.label\}/, "{type.key === 'fintech' ? 'Финин' : type.label}");
// Fix tooltip rate line suffix to 'годовых'
s=s.replace(/(entry\.key === 'fintech' \? riskRate : entry\.rate\)%[^<]*/, "$1% годовых");
// Fix h2 inner text
s=s.replace(/(<h2[^>]*>)[\s\S]*?(<\/h2>)/, '$1\n\t\t\t\tРассчитать доходность инвестиций\n\t\t\t\t$2');
fs.writeFileSync(p,s,'utf8');
console.log('replaced');
