import { test } from '@playwright/test';

test.describe('Setup-based tests', () => {

  
  test('Add car after setup login', async({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'guest', password: 'welcome2qauto', send: 'always' } })
    const page = await context.newPage();
    await page.goto('https://qauto.forstudy.space');
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.locator('input[id="addCarMileage"]').fill('15000')
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Add' }).click();
    })
  
})