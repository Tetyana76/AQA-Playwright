import { test as setup, expect } from '@playwright/test';


const autoUser = 'tklapchenko+1@gmail.com';
const autoPassword = 'Password123';


setup('login', async({ browser }) => {
  const context = await browser.newContext({ httpCredentials: { username: 'guest', password: 'welcome2qauto', send: 'always', headless: false } })
  const page = await context.newPage();
  await page.goto('https://qauto.forstudy.space');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[id="signinEmail"]').fill(autoUser)
  await page.locator('input[id="signinPassword"]').fill(autoPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  await page.context().storageState({ path: 'session-storage.json' });

})