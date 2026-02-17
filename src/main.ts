import './style.css';
import { SoundGuessrGame } from './game';

class GameUI {
  private game: SoundGuessrGame;
  private app: HTMLElement;
  private playButton: HTMLButtonElement | null = null;
  private waveform: HTMLElement | null = null;
  private choiceButtons: HTMLButtonElement[] = [];
  private checkPlayingInterval: ReturnType<typeof setInterval> | null = null;

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
      <div id="squirrel-overlay" class="squirrel-overlay">
        <span class="emoji">🐿️🐿️🐿️</span>
        <h2>SQUIRREL ROUND!</h2>
        <p>Listen for TWO animals at once!</p>
      </div>
      <div class="game-container" id="main-container">
        <div class="header">
          <h1 class="title">🔊 Critter Calls</h1>
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
            <div class="difficulty-badge" id="difficulty-badge"></div>
            <h2 class="sound-question" id="sound-question">What animal makes this sound?</h2>
            <div class="sound-controls">
              <button class="play-button" id="play-button" title="Play Sound (Space)">▶️</button>
              <div class="waveform" id="waveform">
                <span>🔊 Click to play sound</span>
              </div>
            </div>
            <div id="audio-status" class="audio-status"></div>
          </div>

          <div class="choices" id="choices"></div>

