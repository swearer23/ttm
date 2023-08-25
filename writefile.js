import fs from 'fs';

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
    fs.writeFileSync(`output/${filename}`, threadContent.join('\n'), 'utf-8');
    console.log(`Thread content written to file. ${filename}`);
  } catch (err) {
    console.error('Error writing thread content to file:', err);
  }
}
