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
    // Select a seasonal/local fruit based on the day
    const seasonalFruit = availableFruits[dayIndex % availableFruits.length];
    
    // Standardized fruit portion using our helper
    const fruitPortion = getStandardFruitPortion(seasonalFruit);
    
    // Simple fruit-based snack with minimal processing
    return `${seasonalFruit} ${fruitPortion}${dayIndex % 3 === 0 ? ' with a sprinkle of kala namak and kali mirch' : ''}`;
  }
  
  let midMorningOptions = [
    'Chaas (1 glass)',
    'Bhuna chana (¼ katori)',
    'Ankurit anaj salad (½ katori)',
    'Dahi (½ katori)',
    'Mixed dry fruits (1 mutthi)',
    'Kheera and gajar sticks (1 katori)',
    'Nariyal pieces (¼ katori)',
    'Makhana (fox nuts, ¼ katori)',
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
  return midMorningOptions[dayIndex % midMorningOptions.length] || "";
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
    const regionalSnack = regionalFoods.snacks[dayIndex % regionalFoods.snacks.length];
    
    // Use the helper function for consistent formatting
    return composeRegionalMeal(regionalSnack, isWeightLoss, false);
  }
  
  // Increase fruit frequency in evening snacks (3 days per week)
  // Sunday, Tuesday, Thursday
  const includeFruit = dayIndex % 7 === 0 || dayIndex % 7 === 2 || dayIndex % 7 === 4;
  
  if (includeFruit) {
    // Get available fruits based on allergies
    const availableFruits = getFruitSources(undefined, allergies);
    // Select a seasonal/local fruit based on the day
    const seasonalFruit = availableFruits[(dayIndex + 2) % availableFruits.length];
    
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
    'Roasted makhana (¼ katori)',
    'Sabzi cutlet (2 pieces, baked)',
    'Multigrain dhokla (2 pieces)',
    'Bhuna chana (¼ katori) with pyaaz and tamatar',
    'Masala murmure (½ katori)',
    'Steamed bhutta dana (½ katori) with nimbu and kala namak',
    'Paneer tikka (4-5 small pieces, grilled)',
    'Moongfali chaat (¼ katori)',
    'Roasted shakarkandi (1 small)',
    'Mixed sabzi soup (1 katori)',
    'Kala chana chaat (½ katori)',
    'Ankurit anaj bhel (¾ katori)',
    'Mini idlis with sambar (4 pieces)',
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
  
  return eveningSnackOptions[(dayIndex + 3) % eveningSnackOptions.length] || "";
};

export const generateSnacks = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Not directly used in generation pipeline above, but add allergies param for legacy compat
  let snack = snacks[dayIndex % snacks.length];
  let fruit = fruits[dayIndex % fruits.length];
  
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
