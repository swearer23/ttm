import { chromium } from 'playwright';
import cookie from './cookie.js';

async function isThreadEnd(wrapper) {
  const threadConnectionDiv = await wrapper.locator('div[data-testid="Tweet-User-Avatar"]+div');
  return (await threadConnectionDiv.count()) > 0
}

async function launchBrowser(url) {
  const browser = await chromium.launch({headless: false});
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: null, // 如果需要，设置视口大小
    storageState: {
      cookies: cookie.map((c) => {
        c['sameSite'] = 'None'
        return c
      })
    }
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load' , timeout: 60000});
  return [browser, page];
}

async function getThreadWrapper(page) {
  const tweetText = await page.locator('article[data-testid="tweet"]').all()
  return tweetText;
}

async function getThreadContent(wrapper) {
  const tweetTextContent = await wrapper.locator('div[data-testid="tweetText"]').first()
  return await tweetTextContent.innerText();
}

export default async url => {
  let threadContent = []

  const [browser, page] = await launchBrowser(url)

  // iterate locators
  let wrappers = await getThreadWrapper(page)
  const mainThread = wrappers.shift()
  threadContent.push(await getThreadContent(mainThread))
  let do_continue = true
  while (do_continue) {
    for (let wrapper of wrappers) {
      if (await isThreadEnd(wrapper)) {
        const content = await getThreadContent(wrapper)
        threadContent.push(content)
      } else {
        do_continue = false
        break
      }
    }
    if (do_continue) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      wrappers = await getThreadWrapper(page)
    }
  }

  browser.close();

  return threadContent;
}
