import { test as setup, expect, devices } from '@playwright/test';


const autoUser = 'tklapchenko+1@gmail.com';
const autoPassword = 'Password123';


setup('login', async({ browser }) => {
  const context = await browser.newContext({
    ...devices['Desktop Chrome'], 
    channel: 'chrome', 
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
      send: 'always',
      baseURL: process.env.BASE_URL,
    }, })
  const page = await context.newPage();
  // await page.goto(process.env.BASE_URL);
  try {
  await page.goto(process.env.BASE_URL, { waitUntil: 'load', timeout: 60000 });
} catch (error) {
  console.error('Error navigating to page:', error);
}
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('input[id="signinEmail"]').fill(autoUser)
  await page.locator('input[id="signinPassword"]').fill(autoPassword);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
  await page.context().storageState({ path: 'session-storage.json' });

})