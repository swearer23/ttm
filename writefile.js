import fs from 'fs';

export default (filename, threadContent) => {
  try {
    fs.writeFileSync(`output/${filename}.txt`, threadContent.join('\n'), 'utf-8');
    console.log('Thread content written to file.');
  } catch (err) {
    console.error('Error writing thread content to file:', err);
  }
}
