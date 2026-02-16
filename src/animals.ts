export interface Animal {
  name: string;
  emoji: string;
  soundUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const animals: Animal[] = [
  // Easy animals
  { name: 'Cat', emoji: '🐱', soundUrl: 'https://freesound.org/data/previews/316/316847_5123451-lq.mp3', difficulty: 'easy' },
  { name: 'Dog', emoji: '🐶', soundUrl: 'https://freesound.org/data/previews/546/546044_7037-lq.mp3', difficulty: 'easy' },
  { name: 'Cow', emoji: '🐄', soundUrl: 'https://freesound.org/data/previews/316/316805_5123451-lq.mp3', difficulty: 'easy' },
  { name: 'Horse', emoji: '🐴', soundUrl: 'https://freesound.org/data/previews/316/316845_5123451-lq.mp3', difficulty: 'easy' },
  { name: 'Sheep', emoji: '🐑', soundUrl: 'https://freesound.org/data/previews/316/316830_5123451-lq.mp3', difficulty: 'easy' },
  { name: 'Pig', emoji: '🐷', soundUrl: 'https://freesound.org/data/previews/316/316828_5123451-lq.mp3', difficulty: 'easy' },
  
  // Medium animals
  { name: 'Lion', emoji: '🦁', soundUrl: 'https://freesound.org/data/previews/316/316849_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Eagle', emoji: '🦅', soundUrl: 'https://freesound.org/data/previews/316/316810_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Wolf', emoji: '🐺', soundUrl: 'https://freesound.org/data/previews/316/316851_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Elephant', emoji: '🐘', soundUrl: 'https://freesound.org/data/previews/316/316809_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Monkey', emoji: '🐒', soundUrl: 'https://freesound.org/data/previews/316/316822_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Bear', emoji: '🐻', soundUrl: 'https://freesound.org/data/previews/316/316803_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Owl', emoji: '🦉', soundUrl: 'https://freesound.org/data/previews/316/316824_5123451-lq.mp3', difficulty: 'medium' },
  { name: 'Frog', emoji: '🐸', soundUrl: 'https://freesound.org/data/previews/316/316813_5123451-lq.mp3', difficulty: 'medium' },
  
  // Hard animals
  { name: 'Kookaburra', emoji: '🦜', soundUrl: 'https://freesound.org/data/previews/316/316817_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Red Fox', emoji: '🦊', soundUrl: 'https://freesound.org/data/previews/316/316811_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Lyrebird', emoji: '🐦', soundUrl: 'https://freesound.org/data/previews/316/316820_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Cicada', emoji: '🦗', soundUrl: 'https://freesound.org/data/previews/316/316805_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Hyena', emoji: '🐺', soundUrl: 'https://freesound.org/data/previews/316/316815_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Dolphin', emoji: '🐬', soundUrl: 'https://freesound.org/data/previews/316/316808_5123451-lq.mp3', difficulty: 'hard' },
  { name: 'Whale', emoji: '🐋', soundUrl: 'https://freesound.org/data/previews/316/316850_5123451-lq.mp3', difficulty: 'hard' },
];

export function getRandomAnimals(count: number): Animal[] {
  const shuffled = [...animals].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateChoices(correctAnimal: Animal, allAnimals: Animal[]): Animal[] {
  const incorrectChoices = allAnimals
    .filter(animal => animal.name !== correctAnimal.name)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  const choices = [correctAnimal, ...incorrectChoices];
  return choices.sort(() => 0.5 - Math.random());
}