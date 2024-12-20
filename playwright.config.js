// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();
// console.log('Using ENV_FILE:', process.env.ENV_FILE);
// dotenv.config({ path: process.env.ENV_FILE || './.env' });

// console.log('BASE_URL:', process.env.BASE_URL);
// console.log('Username:', process.env.user);
// console.log('Password:', process.env.password);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  // timeout: 60000,
  // testMatch: '**/*.@(spec|test).?(c|m)[jt]s?(x)',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : '30%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'https://qauto.forstudy.space',
    // baseURL: 'https://qauto.forstudy.space',
    // defaultCredentials: {
    //   username: process.env.user, 
    //   password: process.env.password,
    // },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'setup-firefox',
      testMatch: '**/*.setup.js',
      use: { 
        ...devices['Desktop Firefox'],
        channel: 'firefox'
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        channel: 'firefox',
        storageState: 'session-storage.json'
      },
      dependencies: ['setup-firefox'],
    },

    {
      name: 'setup',
      testMatch: '**/*.setup.js',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome'
      },
    },
    { name: 'chrome',
        use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        storageState: 'session-storage.json'
      },
      dependencies: ['setup'],
    },
  ],


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

