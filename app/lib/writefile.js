import fs from 'fs';
import { outputPath } from './const';

export const makedir = (dirname) => {
  try {
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
  } catch (err) {
    console.error('Error creating directory:', err);
  }
}

export default (filename, threadContent) => {
  try {
    fs.writeFileSync(`${outputPath}${filename}`, threadContent.join('\n'), 'utf-8');
    console.log(`Thread content written to file. ${filename}`);
  } catch (err) {
    console.error('Error writing thread content to file:', err);
  }
}
