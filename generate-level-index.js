const fs = require('fs');
const path = require('path');

const levelsPath = path.join(__dirname, 'src/app/assets/levels');

const files = fs
  .readdirSync(levelsPath)
  .filter(file => file.endsWith('.json'));

const tsContent = `
export const LEVEL_LIST = [
${files.map(f => `  () => import('../../assets/levels/${f}')`).join(',\n')}
];
`;

fs.writeFileSync(path.join(levelsPath, 'level-index.ts'), tsContent.trim());

console.log(`✔ level-index.ts gerado com ${files.length} níveis!`);
