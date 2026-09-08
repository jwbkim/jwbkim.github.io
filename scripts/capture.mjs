import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';

const output = process.env.SCREENSHOT_DIR || '/tmp/jkim-site-screenshots';
mkdirSync(output, {recursive: true});
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/google-chrome-stable') ? '/usr/bin/google-chrome-stable' : undefined);
const browser = await chromium.launch({headless: true, executablePath, args: ['--no-sandbox']});
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['laptop', 1280, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({viewport: {width, height}, reducedMotion: 'reduce'});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4321/', {waitUntil: 'networkidle'});
    await page.screenshot({path: `${output}/${name}.png`, fullPage: true});
    await page.screenshot({path: `${output}/${name}-top.png`});
    await page.locator('#research').evaluate(el => el.scrollIntoView({block: 'start'}));
    await page.screenshot({path: `${output}/${name}-research.png`});
    await page.locator('#srt-h').evaluate(el => el.scrollIntoView({block: 'start'}));
    await page.screenshot({path: `${output}/${name}-srt-h.png`});
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    console.log(JSON.stringify({name, status: response.status(), overflow, errors}));
    const personalResponse = await page.goto(new URL('personal/', process.env.PREVIEW_URL || 'http://127.0.0.1:4321/').href, {waitUntil: 'domcontentloaded'});
    if (name === 'desktop') {
      try {
        await page.waitForFunction(() => [...document.querySelectorAll('iframe')].some(frame => frame.contentWindow), {timeout: 15000});
        await page.waitForLoadState('networkidle', {timeout: 15000});
        for (const frame of page.frames().filter(frame => frame.url().includes('youtube'))) {
          console.log(JSON.stringify({frame: frame.url(), content: await frame.locator('body').innerText({timeout: 3000}).catch(() => 'not loaded')}));
        }
      } catch { console.log('YouTube player did not finish loading within the screenshot window.'); }
    }
    await page.screenshot({path: `${output}/${name}-personal.png`, fullPage: true});
    console.log(JSON.stringify({name: `${name}-personal`, status: personalResponse.status(), overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)}));
    await page.close();
  }
} finally { await browser.close(); }
