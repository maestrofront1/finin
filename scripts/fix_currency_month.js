const fs=require('fs');
const p='features/home/components/CalculatorSection.tsx';
let s=fs.readFileSync(p,'utf8');
// Replace all currency tokens
s=s.replace(/replace\('RUB', '[^']*'\)/g, "replace('RUB', '?')");
// Replace simple garbled '???' month tokens
s=s.replace(/\{i \+ 1\} [^<]*<\/text>/, '{i + 1} мес.</text>');
s=s.replace(/\{hoverIndex \+ 1\} [^<]*/, '{hoverIndex + 1} мес.');
fs.writeFileSync(p,s,'utf8');
console.log('replaced simple tokens');
