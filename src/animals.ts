export interface Animal {
  name: string;
  emoji: string;
  soundUrl: string;
  sourceUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const animals: Animal[] = [
  // Easy animals
  { name: 'Cat', emoji: '🐱', soundUrl: './sounds/cat.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Purring_cat_bertie.ogg', difficulty: 'easy' },
  { name: 'Dog', emoji: '🐶', soundUrl: './sounds/dog.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Barking_of_a_dog.ogg', difficulty: 'easy' },
  { name: 'Cow', emoji: '🐄', soundUrl: './sounds/cow.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Single_Cow_Moo.ogg', difficulty: 'easy' },
  { name: 'Rooster', emoji: '🐓', soundUrl: './sounds/rooster.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Small_rooster_crowing.ogg', difficulty: 'easy' },
  { name: 'Sheep', emoji: '🐑', soundUrl: './sounds/sheep.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sheep_bleating.ogg', difficulty: 'easy' },
  { name: 'Pig', emoji: '🐷', soundUrl: './sounds/pig.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pig_grunt_-_Erdie.ogg', difficulty: 'easy' },
  { name: 'Horse', emoji: '🐴', soundUrl: './sounds/horse.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wiehern.ogg', difficulty: 'easy' },
  { name: 'Duck', emoji: '🦆', soundUrl: './sounds/duck.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anas_platyrhynchos_-_Mallard_-_XC62258.ogg', difficulty: 'easy' },
  { name: 'Goat', emoji: '🐐', soundUrl: './sounds/goat.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Herd_of_goats_bleating.ogg', difficulty: 'easy' },
  { name: 'Goose', emoji: '🪿', soundUrl: './sounds/goose.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Geese_Honking_(loud).ogg', difficulty: 'easy' },
  { name: 'Turkey', emoji: '🦃', soundUrl: './sounds/turkey.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gobbler.ogg', difficulty: 'easy' },

  // Medium animals
  { name: 'Lion', emoji: '🦁', soundUrl: './sounds/lion.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lion_raring-sound1TamilNadu178.ogg', difficulty: 'medium' },
  { name: 'Wolf', emoji: '🐺', soundUrl: './sounds/wolf.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wolf_howls.ogg', difficulty: 'medium' },
  { name: 'Owl', emoji: '🦉', soundUrl: './sounds/owl.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pacific_Pygmy_Owl_call_(Glaucidium_peruanum).ogg', difficulty: 'medium' },
  { name: 'Frog', emoji: '🐸', soundUrl: './sounds/frog.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Frog_sounds.ogg', difficulty: 'medium' },
  { name: 'Elephant', emoji: '🐘', soundUrl: './sounds/elephant.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg', difficulty: 'medium' },
  { name: 'Monkey', emoji: '🐒', soundUrl: './sounds/monkey.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mantled_Howler_Monkey_(Alouatta_palliata)_(W_ALOUATTA_PALLIATA_R1_C2).ogg', difficulty: 'medium' },
  { name: 'Whale', emoji: '🐋', soundUrl: './sounds/whale.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Humpbackwhale2.ogg', difficulty: 'medium' },
  { name: 'Cricket', emoji: '🦗', soundUrl: './sounds/cricket.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unknown_Cricket_VOL_11-09_Dudley_T._Dougherty_Natural_Sounds_Collection.ogg', difficulty: 'medium' },
  { name: 'Bee', emoji: '🐝', soundUrl: './sounds/bee.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bee_buzzing_sound_(animal_noises).opus', difficulty: 'medium' },
  { name: 'Bear', emoji: '🐻', soundUrl: './sounds/bear.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bear_growl.ogg', difficulty: 'medium' },
  { name: 'Eagle', emoji: '🦅', soundUrl: './sounds/eagle.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bald_Eagle_Yellowstone_National_Park.ogg', difficulty: 'medium' },
  { name: 'Penguin', emoji: '🐧', soundUrl: './sounds/penguin.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Little_Penguin_(Eudyptula_minor).ogg', difficulty: 'medium' },
  { name: 'Peacock', emoji: '🦚', soundUrl: './sounds/peacock.ogg', sourceUrl: 'https://en.wikipedia.org/wiki/File:Pavo_cristatus_(call).ogg', difficulty: 'medium' },
  { name: 'Crow', emoji: '🐦‍⬛', soundUrl: './sounds/crow.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:American_Crow.ogg', difficulty: 'medium' },

  // Hard animals
  { name: 'Kookaburra', emoji: '🐦', soundUrl: './sounds/kookaburra.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:LaughingKookaburra.ogg', difficulty: 'hard' },
  { name: 'Red Fox', emoji: '🦊', soundUrl: './sounds/red_fox.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Red_Fox_(Vulpes_vulpes)_(W1CDR0001529_BD12).ogg', difficulty: 'hard' },
  { name: 'Hyena', emoji: '🦴', soundUrl: './sounds/hyena.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Giggling_call_of_a_spotted_hyena_(Crocuta_crocuta)_-_1472-6785-10-9-S4.oga', difficulty: 'hard' },
  { name: 'Cicada', emoji: '🪲', soundUrl: './sounds/cicada.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cicada_calling_in_Irving,_TX_in_June_of_2012.ogg', difficulty: 'hard' },
  { name: 'Alligator', emoji: '🐊', soundUrl: './sounds/alligator.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alligatorbellowedit.ogg', difficulty: 'hard' },
  { name: 'Guinea Pig', emoji: '🐹', soundUrl: './sounds/guinea_pig.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Guinea_Pig_Feeding_Wheek.ogg', difficulty: 'hard' },
];

// Simple seeded PRNG (mulberry32)
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getTodaysSeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export function getTodaysDateString(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function getDailyAnimals(): Animal[] {
  const seed = getTodaysSeed();
  const rng = mulberry32(seed);
  const shuffled = seededShuffle(animals, rng);
  return shuffled.slice(0, 5);
}

export function getDailyChoices(correctAnimal: Animal, seed: number, roundIndex: number): Animal[] {
  const rng = mulberry32(seed * 1000 + roundIndex);
  const incorrectChoices = seededShuffle(
    animals.filter(a => a.name !== correctAnimal.name),
    rng
  ).slice(0, 3);
  return seededShuffle([correctAnimal, ...incorrectChoices], rng);
}

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