
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getDryFruits } from '../../data/dryFruits';
import { getFruitSources } from '../../data/foodSources';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { removeDuplicateFoodItems } from '../../helpers/deduplicationHelper';

/**
 * Generates a mid-morning snack based on diet preferences and day index
 */
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
    let snack = `${seasonalFruit} ${fruitPortion}${dayIndex % 3 === 0 ? ' with a sprinkle of kala namak and kali mirch' : ''}`;
    
    // Apply deduplication to fruit snack
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
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
    'Beetroot juice (1 glass)',
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
  let snack = midMorningOptions[variedIndex] || "";
  
  // Apply deduplication to mid-morning snack
  snack = removeDuplicateFoodItems(snack);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(snack);
  snack += ` - (${healthBenefit})`;
  
  return snack;
};
