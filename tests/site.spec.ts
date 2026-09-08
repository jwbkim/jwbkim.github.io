import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('news can scroll, expand, and return to its compact layout', async ({ page }) => {
  await page.goto('/');
  const region = page.getByRole('region', {name: 'Latest news, scroll for older updates'});
  const compactHeight = await region.evaluate(el => el.clientHeight);
  expect(await region.evaluate(el => el.scrollHeight)).toBeGreaterThan(compactHeight);
  await region.focus();
  await page.keyboard.press('End');
  await expect.poll(() => region.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  await page.getByRole('button', {name: 'Expand all'}).click();
  await expect(page.getByRole('button', {name: 'Collapse news'})).toHaveAttribute('aria-expanded', 'true');
  expect(await region.evaluate(el => el.clientHeight)).toBeGreaterThan(compactHeight);
  await page.getByRole('button', {name: 'Collapse news'}).click();
  expect(await region.evaluate(el => el.clientHeight)).toBe(compactHeight);
});

test('publication type and text search work together, with an accessible reset', async ({ page }) => {
  await page.goto('/#publications');
  await expect(page.locator('.publication')).toHaveCount(27);
  await page.getByRole('button', {name: 'Journals', exact: true}).click();
  const search = page.getByRole('searchbox', {name: 'Search publications by title, author, venue, or year'});
  await search.fill('hierarchical');
  await expect(page.locator('.publication:visible')).toHaveCount(1);
  await expect(page.locator('.publication:visible')).toContainText('SRT-H');
  await page.getByRole('button', {name: 'Conferences', exact: true}).click();
  await expect(page.getByText('No publications match this search.')).toBeVisible();
  await page.getByRole('button', {name: 'Clear filters'}).click();
  await expect(page.locator('.publication:visible')).toHaveCount(27);
  await expect(search).toBeFocused();
  await search.fill('kim 2026');
  const matches = page.locator('.publication:visible');
  await expect(matches).toHaveCount(4);
  for (const entry of await matches.all()) {
    await expect(entry.locator('.publication-venue')).toContainText('2026');
    await expect(entry.locator('.publication-authors')).toContainText('Kim');
  }
});

test('reduced motion prevents autoplay; explicit play and pause remain available', async ({ page }) => {
  await page.emulateMedia({reducedMotion: 'reduce'});
  const videoRequests: string[] = [];
  page.on('request', request => { if (request.url().endsWith('.mp4')) videoRequests.push(request.url()); });
  await page.goto('/#research');
  const video = page.locator('#ego-pi video');
  await video.scrollIntoViewIfNeeded();
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  expect(videoRequests).toHaveLength(0);
  await page.locator('#ego-pi').getByRole('button', {name: /^Play /}).click();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => !el.paused && el.currentTime > 0)).toBe(true);
  await page.locator('#ego-pi').getByRole('button', {name: /^Pause /}).click();
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.locator('#publications').scrollIntoViewIfNeeded();
  await video.scrollIntoViewIfNeeded();
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
});

test('content and video fallbacks work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({javaScriptEnabled: false});
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  await expect(page.locator('.publication')).toHaveCount(27);
  await expect(page.getByRole('link', {name: 'Watch demonstration ↗'})).toHaveCount(3);
  await expect(page.locator('[data-video-toggle]').first()).toBeHidden();
  await expect(page.locator('[data-publication-toolbar]')).toBeHidden();
  await context.close();
});

test('Main and Personal navigation opens the two original personal videos', async ({ page }) => {
  await page.route('https://www.youtube-nocookie.com/**', route => route.fulfill({contentType: 'text/html', body: '<html><body>Video embed</body></html>'}));
  await page.goto('/');
  const navigation = page.getByRole('navigation', {name: 'Main navigation'});
  await expect(navigation.getByRole('link')).toHaveText(['Main', 'Personal']);
  await navigation.getByRole('link', {name: 'Personal', exact: true}).click();
  await expect(page).toHaveURL(/\/personal\/$/);
  await expect(page.getByRole('link', {name: 'Personal', exact: true})).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('iframe')).toHaveCount(2);
  await expect(page.locator('iframe').nth(0)).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/7zU3cEs7VcA');
  await expect(page.locator('iframe').nth(1)).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/VMiKeFk-i-0');
  await page.getByRole('link', {name: 'Main', exact: true}).click();
  await expect(page.getByRole('heading', {name: /^Ji Woong Kim/})).toBeVisible();
});

for (const width of [320, 390, 640, 768, 1280, 1440]) {
  test(`layout fits and keeps the name separate from the portrait at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const name = await page.locator('h1').boundingBox();
    const portrait = await page.locator('.portrait img').boundingBox();
    expect(name!.x + name!.width).toBeLessThanOrEqual(portrait!.x + 1);
    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toBeVisible();
  });
}

for (const width of [390, 1280]) {
  test(`page passes automated WCAG AA checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({width, height: 900});
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto('/');
    const scan = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(scan.violations.map(violation => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map(node => node.target) }))).toEqual([]);
  });
}

test('all local links, image sources, and video assets resolve', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const targets = await page.evaluate(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')].map(a => a.hash).filter(Boolean);
    return {missingAnchors: links.filter(hash => !document.getElementById(hash.slice(1))), assets: [...document.querySelectorAll('img[src], source[data-src]')].map(el => el.getAttribute('src') || el.getAttribute('data-src')!)};
  });
  expect(targets.missingAnchors).toEqual([]);
  for (const path of targets.assets) expect((await request.get(path)).ok(), path).toBe(true);
  expect(errors).toEqual([]);
});
