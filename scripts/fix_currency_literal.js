const fs=require('fs');
const p='features/home/components/CalculatorSection.tsx';
let s=fs.readFileSync(p,'utf8');
s=s.split("replace('RUB', '?')").join("replace('RUB', '?')");
fs.writeFileSync(p,s,'utf8');
console.log('currency replaced');
