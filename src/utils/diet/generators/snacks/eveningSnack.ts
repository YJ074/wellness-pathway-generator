
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { getFruitSources } from '../../data/foodSources';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion, composeRegionalMeal } from '../../helpers/portionHelpers';

/**
 * Generates an evening snack based on diet preferences, day index and region
 */
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
    let snack = composeRegionalMeal(regionalSnack, isWeightLoss, false);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
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
    let snack = "";
    if (dayIndex % 3 === 0) {
      snack = `${seasonalFruit} slices ${fruitPortion} with a sprinkle of chaat masala`;
    } else if (dayIndex % 3 === 1) {
      snack = `${seasonalFruit} ${fruitPortion} with mixed seeds (1 chamach)`;
    } else {
      snack = `${seasonalFruit} ${fruitPortion}`;
    }
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
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
  let snack = eveningSnackOptions[variedEveningIndex] || "";
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(snack);
  snack += ` - (${healthBenefit})`;
  
  return snack;
};
