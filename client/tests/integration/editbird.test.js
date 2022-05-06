describe.skip('Editbird', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8000/');
  });

  it('loads', async () => {
    const trigger = await page.$('[aria-controls="wagtail-userbar-items"]');
    await Promise.all([
      trigger.click(),
      page.waitForSelector('[aria-labelledby="wagtail-userbar-trigger"]', {
        visible: true,
      }),
    ]);
    await expect(page).toPassAxeTests({
      exclude: '[role="menuitem"]',
    });
    await expect(page).toTakePercySnapshot();
  });
});