          <div class="result-section" id="result-section" style="display: none;">
            <div class="result-message" id="result-message"></div>
            <div class="answer-display" id="answer-display"></div>
            <button class="next-button" id="next-button" title="Next Round (Enter)">Next Round</button>
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
      if (this.game.getState().isPlaying) {
        this.stopSound();
      } else {
        this.playSound();
      }
    });

    document.getElementById('next-button')?.addEventListener('click', () => this.nextRound());
    document.getElementById('restart-button')?.addEventListener('click', () => this.restartGame());

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      const state = this.game.getState();
      
      // 1-4 for choices
      if (!state.showAnswer && !state.gameOver) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const index = Number(e.key) - 1;
          if (this.choiceButtons[index]) {
            this.makeGuess(state.choices[index]);
          }
        }
      }

      // Space to play/pause
      if (e.code === 'Space') {
        const target = e.target as HTMLElement | null;
        const isInteractive = !!target && (
          target.closest('button, a, input, textarea, select') !== null || 
          target.isContentEditable
        );

        // Only prevent default and handle play/pause if not focusing an interactive element
        if (!isInteractive) {
          e.preventDefault();
          if (state.isPlaying) {
            this.stopSound();
          } else if (!state.gameOver) {
            this.playSound();
          }
        }
      }

      // Enter for Next Round
      if (e.code === 'Enter' && state.showAnswer && !state.gameOver) {
        this.nextRound();
      }
    });
  }

  private updateUI(): void {
    const state = this.game.getState();

    const roundCounter = document.getElementById('round-counter');
    const score = document.getElementById('score');
    const streak = document.getElementById('streak');
    const progressFill = document.getElementById('progress-fill') as HTMLElement;
    const difficultyBadge = document.getElementById('difficulty-badge');
    const soundQuestion = document.getElementById('sound-question');

    if (roundCounter) roundCounter.textContent = `${state.currentRound}/${state.totalRounds}`;
    if (score) score.textContent = state.score.toString();
    if (streak) streak.textContent = state.streak.toString();
    if (progressFill) progressFill.style.width = `${this.game.getProgress()}%`;
    
    if (difficultyBadge) {
      if (state.isSquirrelRound) {
        difficultyBadge.innerHTML = '<span class="squirrel-alert">🐿️ SQUIRREL ROUND 🐿️</span>';
        difficultyBadge.className = `difficulty-badge hard`;
        if (soundQuestion) soundQuestion.textContent = "Which TWO animals do you hear?";
        document.getElementById('main-container')?.classList.add('squirrel-mode-active');
      } else if (state.currentAnimal) {
        difficultyBadge.textContent = state.currentAnimal.difficulty.toUpperCase();
        difficultyBadge.className = `difficulty-badge ${state.currentAnimal.difficulty}`;
        if (soundQuestion) soundQuestion.textContent = "What animal makes this sound?";
        document.getElementById('main-container')?.classList.remove('squirrel-mode-active');
      }
    }

    if (state.gameOver) {
      this.showGameOver();
    } else if (state.showAnswer) {
      this.showAnswer();
    } else {
      this.showQuestion();
    }
  }

  private showQuestion(): void {
    const resultSection = document.getElementById('result-section');
    const gameOverSection = document.getElementById('game-over');
    const gameArea = document.getElementById('game-area');

    if (resultSection) resultSection.style.display = 'none';
    if (gameOverSection) gameOverSection.style.display = 'none';

    // Ensure game area elements are visible
    if (gameArea) {
      const soundSection = gameArea.querySelector('.sound-section') as HTMLElement;
      const choices = gameArea.querySelector('.choices') as HTMLElement;
      if (soundSection) soundSection.style.display = 'block';
      if (choices) choices.style.display = 'grid';
    }

    this.renderChoices();

    if (this.waveform) {
      this.waveform.className = 'waveform';
      this.waveform.innerHTML = '<span>🔊 Click to play sound</span>';
    }

    if (this.playButton) {
      this.playButton.textContent = '▶️';
    }
    
    this.setAudioStatus('');
  }

  private renderChoices(): void {
    const state = this.game.getState();
    const choicesContainer = document.getElementById('choices');
    if (!choicesContainer) return;

    choicesContainer.innerHTML = '';
    this.choiceButtons = [];

    state.choices.forEach((animal, index) => {
      const button = document.createElement('button');
      button.className = 'choice-button';
      
      const isSelected = state.isSquirrelRound && state.selectedSquirrelChoices.find(c => c.name === animal.name);
      if (isSelected) button.classList.add('selected');

      button.innerHTML = `
        <span class="key-hint">${index + 1}</span>
        <span class="animal-emoji">${animal.emoji}</span>
        <span>${animal.name}</span>
      `;
      button.addEventListener('click', () => this.makeGuess(animal));
      this.choiceButtons.push(button);
      choicesContainer.appendChild(button);
    });
  }

  private clearCheckPlayingInterval(): void {
    if (this.checkPlayingInterval) {
      clearInterval(this.checkPlayingInterval);
      this.checkPlayingInterval = null;
    }
  }

  private stopSound(): void {
    this.clearCheckPlayingInterval();
    this.game.stopSound();
    if (this.playButton) {
      this.playButton.textContent = '▶️';
    }
    if (this.waveform) {
      this.waveform.className = 'waveform';
      this.waveform.innerHTML = '<span>🔊 Click to replay</span>';
    }
    this.setAudioStatus('');
  }

  private setAudioStatus(message: string, isError = false): void {
    const statusEl = document.getElementById('audio-status');
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = isError ? 'audio-status error' : 'audio-status';
    }
  }

  private async playSound(): Promise<void> {
    this.clearCheckPlayingInterval();
    
    if (this.playButton) {
      this.playButton.textContent = '⌛'; // Loading state
    }

    if (this.waveform) {
      this.waveform.className = 'waveform loading';
      this.waveform.innerHTML = '<span>⏳ Loading sound...</span>';
    }
    
    this.setAudioStatus('Loading audio...');

    try {
      await this.game.playSound();
      
      if (this.playButton) {
        this.playButton.textContent = '⏸️';
      }
      if (this.waveform) {
        this.waveform.className = 'waveform playing';
        this.waveform.innerHTML = '<span>🎵 Playing...</span>';
      }
      this.setAudioStatus('');
    } catch (error) {
      console.error('Error playing sound:', error);
      this.setAudioStatus('Error: Failed to load sound.', true);
      if (this.playButton) this.playButton.textContent = '▶️';
      if (this.waveform) {
        this.waveform.className = 'waveform';
        this.waveform.innerHTML = '<span>❌ Load failed</span>';
      }
      return;
    }

    // Check when audio finishes naturally
    this.checkPlayingInterval = setInterval(() => {
      if (!this.game.getState().isPlaying) {
        this.clearCheckPlayingInterval();
        if (this.playButton) {
          this.playButton.textContent = '▶️';
        }
        if (this.waveform) {
          this.waveform.className = 'waveform';
          this.waveform.innerHTML = '<span>🔊 Click to replay</span>';
        }
      }
    }, 100);
  }

  private makeGuess(animal: any): void {
    this.game.makeGuess(animal);
    
    const state = this.game.getState();
    if (state.showAnswer) {
      this.stopSound();
      this.choiceButtons.forEach(button => { button.disabled = true; });
    }
    this.updateUI();
  }

  private showAnswer(): void {
    const state = this.game.getState();
    const resultSection = document.getElementById('result-section');
    const resultMessage = document.getElementById('result-message');
    const answerDisplay = document.getElementById('answer-display');

    if (!resultSection || !resultMessage || !answerDisplay) return;

    let isCorrect = false;
    let answerHtml = '';

    if (state.isSquirrelRound) {
      const correctNames = state.squirrelAnimals.map(a => a.name);
      const selectedNames = state.selectedSquirrelChoices.map(a => a.name);
      isCorrect = correctNames.every(name => selectedNames.includes(name));

      this.choiceButtons.forEach(button => {
        const animalName = button.querySelector('span:not(.animal-emoji):not(.key-hint)')?.textContent;
        if (correctNames.includes(animalName!)) {
          button.classList.add('correct');
        } else if (selectedNames.includes(animalName!) && !correctNames.includes(animalName!)) {
          button.classList.add('incorrect');
        }
      });

      answerHtml = state.squirrelAnimals.map(a => `
        <div style="margin-bottom: 10px;">
          <span class="answer-emoji">${a.emoji}</span>
          <div class="answer-name">${a.name}</div>
        </div>
      `).join('');
    } else {
      isCorrect = state.selectedChoice?.name === state.currentAnimal?.name;
      this.choiceButtons.forEach(button => {
        const animalName = button.querySelector('span:not(.animal-emoji):not(.key-hint)')?.textContent;
        if (animalName === state.currentAnimal!.name) {
          button.classList.add('correct');
        } else if (animalName === state.selectedChoice?.name && !isCorrect) {
          button.classList.add('incorrect');
        }
      });

      answerHtml = `
        <span class="answer-emoji">${state.currentAnimal?.emoji}</span>
        <div class="answer-name">${state.currentAnimal?.name}</div>
        <a class="source-link" href="${state.currentAnimal?.sourceUrl}" target="_blank" rel="noopener">🔗 Sound source</a>
      `;
    }

    resultSection.style.display = 'block';

    if (isCorrect) {
      resultMessage.textContent = '🎉 Correct!';
      resultMessage.className = 'result-message correct';
    } else {
      resultMessage.textContent = '❌ Wrong!';
      resultMessage.className = 'result-message incorrect';
    }

    answerDisplay.innerHTML = answerHtml;
    this.playSound();
  }

  private nextRound(): void {
    const wasSquirrel = this.game.getState().isSquirrelRound;
    this.stopSound();
    this.game.nextRound();
    const isSquirrel = this.game.getState().isSquirrelRound;

    if (isSquirrel && !wasSquirrel) {
      this.showSquirrelRoundIntro();
    } else {
      this.updateUI();
    }
  }

  private showSquirrelRoundIntro(): void {
    const overlay = document.getElementById('squirrel-overlay');
    if (overlay) {
      overlay.classList.add('show');
      setTimeout(() => {
        overlay.classList.remove('show');
        this.updateUI();
      }, 2000);
    } else {
      this.updateUI();
    }
  }

  private showGameOver(): void {
    this.stopSound();
    const gameOverSection = document.getElementById('game-over');
    const finalScore = document.getElementById('final-score');
    const scoreBreakdown = document.getElementById('score-breakdown');
    const gameArea = document.getElementById('game-area');

    if (!gameOverSection || !finalScore || !scoreBreakdown) return;

    const stats = this.game.getFinalStats();

    if (gameArea) {
      const soundSection = gameArea.querySelector('.sound-section') as HTMLElement;
      const choices = gameArea.querySelector('.choices') as HTMLElement;
      if (soundSection) soundSection.style.display = 'none';
      if (choices) choices.style.display = 'none';
    }

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
          <div class="stat-value">${stats.bestStreak}</div>
          <div class="stat-label">Best Streak</div>
        </div>
      </div>
    `;

    const resultSection = document.getElementById('result-section');
    if (resultSection) resultSection.style.display = 'none';
  }

  private restartGame(): void {
    this.stopSound();
    this.game.startGame();
    this.updateUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GameUI();
});
