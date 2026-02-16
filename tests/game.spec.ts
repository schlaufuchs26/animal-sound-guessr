import { test, expect } from '@playwright/test';

test.describe('Critter Calls Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/animal-sound-guessr/');
  });

  test('game loads and shows the title "Critter Calls"', async ({ page }) => {
    await expect(page.locator('.title')).toContainText('Critter Calls');
  });

  test('clicking play button changes it to pause icon', async ({ page }) => {
    const playButton = page.locator('#play-button');
    await expect(playButton).toContainText('▶️');
    await playButton.click();
    // It might show loading icon first, then pause
    await expect(playButton).toHaveText(/[⌛⏸️]/);
  });

  test('keyboard shortcut: Space plays and pauses sound', async ({ page }) => {
    const playButton = page.locator('#play-button');
    await expect(playButton).toContainText('▶️');
    
    await page.keyboard.press('Space');
    await expect(playButton).toHaveText(/[⌛⏸️]/);
    
    // Wait for it to settle on pause if it was loading
    await page.waitForTimeout(1000); 
    if (await playButton.innerText() === '⏸️') {
      await page.keyboard.press('Space');
      await expect(playButton).toContainText('▶️');
    }
  });

  test('keyboard shortcut: 1-4 selects a choice', async ({ page }) => {
    await page.keyboard.press('1');
    await expect(page.locator('#result-section')).toBeVisible();
  });

  test('clicking a choice button shows the result', async ({ page }) => {
    const choices = page.locator('.choice-button');
    await choices.first().click();
    await expect(page.locator('#result-section')).toBeVisible();
  });

  test('full game flow - 10 rounds, game over screen appears', async ({ page }) => {
    test.slow();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('1');
      await page.locator('#next-button').click();
    }
    await expect(page.locator('#game-over')).toBeVisible();
  });

  test('keyboard shortcut: Enter proceeds to next round', async ({ page }) => {
    await page.keyboard.press('1');
    await expect(page.locator('#result-section')).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.locator('#round-counter')).toContainText('2/10');
  });
});
