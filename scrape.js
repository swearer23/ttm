import { chromium } from 'playwright';
import cookie from './cookie.js';

async function isThreadEnd(wrapper, userid) {
  const threadConnectionDiv = await wrapper.locator(`div[data-testid="UserAvatar-Container-${userid}"]`);
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

export default async (url, userid) => {
  let threadContent = []

  const [browser, page] = await launchBrowser(url)
  await page.waitForTimeout(1000);

  // iterate locators
  let wrappers = await getThreadWrapper(page)
  const mainThread = wrappers.shift()
  threadContent.push(await getThreadContent(mainThread))
  let do_continue = true
  while (do_continue) {
    for (let wrapper of wrappers) {
      if (await isThreadEnd(wrapper, userid)) {
        const content = await getThreadContent(wrapper)
        if (threadContent.includes(content)) continue
        console.log('scraped content', content)
        threadContent.push(content)
      } else {
        do_continue = false
        break
      }
    }
    if (do_continue) {
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        const scrollBy = 2000
        window.scrollBy(0, scrollBy)
      });
      await page.waitForTimeout(1000);
      wrappers = await getThreadWrapper(page)
    }
  }

  browser.close();

  return threadContent;
}
