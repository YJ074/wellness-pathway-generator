
import { filterAllergies } from '../helpers/allergyHelpers';
import { getDryFruits } from '../data/dryFruits';
import { getRegionalFoods } from '../data/regionalFoods';
import { getFruitSources } from '../data/foodSources';
import { 
  getStandardFruitPortion,
  composeRegionalMeal
} from '../helpers/portionHelpers';

export const generateMidMorningSnack = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Increase fruit frequency in mid-morning snacks (3-4 days per week)
  // Monday, Wednesday, Friday
  const includeFruit = dayIndex % 7 === 1 || dayIndex % 7 === 3 || dayIndex % 7 === 5;
  
  if (includeFruit) {
    // Get available fruits based on allergies
    const availableFruits = getFruitSources(undefined, allergies);
    
    // Use a prime-based offset to vary fruit selection and avoid repetition
    const fruitIndex = (dayIndex * 7 + 11) % availableFruits.length;
    
    // Select a seasonal/local fruit based on the varied day index
    const seasonalFruit = availableFruits[fruitIndex];
    
    // Standardized fruit portion using our helper
    const fruitPortion = getStandardFruitPortion(seasonalFruit);
    
    // Simple fruit-based snack with minimal processing
    return `${seasonalFruit} ${fruitPortion}${dayIndex % 3 === 0 ? ' with a sprinkle of kala namak and kali mirch' : ''}`;
  }
  
  let midMorningOptions = [
    'Chaas (1 glass)',
    'Bhuna chana (1 handful)',
    'Ankurit anaj salad (½ katori)',
    'Dahi (½ katori)',
    'Mixed dry fruits (1 handful)',
    'Kheera and gajar sticks (1 katori)',
    'Nariyal pieces (¼ katori)',
    'Makhana (fox nuts, 1 handful)',
    'Kaddu ke beej (2 chamach)',
    'Homemade lassi (1 glass)',
    'Nariyal pani (1 glass)',
    'Ragi malt (1 glass)',
    'Chukandar juice (1 glass)',
    'Homemade sabzi soup (1 katori)',
    'Steam kiya hua makka (½ katori)',
    'Multigrain khakhra (2 pieces)',
    'Sabzi cutlet (1 piece, baked)'
  ];
  
  // Add dry fruits to mid-morning snack on even-numbered days
  if (dayIndex % 2 === 1) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    midMorningOptions = midMorningOptions.map(snack => `${snack}, with ${dryFruits}`);
  }
  
  if (allergies) {
    midMorningOptions = filterAllergies(midMorningOptions, allergies);
  }
  
  // Use prime number offset for better variety across days
  const variedIndex = (dayIndex * 13 + 7) % midMorningOptions.length;
  return midMorningOptions[variedIndex] || "";
};

export const generateEveningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional snack options
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional snack options every 4th day if available
  if (region && regionalFoods.snacks.length > 0 && dayIndex % 4 === 0) {
    // Use a varied index to avoid repetition
    const regionalIndex = (dayIndex * 3 + 5) % regionalFoods.snacks.length;
    const regionalSnack = regionalFoods.snacks[regionalIndex];
    
    // Use the helper function for consistent formatting
    return composeRegionalMeal(regionalSnack, isWeightLoss, false);
  }
  
  // Increase fruit frequency in evening snacks (3 days per week)
  // Sunday, Tuesday, Thursday
  const includeFruit = dayIndex % 7 === 0 || dayIndex % 7 === 2 || dayIndex % 7 === 4;
  
  if (includeFruit) {
    // Get available fruits based on allergies
    const availableFruits = getFruitSources(undefined, allergies);
    
    // Use a different prime-based offset to ensure variety
    const fruitIndex = (dayIndex * 11 + 17) % availableFruits.length;
    
    // Select a seasonal/local fruit based on the varied day index
    const seasonalFruit = availableFruits[fruitIndex];
    
    // Standardized fruit portion using our helper
    const fruitPortion = getStandardFruitPortion(seasonalFruit);
    
    // Create a more interesting fruit snack
    if (dayIndex % 3 === 0) {
      return `${seasonalFruit} slices ${fruitPortion} with a sprinkle of chaat masala`;
    } else if (dayIndex % 3 === 1) {
      return `${seasonalFruit} ${fruitPortion} with mixed seeds (1 chamach)`;
    } else {
      return `${seasonalFruit} ${fruitPortion}`;
    }
  }
  
  let eveningSnackOptions = [
    'Roasted makhana (1 handful)',
    'Sabzi cutlet (2 pieces, baked)',
    'Multigrain dhokla (2 dhokla)',
    'Bhuna chana (1 handful) with pyaaz and tamatar',
    'Masala murmure (½ katori)',
    'Steamed bhutta dana (½ katori) with nimbu and kala namak',
    'Paneer tikka (4-5 small pieces, grilled)',
    'Moongfali chaat (1 handful)',
    'Roasted shakarkandi (1 small)',
    'Mixed sabzi soup (1 katori)',
    'Kala chana chaat (½ katori)',
    'Ankurit anaj bhel (¾ katori)',
    'Mini idlis with sambar (4 idlis)',
    'Moong dal cheela (1 piece)',
    'Baked mathri (2 pieces)',
    'Steamed muthia (2 pieces)',
    'Roasted jowar puffs (½ katori)',
    'Kheera and pudina raita (1 katori)',
    'Palak and oats tikki (2 small pieces)'
  ];
  
  if (allergies) {
    eveningSnackOptions = filterAllergies(eveningSnackOptions, allergies);
  }
  
  // Use a different prime-based calculation for evening snacks
  const variedEveningIndex = (dayIndex * 17 + 13) % eveningSnackOptions.length;
  return eveningSnackOptions[variedEveningIndex] || "";
};

export const generateSnacks = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Not directly used in generation pipeline above, but add allergies param for legacy compat
  
  // Use prime number offsets to ensure variety
  const snackIndex = (dayIndex * 11 + 3) % snacks.length;
  const fruitIndex = (dayIndex * 13 + 7) % fruits.length;
  
  let snack = snacks[snackIndex];
  let fruit = fruits[fruitIndex];
  
  // Standardized fruit portion using our helper
  const fruitPortion = getStandardFruitPortion(fruit);
  fruit = `${fruit} ${fruitPortion}`;
  
  if (allergies) {
    snack = filterAllergies([snack], allergies)[0] || "";
    fruit = filterAllergies([fruit], allergies)[0] || "";
  }
  if (isWeightLoss) {
    return `${fruit} OR ${snack} (choose one per day)`;
  }
  return `${fruit} AND ${snack}`;
};
