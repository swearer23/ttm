// import { launchBrowser } from "./scrape.js";
// import { getThreadURLArg } from "./utils.js";

// const main = async () => {
//   const url = await getThreadURLArg();
//   console.log(url)
//   const [browser, page] = await launchBrowser(url)
//   await page.waitForTimeout(1000);

//   // get attr: data-testid=videoComponent

//   const videoComponent = page.locator('div[data-testid="videoComponent"]').first()
//   const videoContainer = await videoComponent.locator('video').first()
//   const videoPoster = await videoContainer.getAttribute('poster')
//   const videoUrl = await videoContainer.getAttribute('src')
//   console.log('videoPoster', videoPoster)
//   console.log('videoUrl', videoUrl)
//   return
// }

// main()

import axios from 'axios';
import fs from 'fs';

async function downloadPartialContent(url, outputPath, startByte, endByte) {
  try {
    const headers = { Range: `bytes=${startByte}-${endByte}` };
    const response = await axios.get(url, { responseType: 'arraybuffer', headers });
    const data = response.data;
    fs.writeFileSync(outputPath, data);
    console.log('Partial content downloaded successfully.');
  } catch (error) {
    console.error('Error downloading partial content:', error.message);
  }
}

const resourceUrl = 'https://video.twimg.com/amplify_video/1693615629394120704/vid/1920x1080/xaWuPxmjGFD59Y5G.mp4?tag=16';
const outputPath = 'downloaded_resource.m4s';

const startByte = 0; // Starting byte index
const endByte = 999; // Ending byte index

downloadPartialContent(resourceUrl, outputPath, startByte, endByte);
