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
  selectedChoice: Animal | null;
  showAnswer: boolean;
  correctAnswers: number;
  roundHistory: RoundResult[];
  isSquirrelRound: boolean;
  squirrelAnimals: Animal[];
  selectedSquirrelChoices: Animal[];
}

export interface RoundResult {
  animal: Animal | Animal[];
  selectedChoice: Animal | Animal[];
  correct: boolean;
  points: number;
  isSquirrelRound: boolean;
}

export class SoundGuessrGame {
  private state: GameState;
  private gameAnimals: Animal[];
  private audioElements: HTMLAudioElement[] = [];

  constructor() {
    this.state = this.getInitialState();
    this.gameAnimals = this.generateGamePlaylist();
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
      selectedChoice: null,
      showAnswer: false,
      correctAnswers: 0,
      roundHistory: [],
      isSquirrelRound: false,
      squirrelAnimals: [],
      selectedSquirrelChoices: []
    };
  }

  private generateGamePlaylist(): Animal[] {
    const list = getRandomAnimals(10);
    // Round 7 is always squirrel round if possible
    return list;
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public startGame(): void {
    this.state = this.getInitialState();
    this.gameAnimals = this.generateGamePlaylist();
    this.nextRound();
  }

  public nextRound(): void {
    if (this.state.currentRound >= this.state.totalRounds) {
      this.endGame();
      return;
    }

    this.state.currentRound++;
    
    // Check if it's squirrel round (Round 7 and Round 10)
    this.state.isSquirrelRound = (this.state.currentRound === 7 || this.state.currentRound === 10);
    
    if (this.state.isSquirrelRound) {
      this.state.squirrelAnimals = getRandomAnimals(2); // 2 animals at once
      this.state.currentAnimal = null;
      
      // Choices include both correct ones and 2 random ones
      const others = animals.filter(a => !this.state.squirrelAnimals.find(s => s.name === a.name));
      const randomOthers = others.sort(() => 0.5 - Math.random()).slice(0, 2);
      this.state.choices = [...this.state.squirrelAnimals, ...randomOthers].sort(() => 0.5 - Math.random());
      this.state.selectedSquirrelChoices = [];
    } else {
      this.state.currentAnimal = this.gameAnimals[this.state.currentRound - 1];
      this.state.choices = generateChoices(this.state.currentAnimal, animals);
      this.state.squirrelAnimals = [];
    }
    
    this.state.selectedChoice = null;
    this.state.showAnswer = false;

    this.stopSound();
  }

  public async playSound(): Promise<void> {
    const targets = this.state.isSquirrelRound ? this.state.squirrelAnimals : (this.state.currentAnimal ? [this.state.currentAnimal] : []);
    if (targets.length === 0) return;

    try {
      this.stopSound();
      this.state.isPlaying = true;

      const playPromises = targets.map(animal => {
        const audio = new Audio(animal.soundUrl);
        this.audioElements.push(audio);
        
        audio.addEventListener('ended', () => {
          // Only stop global playing state if all are done
          if (this.audioElements.every(a => a.ended || a.paused)) {
            this.state.isPlaying = false;
          }
        });

        audio.addEventListener('error', (e) => {
          console.error('Error playing audio:', e);
          this.state.isPlaying = false;
        });

        return audio.play();
      });

      await Promise.all(playPromises);
    } catch (error) {
      console.error('Error playing sound:', error);
      this.state.isPlaying = false;
    }
  }

  public stopSound(): void {
    this.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.audioElements = [];
    this.state.isPlaying = false;
  }

  public makeGuess(choice: Animal): void {
    if (this.state.showAnswer || this.state.gameOver) return;

    if (this.state.isSquirrelRound) {
      // Toggle choice
      const index = this.state.selectedSquirrelChoices.findIndex(c => c.name === choice.name);
      if (index > -1) {
        this.state.selectedSquirrelChoices.splice(index, 1);
      } else {
        this.state.selectedSquirrelChoices.push(choice);
      }

      // If they picked 2, evaluate
      if (this.state.selectedSquirrelChoices.length === 2) {
        this.evaluateSquirrelGuess();
      }
    } else {
      this.evaluateNormalGuess(choice);
    }
  }

  private evaluateNormalGuess(choice: Animal): void {
    const isCorrect = choice.name === this.state.currentAnimal?.name;
    this.state.selectedChoice = choice;
    this.finishRound(isCorrect, this.state.currentAnimal!, choice);
  }

  private evaluateSquirrelGuess(): void {
    const correctNames = this.state.squirrelAnimals.map(a => a.name);
    const selectedNames = this.state.selectedSquirrelChoices.map(a => a.name);
    const isCorrect = correctNames.every(name => selectedNames.includes(name));
    
    this.finishRound(isCorrect, this.state.squirrelAnimals, this.state.selectedSquirrelChoices);
  }

  private finishRound(isCorrect: boolean, animal: Animal | Animal[], choice: Animal | Animal[]): void {
    this.state.showAnswer = true;

    let points = 0;
    if (isCorrect) {
      if (this.state.isSquirrelRound) {
        points = 500; // Bonus for squirrel round
      } else {
        const basePoints = { easy: 100, medium: 200, hard: 300 };
        points = basePoints[(animal as Animal).difficulty];
      }

      // Streak bonus
      if (this.state.streak >= 5) {
        points = Math.round(points * 2);
      } else if (this.state.streak >= 3) {
        points = Math.round(points * 1.5);
      }

      this.state.score += points;
      this.state.correctAnswers++;
      this.state.streak++;
    } else {
      this.state.streak = 0;
    }

    this.state.roundHistory.push({
      animal,
      selectedChoice: choice,
      correct: isCorrect,
      points,
      isSquirrelRound: this.state.isSquirrelRound
    });

    this.stopSound();
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

    return {
      totalScore: this.state.score,
      accuracy: Math.round(accuracy),
      correctAnswers: this.state.correctAnswers,
      totalRounds: this.state.totalRounds,
      bestStreak: Math.max(0, ...this.state.roundHistory.map((_, i) => {
        let streak = 0;
        for (let j = i; j < this.state.roundHistory.length && this.state.roundHistory[j].correct; j++) {
          streak++;
        }
        return streak;
      }))
    };
  }
}
