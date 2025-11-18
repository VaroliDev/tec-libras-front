const fs = require('fs');
const path = require('path');

const levelsDir = path.join(__dirname, 'src', 'app', 'assets', 'levels');
const files = fs.readdirSync(levelsDir).filter(file => file.endsWith('.json') && file !== "index.json");

const indexData = {
    levels: files
};

fs.writeFileSync(path.join(levelsDir, 'index.json'), JSON.stringify(indexData, null, 2));

console.log('Index dos niveis gerados com sucesso.');