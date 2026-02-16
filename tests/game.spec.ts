import { test, expect } from '@playwright/test';

test('game loads and shows the title "Critter Calls"', async ({ page }) => {
  await page.goto('/');
  
  // Check that the title is displayed
  const title = page.locator('h1.title');
  await expect(title).toHaveText('🔊 Critter Calls');
  
  // Check that the subtitle is displayed
  const subtitle = page.locator('p.subtitle');
  await expect(subtitle).toHaveText('Guess the animal from its sound!');
  
  // Check that the game elements are present
  await expect(page.locator('#play-button')).toBeVisible();
  await expect(page.locator('#choices')).toBeVisible();
});

test('clicking play button changes it to pause icon', async ({ page }) => {
  await page.goto('/');
  
  const playButton = page.locator('#play-button');
  
  // Initially should show play icon
  await expect(playButton).toHaveText('▶️');
  
  // Click the play button
  await playButton.click();
  
  // Should change to pause icon
  await expect(playButton).toHaveText('⏸️');
  
  // Click again to pause/stop
  await playButton.click();
  
  // Should change back to play icon
  await expect(playButton).toHaveText('▶️');
});

test('clicking a choice button shows the result', async ({ page }) => {
  await page.goto('/');
  
  // Wait for choices to load
  const choiceButtons = page.locator('.choice-button');
  await expect(choiceButtons).toHaveCount(4);
  
  // Click the first choice
  await choiceButtons.first().click();
  
  // Check that result section appears
  const resultSection = page.locator('#result-section');
  await expect(resultSection).toBeVisible();
  
  // Check that result message appears (either correct or wrong)
  const resultMessage = page.locator('#result-message');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toHaveText(/🎉 Correct!|❌ Wrong!/);
  
  // Check that answer is displayed
  const answerDisplay = page.locator('#answer-display');
  await expect(answerDisplay).toBeVisible();
  
  // Check that next button appears
  const nextButton = page.locator('#next-button');
  await expect(nextButton).toBeVisible();
});

test('audio elements are created when play is clicked', async ({ page }) => {
  await page.goto('/');
  
  // Click play button
  const playButton = page.locator('#play-button');
  await playButton.click();
  
  // Wait for audio context to be ready - check that button changed to pause
  await expect(playButton).toHaveText('⏸️');
  
  // Check that waveform shows playing state
  const waveform = page.locator('#waveform');
  await expect(waveform).toContainText('Playing...');
});

test('full game flow - 10 rounds, game over screen appears', async ({ page }) => {
  await page.goto('/');
  
  // Play through 10 rounds
  for (let round = 1; round <= 10; round++) {
    // Check round counter
    const roundCounter = page.locator('#round-counter');
    await expect(roundCounter).toHaveText(`${round}/10`);
    
    // Wait for choices to appear
    const choiceButtons = page.locator('.choice-button');
    await expect(choiceButtons).toHaveCount(4);
    
    // Make a guess (click first choice)
    await choiceButtons.first().click();
    
    // Wait for result to appear
    await expect(page.locator('#result-section')).toBeVisible();
    
    if (round < 10) {
      // Click next button to continue
      const nextButton = page.locator('#next-button');
      await expect(nextButton).toBeVisible();
      await nextButton.click();
      
      // Wait for next round to load properly
      await page.waitForTimeout(500);
      await expect(page.locator('#result-section')).not.toBeVisible();
    } else {
      // On the 10th round, there should be no next button, 
      // and game over should appear automatically or after clicking next
      const nextButton = page.locator('#next-button');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
      }
    }
  }
  
  // After 10 rounds, game over screen should appear
  const gameOverSection = page.locator('#game-over');
  await expect(gameOverSection).toBeVisible({ timeout: 10000 });
  
  // Check that final score is displayed
  const finalScore = page.locator('#final-score');
  await expect(finalScore).toBeVisible();
  
  // Check that score breakdown is shown
  const scoreBreakdown = page.locator('#score-breakdown');
  await expect(scoreBreakdown).toBeVisible();
  
  // Check that restart button is available
  const restartButton = page.locator('#restart-button');
  await expect(restartButton).toBeVisible();
});

test('restart functionality works', async ({ page }) => {
  await page.goto('/');
  
  // Play through all 10 rounds quickly to get to game over screen
  for (let round = 1; round <= 10; round++) {
    await page.locator('.choice-button').first().click();
    await page.waitForSelector('#result-section:visible');
    
    if (round < 10) {
      await page.locator('#next-button').click();
      await page.waitForTimeout(200);
    } else {
      // On round 10, either next button leads to game over or game over appears automatically
      const nextButton = page.locator('#next-button');
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
      }
    }
  }
  
  // Wait for game over screen to appear
  await expect(page.locator('#game-over')).toBeVisible({ timeout: 10000 });
  
  // Click restart
  const restartButton = page.locator('#restart-button');
  await expect(restartButton).toBeVisible();
  await restartButton.click();
  
  // Should be back to round 1
  const roundCounter = page.locator('#round-counter');
  await expect(roundCounter).toHaveText('1/10');
  
  // Score should be reset
  const score = page.locator('#score');
  await expect(score).toHaveText('0');
  
  // Result section should not be visible
  await expect(page.locator('#result-section')).not.toBeVisible();
  
  // Game over section should not be visible
  await expect(page.locator('#game-over')).not.toBeVisible();
  
  // Should be showing question again
  await expect(page.locator('.choice-button')).toHaveCount(4);
});