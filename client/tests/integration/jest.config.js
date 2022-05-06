module.exports = {
  // Increasing the default for combined accessibility and visual regression tests.
  testTimeout: 10_000,
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testEnvironment: './PuppeteerEnvironment.js',
  setupFilesAfterEnv: [
    'expect-puppeteer',
    '@wordpress/jest-puppeteer-axe',
    './setupTests.js',
  ],
};
