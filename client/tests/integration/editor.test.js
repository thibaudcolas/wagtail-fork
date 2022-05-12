describe('Editor', () => {
  const globalEditorExcludes =
    '.skiplink, .sidebar__collapse-toggle, #wagtail-sidebar, li[aria-controls^="tab-"]';
  beforeAll(async () => {
    await page.goto(`${TEST_ORIGIN}/admin/pages/add/demosite/standardpage/2/`);
  }, 10000);

  it('has the right heading', async () => {
    const pageHeader = await page.$('h1');
    const pageHeaderValue = await pageHeader.evaluate((el) => el.textContent);
    expect(pageHeaderValue).toContain('New: Standard page');
  });

  it('loads', async () => {
    await expect(page).toPassAxeTests({
      exclude: `${globalEditorExcludes}, [aria-describedby^="placeholder-"]`,
    });
    await expect(page).toTakePercySnapshot();
  });

  it('InlinePanel', async () => {
    const toggle = await page.$('.sidebar__collapse-toggle');
    toggle.click();
    const trigger = await page.$('#id_carousel_items-ADD');
    trigger.click();
    await expect(page).toPassAxeTests({
      exclude: `${globalEditorExcludes}, [aria-describedby^="placeholder-"]`,
    });
    await expect(page).toTakePercySnapshot();
  });

  it('embed chooser', async () => {
    const trigger = await page.$('.Draftail-Editor [name="EMBED"]');
    await Promise.all([
      trigger.click(),
      page.waitForSelector('.embed-form', { visible: true }),
    ]);
    await expect(page).toPassAxeTests({
      exclude: `${globalEditorExcludes}, [aria-describedby^="placeholder-"], .modal`,
    });
    await expect(page).toTakePercySnapshot();
    await Promise.all([
      await page.keyboard.press('Escape'),
      page.waitForSelector('.Draftail-Editor--readonly', { hidden: true }),
    ]);
  });

  it('image chooser', async () => {
    const trigger = await page.$('.Draftail-Editor [name="IMAGE"]');
    await Promise.all([
      trigger.click(),
      page.waitForSelector('.image-search', { visible: true }),
    ]);
    await expect(page).toPassAxeTests({
      exclude: `${globalEditorExcludes}, [aria-describedby^="placeholder-"], .modal`,
    });
    await expect(page).toTakePercySnapshot();
    await Promise.all([
      await page.keyboard.press('Escape'),
      page.waitForSelector('.Draftail-Editor--readonly', { hidden: true }),
    ]);
  });

  it('page chooser', async () => {
    const trigger = await page.$('.Draftail-Editor [name="LINK"]');
    await Promise.all([
      trigger.click(),
      page.waitForSelector('.page-results', { visible: true }),
    ]);
    await expect(page).toPassAxeTests({
      exclude: `${globalEditorExcludes}, [aria-describedby^="placeholder-"], .modal`,
    });
    await expect(page).toTakePercySnapshot();
    await Promise.all([
      await page.keyboard.press('Escape'),
      page.waitForSelector('.Draftail-Editor--readonly', { hidden: true }),
    ]);
  });
});
