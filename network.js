import fs from 'fs';
import axios from 'axios';

export async function downloadImage(imageUrl, filePath) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading the image:', imageUrl, error.message);
  }
}
