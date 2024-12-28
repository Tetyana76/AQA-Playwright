import { test, expect } from '@playwright/test';

test('Profile: Fetch and replace original response', async ({ browser }) => {
    const context = await browser.newContext({ httpCredentials: { username: 'guest', password: 'welcome2qauto', send: 'always' } })
    const page = await context.newPage();
    
    await page.route('**/api/users/profile', async (route, request) => {
      console.log('request.method()', request.method())
      if (request.method() === 'GET') {
        const response = await route.fetch();
        const json = await response.json();
        json.data = {
          userId: 159705,
          photoFilename: "default-user.png",
          name: "Maria",
          lastName: "Petrenko"
        };
        
        await route.fulfill({
          response,
          json
        });
        console.log('Modified response JSON:', json);
      } else {
        await route.continue()
      };
    }
 
  );

    await page.goto('/panel/profile', { timeout: 60000 });
    // await page.pause();
    const displayedFullName = await page.locator('.profile_name.display-4').textContent();
    console.log('Displayed full name:', displayedFullName); 
    expect(displayedFullName).toBe('Maria Petrenko');

});

