import fs from 'fs';
import path from 'path';

const dir = 'src/components/ui';
const files = fs.readdirSync(dir);

for (const file of files) {
  const filePath = path.join(dir, file);
  if (fs.statSync(filePath).isFile()) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/@\/lib\/utils/g, '@/src/lib/utils');
    fs.writeFileSync(filePath, content);
  }
}
