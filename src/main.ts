import './style.css';
import { SoundGuessrGame } from './game';

class GameUI {
  private game: SoundGuessrGame;
  private app: HTMLElement;
  private playButton: HTMLButtonElement | null = null;
  private waveform: HTMLElement | null = null;
  private choiceButtons: HTMLButtonElement[] = [];
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.game = new SoundGuessrGame();
    this.app = document.getElementById('app')!;
    this.init();
  }

  private init(): void {
    this.render();
    this.game.startGame();
    this.updateUI();
  }

  private render(): void {
    this.app.innerHTML = `
      <div class="game-container">
        <div class="header">
          <h1 class="title">🔊 SoundGuessr</h1>
          <p class="subtitle">Guess the animal from its sound!</p>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill"></div>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="stat-value" id="round-counter">1/10</div>
            <div class="stat-label">Round</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="score">0</div>
            <div class="stat-label">Score</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="streak">0</div>
            <div class="stat-label">Streak</div>
          </div>
        </div>

        <div class="game-area" id="game-area">
          <div class="sound-section">
            <h2 class="sound-question">What animal makes this sound?</h2>
            <div class="sound-controls">
              <button class="play-button" id="play-button">
                ▶️
              </button>
              <div class="waveform" id="waveform">
                <span>🔊 Click to play sound</span>
              </div>
              <div class="timer" id="timer">⏱️ 0s</div>
            </div>
          </div>

          <div class="choices" id="choices">
            <!-- Choices will be populated by JavaScript -->
          </div>

          <div class="result-section" id="result-section" style="display: none;">
            <div class="result-message" id="result-message"></div>
            <div class="answer-display" id="answer-display"></div>
            <button class="next-button" id="next-button">Next Round</button>
          </div>

          <div class="game-over" id="game-over" style="display: none;">
            <h2>🎉 Game Complete!</h2>
            <div class="final-score" id="final-score">0</div>
            <div class="score-breakdown" id="score-breakdown"></div>
            <button class="restart-button" id="restart-button">Play Again</button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.playButton = document.getElementById('play-button') as HTMLButtonElement;
    this.waveform = document.getElementById('waveform') as HTMLElement;

    this.playButton?.addEventListener('click', () => {
      this.playSound();
    });

    const nextButton = document.getElementById('next-button') as HTMLButtonElement;
    nextButton?.addEventListener('click', () => {
      this.nextRound();
    });

    const restartButton = document.getElementById('restart-button') as HTMLButtonElement;
    restartButton?.addEventListener('click', () => {
      this.restartGame();
    });
  }

  private updateUI(): void {
    const state = this.game.getState();

    // Update stats
    const roundCounter = document.getElementById('round-counter');
    const score = document.getElementById('score');
    const streak = document.getElementById('streak');
    const progressFill = document.getElementById('progress-fill') as HTMLElement;

    if (roundCounter) roundCounter.textContent = `${state.currentRound}/${state.totalRounds}`;
    if (score) score.textContent = state.score.toString();
    if (streak) streak.textContent = state.streak.toString();
    if (progressFill) progressFill.style.width = `${this.game.getProgress()}%`;

    // Update game area
    if (state.gameOver) {
      this.showGameOver();
    } else if (state.showAnswer) {
      this.showAnswer();
    } else {
      this.showQuestion();
    }

    // Update timer
    this.updateTimer();
  }

  private showQuestion(): void {
    
    // Hide result sections
    const resultSection = document.getElementById('result-section');
    const gameOverSection = document.getElementById('game-over');
    if (resultSection) resultSection.style.display = 'none';
    if (gameOverSection) gameOverSection.style.display = 'none';

    // Show choices
    this.renderChoices();

    // Update waveform
    if (this.waveform) {
      this.waveform.className = 'waveform';
      this.waveform.innerHTML = '<span>🔊 Click to play sound</span>';
    }

    // Enable play button
    if (this.playButton) {
      this.playButton.disabled = false;
      this.playButton.textContent = '▶️';
    }
  }

  private renderChoices(): void {
    const state = this.game.getState();
    const choicesContainer = document.getElementById('choices');
    if (!choicesContainer) return;

    choicesContainer.innerHTML = '';
    this.choiceButtons = [];

    state.choices.forEach((animal) => {
      const button = document.createElement('button');
      button.className = 'choice-button';
      button.innerHTML = `
        <span class="animal-emoji">${animal.emoji}</span>
        <span>${animal.name}</span>
      `;
      
      button.addEventListener('click', () => {
        this.makeGuess(animal);
      });

      this.choiceButtons.push(button);
      choicesContainer.appendChild(button);
    });
  }

  private async playSound(): Promise<void> {
    if (this.playButton) {
      this.playButton.disabled = true;
      this.playButton.textContent = '⏸️';
    }

    if (this.waveform) {
      this.waveform.className = 'waveform playing';
      this.waveform.innerHTML = '<span>🎵 Playing...</span>';
    }

    try {
      await this.game.playSound();
    } catch (error) {
      console.error('Error playing sound:', error);
      alert('Sorry, there was an error playing the sound. Please try again.');
    }

    setTimeout(() => {
      if (this.playButton) {
        this.playButton.disabled = false;
        this.playButton.textContent = '▶️';
      }
      if (this.waveform) {
        this.waveform.className = 'waveform';
        this.waveform.innerHTML = '<span>🔊 Click to replay</span>';
      }
    }, 3000);
  }

  private makeGuess(animal: any): void {
    this.game.makeGuess(animal);
    
    // Disable all choice buttons
    this.choiceButtons.forEach(button => {
      button.disabled = true;
    });

    this.updateUI();
  }

  private showAnswer(): void {
    const state = this.game.getState();
    const resultSection = document.getElementById('result-section');
    const resultMessage = document.getElementById('result-message');
    const answerDisplay = document.getElementById('answer-display');

    if (!resultSection || !resultMessage || !answerDisplay || !state.currentAnimal) return;

    const isCorrect = state.selectedChoice?.name === state.currentAnimal.name;
    
    // Update choice buttons colors
    this.choiceButtons.forEach(button => {
      const animalName = button.querySelector('span:not(.animal-emoji)')?.textContent;
      if (animalName === state.currentAnimal!.name) {
        button.classList.add('correct');
      } else if (animalName === state.selectedChoice?.name && !isCorrect) {
        button.classList.add('incorrect');
      }
    });

    // Show result
    resultSection.style.display = 'block';
    
    if (isCorrect) {
      resultMessage.textContent = '🎉 Correct!';
      resultMessage.className = 'result-message correct';
    } else {
      resultMessage.textContent = '❌ Wrong!';
      resultMessage.className = 'result-message incorrect';
    }

    answerDisplay.innerHTML = `
      <span class="answer-emoji">${state.currentAnimal.emoji}</span>
      <div class="answer-name">${state.currentAnimal.name}</div>
      ${state.timeBonus > 0 ? `<div style="color: #f39c12; margin-top: 0.5rem;">⚡ Time bonus: +${state.timeBonus} points</div>` : ''}
    `;
  }

  private nextRound(): void {
    this.game.nextRound();
    this.updateUI();
  }

  private showGameOver(): void {
    const gameOverSection = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');
    const scoreBreakdown = document.getElementById('score-breakdown');

    if (!gameOverSection || !finalScore || !scoreBreakdown) return;

    const stats = this.game.getFinalStats();

    gameOverSection.style.display = 'block';
    finalScore.textContent = stats.totalScore.toString();

    scoreBreakdown.innerHTML = `
      <h3>Final Stats</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div class="stat">
          <div class="stat-value">${stats.accuracy}%</div>
          <div class="stat-label">Accuracy</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.correctAnswers}/${stats.totalRounds}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.averageTime}s</div>
          <div class="stat-label">Avg Time</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.bestStreak}</div>
          <div class="stat-label">Best Streak</div>
        </div>
      </div>
    `;

    // Hide other sections
    const resultSection = document.getElementById('result-section');
    if (resultSection) resultSection.style.display = 'none';
  }

  private restartGame(): void {
    this.game.startGame();
    this.updateUI();
  }

  private updateTimer(): void {
    const state = this.game.getState();
    const timerElement = document.getElementById('timer');
    
    if (!timerElement || state.gameOver || state.showAnswer) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      return;
    }

    if (!this.timer && state.roundStartTime > 0) {
      this.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - state.roundStartTime) / 1000);
        timerElement.textContent = `⏱️ ${elapsed}s`;
      }, 1000);
    }
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GameUI();
});