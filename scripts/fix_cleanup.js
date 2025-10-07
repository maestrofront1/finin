const fs=require('fs');
const p='features/home/components/CalculatorSection.tsx';
let s=fs.readFileSync(p,'utf8');
let lines=s.split(/\r?\n/);
// Remove Input label attributes with garbled text
lines = lines.filter((ln)=>!ln.match(/\t+label="/));
// Heading text content line between <h2> and </h2>
for(let i=0;i<lines.length-1;i++){
  if(lines[i].includes('<h2') && lines[i+1] && !lines[i+1].includes('</h2>')){
    lines[i+1]='\t\t\t\t���������� ���������� ����������';
  }
}
// Replace garbled INVESTMENT_TYPES labels
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace("label: '??????'","label: '�����'")
    .replace("label: '?????'","label: '�����'")
    .replace("label: '?????????'","label: '���������'")
    .replace("label: '???????'","label: '������'")
    .replace("label: '??????'","label: '����������'")
    .replace("label: '???????'","label: '�������'");
}
// Risk options labels
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i]
    .replace("label: '??? ?????'","label: '��� �����'")
    .replace("label: '???????'","label: '�������'")
    .replace("label: '???????????'","label: '�����������'");
}
// Month label under axis
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('{i + 1}') && lines[i].includes('</text>')){
    lines[i]=lines[i].replace(/\{i \+ 1\}.*<\/text>/,'{i + 1} ���.</text>');
  }
}
// Tooltip month header
for(let i=0;i<lines.length;i++){
  if(lines[i].includes('{hoverIndex + 1}')){
    lines[i]=lines[i].replace(/\{hoverIndex \+ 1\}.*/, '{hoverIndex + 1} ���.</div>');
  }
}
// Replace RUB -> ? in amounts
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i].replace("replace('RUB', '?')","replace('RUB', '?')");
}
// Y axis currency suffix: replacement chars to ?
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i].replace(/toLocaleString\('ru-RU'\)\} .*$/g, "toLocaleString('ru-RU')} ?");
}
// Tooltip entry label fintech
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i].replace(/\{entry\.key === 'fintech' \? '.*' : entry\.label\}/, "{entry.key === 'fintech' ? '�����' : entry.label}");
}
// Legend fintech label
for(let i=0;i<lines.length;i++){
  lines[i]=lines[i].replace(/\{type\.key === 'fintech' \? '.*' : type\.label\}/, "{type.key === 'fintech' ? '�����' : type.label}");
}
// Tooltip rate suffix: ensure closing div
for(let i=0;i<lines.length;i++){
  if(lines[i].includes("className=\"text-xs text-gray-500\"")){
    lines[i]=lines[i].replace(/\{entry\.key === 'fintech' \? riskRate : entry\.rate\}%.*$/, "{entry.key === 'fintech' ? riskRate : entry.rate}% �������</div>");
  }
}
fs.writeFileSync(p, lines.join('\n'),'utf8');
console.log('Applied cleanup to', p);
