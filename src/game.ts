import { Animal, animals, getRandomAnimals, generateChoices } from './animals';

export interface GameState {
  currentRound: number;
  totalRounds: number;
  score: number;
  streak: number;
  currentAnimal: Animal | null;
  choices: Animal[];
  isPlaying: boolean;
  gameOver: boolean;
  roundStartTime: number;
  selectedChoice: Animal | null;
  showAnswer: boolean;
  correctAnswers: number;
  timeBonus: number;
  roundHistory: RoundResult[];
}

export interface RoundResult {
  animal: Animal;
  selectedChoice: Animal | null;
  correct: boolean;
  timeSpent: number;
  points: number;
}

export class SoundGuessrGame {
  private state: GameState;
  private gameAnimals: Animal[];
  private audioElement: HTMLAudioElement | null = null;

  constructor() {
    this.state = this.getInitialState();
    this.gameAnimals = getRandomAnimals(10);
  }

  private getInitialState(): GameState {
    return {
      currentRound: 0,
      totalRounds: 10,
      score: 0,
      streak: 0,
      currentAnimal: null,
      choices: [],
      isPlaying: false,
      gameOver: false,
      roundStartTime: 0,
      selectedChoice: null,
      showAnswer: false,
      correctAnswers: 0,
      timeBonus: 0,
      roundHistory: []
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public startGame(): void {
    this.state = this.getInitialState();
    this.gameAnimals = getRandomAnimals(10);
    this.nextRound();
  }

  public nextRound(): void {
    if (this.state.currentRound >= this.state.totalRounds) {
      this.endGame();
      return;
    }

    this.state.currentRound++;
    this.state.currentAnimal = this.gameAnimals[this.state.currentRound - 1];
    this.state.choices = generateChoices(this.state.currentAnimal, animals);
    this.state.selectedChoice = null;
    this.state.showAnswer = false;
    this.state.roundStartTime = Date.now();
    
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
  }

  public async playSound(): Promise<void> {
    if (!this.state.currentAnimal) return;

    try {
      if (this.audioElement) {
        this.audioElement.pause();
      }

      this.state.isPlaying = true;
      this.audioElement = new Audio(this.state.currentAnimal.soundUrl);
      
      // Set CORS attributes for external audio
      this.audioElement.crossOrigin = 'anonymous';
      
      // Add event listeners
      this.audioElement.addEventListener('ended', () => {
        this.state.isPlaying = false;
      });

      this.audioElement.addEventListener('error', (e) => {
        console.error('Error playing audio:', e);
        this.state.isPlaying = false;
      });

      await this.audioElement.play();
    } catch (error) {
      console.error('Error playing sound:', error);
      this.state.isPlaying = false;
    }
  }

  public stopSound(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.state.isPlaying = false;
    }
  }

  public makeGuess(choice: Animal): void {
    if (this.state.selectedChoice || !this.state.currentAnimal) return;

    const timeSpent = Date.now() - this.state.roundStartTime;
    const isCorrect = choice.name === this.state.currentAnimal.name;
    
    this.state.selectedChoice = choice;
    this.state.showAnswer = true;

    // Calculate points
    let points = 0;
    if (isCorrect) {
      points = this.calculatePoints(timeSpent, this.state.currentAnimal.difficulty);
      this.state.score += points;
      this.state.correctAnswers++;
      this.state.streak++;
    } else {
      this.state.streak = 0;
    }

    // Calculate time bonus
    this.state.timeBonus = this.calculateTimeBonus(timeSpent);

    // Store round result
    const roundResult: RoundResult = {
      animal: this.state.currentAnimal,
      selectedChoice: choice,
      correct: isCorrect,
      timeSpent,
      points
    };
    
    this.state.roundHistory.push(roundResult);

    // Stop any playing sound
    this.stopSound();
  }

  private calculatePoints(timeMs: number, difficulty: Animal['difficulty']): number {
    const basePoints = { easy: 100, medium: 200, hard: 300 };
    const maxTime = 30000; // 30 seconds max
    const timeMultiplier = Math.max(0.1, 1 - (timeMs / maxTime));
    
    let points = Math.round(basePoints[difficulty] * timeMultiplier);
    
    // Streak bonus
    if (this.state.streak >= 3) {
      points = Math.round(points * 1.5);
    } else if (this.state.streak >= 5) {
      points = Math.round(points * 2);
    }

    return points;
  }

  private calculateTimeBonus(timeMs: number): number {
    if (timeMs < 5000) return 50; // Under 5 seconds
    if (timeMs < 10000) return 25; // Under 10 seconds
    if (timeMs < 15000) return 10; // Under 15 seconds
    return 0;
  }

  private endGame(): void {
    this.state.gameOver = true;
    this.stopSound();
  }

  public getProgress(): number {
    return (this.state.currentRound / this.state.totalRounds) * 100;
  }

  public getFinalStats() {
    const accuracy = (this.state.correctAnswers / this.state.totalRounds) * 100;
    const averageTime = this.state.roundHistory.reduce((sum, round) => sum + round.timeSpent, 0) / this.state.roundHistory.length;
    
    return {
      totalScore: this.state.score,
      accuracy: Math.round(accuracy),
      correctAnswers: this.state.correctAnswers,
      totalRounds: this.state.totalRounds,
      averageTime: Math.round(averageTime / 1000), // in seconds
      bestStreak: Math.max(...this.state.roundHistory.map((_, i) => {
        let streak = 0;
        for (let j = i; j < this.state.roundHistory.length && this.state.roundHistory[j].correct; j++) {
          streak++;
        }
        return streak;
      }))
    };
  }
}