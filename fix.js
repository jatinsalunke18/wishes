const fs = require('fs');
const path = require('path');
function fix(dir) {
    fs.readdirSync(dir).forEach(file => {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) fix(full);
        else if (full.endsWith('.js')) {
            let content = fs.readFileSync(full, 'utf8');
            content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
            fs.writeFileSync(full, content);
        }
    });
}
fix('./js');
