export interface Animal {
  name: string;
  emoji: string;
  soundUrl: string;
  sourceUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const animals: Animal[] = [
  // Easy animals
  { name: 'Cat', emoji: '🐱', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Purring_cat_bertie.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Purring_cat_bertie.ogg', difficulty: 'easy' },
  { name: 'Dog', emoji: '🐶', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Barking_of_a_dog.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Barking_of_a_dog.ogg', difficulty: 'easy' },
  { name: 'Cow', emoji: '🐄', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Single_Cow_Moo.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Single_Cow_Moo.ogg', difficulty: 'easy' },
  { name: 'Rooster', emoji: '🐓', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Small_rooster_crowing.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Small_rooster_crowing.ogg', difficulty: 'easy' },
  { name: 'Sheep', emoji: '🐑', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Sheep_bleating.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sheep_bleating.ogg', difficulty: 'easy' },
  { name: 'Pig', emoji: '🐷', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Pig_grunt_-_Erdie.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pig_grunt_-_Erdie.ogg', difficulty: 'easy' },
  { name: 'Horse', emoji: '🐴', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Wiehern.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wiehern.ogg', difficulty: 'easy' },
  { name: 'Duck', emoji: '🦆', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Anas_platyrhynchos_-_Mallard_-_XC62258.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Anas_platyrhynchos_-_Mallard_-_XC62258.ogg', difficulty: 'easy' },
  { name: 'Goat', emoji: '🐐', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Herd_of_goats_bleating.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Herd_of_goats_bleating.ogg', difficulty: 'easy' },
  { name: 'Goose', emoji: '🪿', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Geese_Honking_%28loud%29.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Geese_Honking_(loud).ogg', difficulty: 'easy' },
  { name: 'Turkey', emoji: '🦃', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Gobbler.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gobbler.ogg', difficulty: 'easy' },

  // Medium animals
  { name: 'Lion', emoji: '🦁', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Lion_raring-sound1TamilNadu178.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lion_raring-sound1TamilNadu178.ogg', difficulty: 'medium' },
  { name: 'Wolf', emoji: '🐺', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Wolf_howls.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Wolf_howls.ogg', difficulty: 'medium' },
  { name: 'Owl', emoji: '🦉', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Pacific_Pygmy_Owl_call_%28Glaucidium_peruanum%29.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pacific_Pygmy_Owl_call_(Glaucidium_peruanum).ogg', difficulty: 'medium' },
  { name: 'Frog', emoji: '🐸', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Frog_sounds.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Frog_sounds.ogg', difficulty: 'medium' },
  { name: 'Elephant', emoji: '🐘', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Elephant_voice_-_trumpeting.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg', difficulty: 'medium' },
  { name: 'Monkey', emoji: '🐒', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Mantled_Howler_Monkey_%28Alouatta_palliata%29_%28W_ALOUATTA_PALLIATA_R1_C2%29.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mantled_Howler_Monkey_(Alouatta_palliata)_(W_ALOUATTA_PALLIATA_R1_C2).ogg', difficulty: 'medium' },
  { name: 'Whale', emoji: '🐋', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Humpbackwhale2.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Humpbackwhale2.ogg', difficulty: 'medium' },
  { name: 'Cricket', emoji: '🦗', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Unknown_Cricket_VOL_11-09_Dudley_T._Dougherty_Natural_Sounds_Collection.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Unknown_Cricket_VOL_11-09_Dudley_T._Dougherty_Natural_Sounds_Collection.ogg', difficulty: 'medium' },
  { name: 'Bee', emoji: '🐝', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Honey_Bee_Buzzing.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Honey_Bee_Buzzing.ogg', difficulty: 'medium' },
  { name: 'Bear', emoji: '🐻', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Bear_growl.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bear_growl.ogg', difficulty: 'medium' },
  { name: 'Eagle', emoji: '🦅', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bald_Eagle_Yellowstone_National_Park.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bald_Eagle_Yellowstone_National_Park.ogg', difficulty: 'medium' },
  { name: 'Penguin', emoji: '🐧', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Eudyptes_chrysolophus_-_Macaroni_Penguin_-_XC432362.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Eudyptes_chrysolophus_-_Macaroni_Penguin_-_XC432362.ogg', difficulty: 'medium' },
  { name: 'Peacock', emoji: '🦚', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Pavo_cristatus_-_Indian_Peafowl_-_XC672323.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pavo_cristatus_-_Indian_Peafowl_-_XC672323.ogg', difficulty: 'medium' },
  { name: 'Crow', emoji: '🐦‍⬛', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/American_Crow.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:American_Crow.ogg', difficulty: 'medium' },

  // Hard animals
  { name: 'Kookaburra', emoji: '🐦', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LaughingKookaburra.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:LaughingKookaburra.ogg', difficulty: 'hard' },
  { name: 'Red Fox', emoji: '🦊', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Red_Fox_%28Vulpes_vulpes%29_%28W1CDR0001529_BD12%29.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Red_Fox_(Vulpes_vulpes)_(W1CDR0001529_BD12).ogg', difficulty: 'hard' },
  { name: 'Hyena', emoji: '🦴', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Giggling_call_of_a_spotted_hyena_%28Crocuta_crocuta%29_-_1472-6785-10-9-S4.oga', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Giggling_call_of_a_spotted_hyena_(Crocuta_crocuta)_-_1472-6785-10-9-S4.oga', difficulty: 'hard' },
  { name: 'Cicada', emoji: '🪲', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Cicada_calling_in_Irving%2C_TX_in_June_of_2012.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cicada_calling_in_Irving,_TX_in_June_of_2012.ogg', difficulty: 'hard' },
  { name: 'Alligator', emoji: '🐊', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Alligator_mississippiensis_-_American_Alligator_-_XC452934.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alligator_mississippiensis_-_American_Alligator_-_XC452934.ogg', difficulty: 'hard' },
  { name: 'Bat', emoji: '🦇', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Vespertilio_murinus_-_Parti-coloured_Bat_-_XC593744.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vespertilio_murinus_-_Parti-coloured_Bat_-_XC593744.ogg', difficulty: 'hard' },
  { name: 'Guinea Pig', emoji: '🐹', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Guinea_Pig_Feeding_Wheek.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Guinea_Pig_Feeding_Wheek.ogg', difficulty: 'hard' },
  { name: 'Camel', emoji: '🐫', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Camel_Sound.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Camel_Sound.ogg', difficulty: 'hard' },
  { name: 'Bison', emoji: '🦬', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Bison_Sound.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bison_Sound.ogg', difficulty: 'hard' },
  { name: 'Moose', emoji: '🫎', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Elkbellow.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Elkbellow.ogg', difficulty: 'hard' },
  { name: 'Cuckoo', emoji: '🐦', soundUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Cuculus_canorus_-_Common_Cuckoo_-_XC639207.ogg', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cuculus_canorus_-_Common_Cuckoo_-_XC639207.ogg', difficulty: 'hard' },
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