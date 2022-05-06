/**
 * Re-implementation of Percy’s official Puppeteer SDK, to fix
 * a Jest support issue and generally improve Jest support.
 * - Original: https://github.com/percy/percy-puppeteer/blob/v2.0.1/index.js
 * - Support issue: https://github.com/percy/percy-puppeteer/issues/426
 *
 * Improvements:
 * - Returns `disabled` if Percy is disabled.
 * - Returns the result of `utils.postSnapshot`.
 */
const utils = require('@percy/sdk-utils');
const sdkPkg = require('@percy/sdk-utils/package.json');
const puppeteerPkg = require('puppeteer/package.json');
const CLIENT_INFO = `${sdkPkg.name}/${sdkPkg.version}`;
const ENV_INFO = `${puppeteerPkg.name}/${puppeteerPkg.version}`;

// Take a DOM snapshot and post it to the snapshot endpoint
async function percySnapshot(page, name, options) {
  if (!page) throw new Error('A Puppeteer `page` object is required.');
  if (!name) throw new Error('The `name` argument is required.');
  if (!(await utils.isPercyEnabled())) return 'disabled';
  const log = utils.logger('puppeteer');

  try {
    // Inject the DOM serialization script
    await page.evaluate(await utils.fetchPercyDOM());

    // Serialize and capture the DOM
    /* istanbul ignore next: no instrumenting injected code */
    const domSnapshot = await page.evaluate(
      (opt) =>
        /* eslint-disable-next-line no-undef */
        PercyDOM.serialize(opt),
      options,
    );

    // Post the DOM to the snapshot endpoint with snapshot options and other info
    return await utils.postSnapshot({
      ...options,
      environmentInfo: ENV_INFO,
      clientInfo: CLIENT_INFO,
      url: page.url(),
      domSnapshot,
      name,
    });
  } catch (err) {
    log.error(`Could not take DOM snapshot "${name}"`);
    log.error(err);
    throw err;
  }
}

/**
 * Wrapper around `percySnapshot` to gracefully fail tests when Percy is enabled and snapshots aren’t captured.
 */
async function toTakePercySnapshot(
  page,
  name = expect.getState().currentTestName,
  options = {},
) {
  let result;
  try {
    result = await percySnapshot(page, name, options);
  } catch (err) {
    return {
      message: 'Percy snapshot: failed',
      pass: false,
    };
  }

  return {
    message: `Percy snapshot: ${result === 'disabled' ? 'off' : name}`,
    pass: true,
  };
}

expect.extend({
  toTakePercySnapshot,
});
