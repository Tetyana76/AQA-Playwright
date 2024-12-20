import { test as base } from '@playwright/test';

export const test = base.extend({
  userGaragePage: async ({ browser, baseURL }, use) => {
    const context = await browser.newContext({ storageState: 'session-storage.json' });
    const page = await context.newPage();
    await page.goto(`${baseURL}/panel/garage`);
    await use(page); 
  },
});

export const expect = test.expect;