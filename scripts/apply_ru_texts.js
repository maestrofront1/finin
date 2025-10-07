const fs=require('fs');
const p='features/home/components/CalculatorSection.tsx';
let lines=fs.readFileSync(p,'utf8').split(/\r?\n/);
// Insert RU constants after imports
let insertIdx = lines.findIndex(l=>l.includes('type InvestmentType'));
if(insertIdx>0){
  const RUblock = [
    'const RU = {',
    "\theading: '\\u0420\\u0430\\u0441\\u0441\\u0447\\u0438\\u0442\\u0430\\u0442\\u044c \\u0434\\u043e\\u0445\\u043e\\u0434\\u043d\\u043e\\u0441\\u0442\\u044c \\u0438\\u043d\\u0432\\u0435\\u0441\\u0442\\u0438\\u0446\\u0438\\u0439',",
    "\tkpiTotal: '\\u0418\\u0442\\u043e\\u0433\\u043e\\u0432\\u0430\\u044f \\u0441\\u0443\\u043c\\u043c\\u0430 (\\u0424\\u0438\\u043d\\u0438\\u043d)',",
    "\tkpiGain: '\\u041f\\u0440\\u0438\\u0440\\u043e\\u0441\\u0442 (\\u043a \\u0432\\u0437\\u043d\\u043e\\u0441\\u0430\\u043c)',",
    "\tfinin: '\\u0424\\u0438\\u043d\\u0438\\u043d',",
    "\tmesDot: '\\u043c\\u0435\\u0441.',",
    "\tperAnnum: '\\u0433\\u043e\\u0434\\u043e\\0432\\u044b\\u0445',",
    "\tsafe: '\\u0411\\u0435\\u0437 \\u0440\\u0438\\u0441\\u043a\\u0430',",
    "\tbase: '\\u0411\\u0430\\u0437\\u043e\\u0432\\u0430\\u044f',",
    "\taggressive: '\\u0410\\u0433\\u0440\\u0435\\u0441\\u0441\\u0438\\u0432\\u043d\\u0430\\u044f',",
    "\tlabels: { fintech:'\\u0424\\u0438\\u043d\\u0438\\u043d', stocks:'\\u0410\\u043a\\u0446\\u0438\\u0438', bonds:'\\u041e\\u0431\\u043b\\u0438\\u0433\\u0430\\u0446\\u0438\\u0438', deposits:'\\u0412\\u043a\\u043b\\u0430\\u0434\\u044b', savings:'\\u0421\\u0431\\u0435\\u0440\\u0435\\u0436\\u0435\\u043d\\u0438\\u044f', metals:'\\u041c\\u0435\\u0442\\u0430\\u043b\\u043b\\u044b' }",
    '};'
  ];
  lines.splice(insertIdx,0,'',...RUblock,'');
}
// Use RU labels in INVESTMENT_TYPES
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace(/label: '.*'\s*,\s*rate: 43/,"label: RU.labels.fintech, rate: 43")
    .replace(/label: '.*'\s*,\s*rate: 38/,"label: RU.labels.stocks, rate: 38")
    .replace(/label: '.*'\s*,\s*rate: 32/,"label: RU.labels.bonds, rate: 32")
    .replace(/label: '.*'\s*,\s*rate: 28/,"label: RU.labels.deposits, rate: 28")
    .replace(/label: '.*'\s*,\s*rate: 24/,"label: RU.labels.savings, rate: 24")
    .replace(/label: '.*'\s*,\s*rate: 20/,"label: RU.labels.metals, rate: 20");
}
// Replace RISK_OPTIONS labels with RU
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace(/\{ key: 'safe', label: '.*', rate:/, "{ key: 'safe', label: RU.safe, rate:")
    .replace(/\{ key: 'base', label: '.*', rate:/, "{ key: 'base', label: RU.base, rate:")
    .replace(/\{ key: 'aggressive', label: '.*', rate:/, "{ key: 'aggressive', label: RU.aggressive, rate:");
}
// Heading content line
for(let i=0;i<lines.length-1;i++){
  if(lines[i].includes('<h2') && lines[i+1] && !lines[i+1].includes('</h2>')){
    lines[i+1]='\t\t\t\t{RU.heading}';
  }
}
// KPI card titles
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace(/>.*\(.*\)<\/div>/, "> {RU.kpiTotal}</div>")
}
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('uppercase tracking-wide') && lines[i].includes('????') ){
    lines[i] = '\t\t\t\t\t\t<div className="block mb-2 text-sm text-gray-500 uppercase tracking-wide">{RU.kpiGain}</div>';
  }
}
// Month labels
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('{i + 1}') && lines[i].includes('</text>')){
    lines[i]=lines[i].replace(/\{i \+ 1\}.*<\/text>/,'{i + 1} {RU.mesDot}</text>');
  }
  if(lines[i].includes('{hoverIndex + 1}')){
    lines[i]=lines[i].replace(/\{hoverIndex \+ 1\}.*/, '{hoverIndex + 1} {RU.mesDot}</div>');
  }
}
// Finin labels in tooltip and legend
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace(/\{entry\.key === 'fintech' \? '.*' : entry\.label\}/, "{entry.key === 'fintech' ? RU.finin : entry.label}")
    .replace(/\{type\.key === 'fintech' \? '.*' : type\.label\}/, "{type.key === 'fintech' ? RU.finin : type.label}");
}
// Tooltip rate suffix
for(let i=0;i<lines.length;i++){
  if(lines[i].includes("className=\"text-xs text-gray-500\"")){
    lines[i]=lines[i].replace(/\{entry\.key === 'fintech' \? riskRate : entry\.rate\}%.*$/, "{entry.key === 'fintech' ? riskRate : entry.rate}% {RU.perAnnum}</div>");
  }
}
// Currency symbol
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i].replace(/replace\('RUB', '.*'\)/g, "replace('RUB', '\\u20bd')");
}
fs.writeFileSync(p, lines.join('\n'),'utf8');
console.log('Inserted RU constants and replaced texts.');
