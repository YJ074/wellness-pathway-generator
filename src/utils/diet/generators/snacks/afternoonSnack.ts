
import { filterAllergies } from '../../helpers/allergyHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';

export const generateAfternoonSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Every other day, use a fruit-based snack for afternoon to ensure variety
  const useFruit = dayIndex % 2 === 1;
  
  // Use prime number-based offsets to ensure variety
  const snackIndex = (dayIndex * 13 + 7) % snacks.length;
  const fruitIndex = (dayIndex * 11 + 3) % fruits.length;
  
  let snack = '';
  
  if (useFruit) {
    // On fruit days, provide a simple fresh fruit option
    const fruit = fruits[fruitIndex];
    const portion = getStandardFruitPortion(fruit);
    
    snack = `Fresh ${fruit} (${portion})`;
    
    // For weight loss, add guidance on timing
    if (isWeightLoss) {
      snack += ' - consume at least 2 hours before dinner for optimal digestion';
    }
  } else {
    // On regular days, provide traditional Indian snack options
    let snackOption = snacks[snackIndex];
    
    // Add portion sizes appropriate for afternoon snacks
    if (isWeightLoss) {
      snack = `Small portion of ${snackOption} (½ serving)`;
    } else {
      snack = `${snackOption} (1 small serving)`;
    }
    
    // Every 5th day, suggest traditional Indian tea-time snack combinations
    if (dayIndex % 5 === 0) {
      const teaSnacks = [
        'Masala Chai with 2 Marie biscuits',
        'Adrak Chai with 1 small samosa',
        'Small cup of Masala Chai with 2 homemade mathri',
        'Kadak Chai with 2-3 small namkeen sevs',
        'Ginger Tea with 1 small mathi',
        'Masala Chai with 2-3 pieces of homemade dhokla',
        'Light Lemon Tea with 1 small vegetable puff'
      ];
      
      snack = teaSnacks[dayIndex % teaSnacks.length];
      
      // For weight loss, modify the portion
      if (isWeightLoss) {
        snack = snack.replace('2 Marie', '1 Marie')
                     .replace('1 small samosa', 'half samosa')
                     .replace('2 homemade', '1 homemade')
                     .replace('2-3 small', '1-2 small')
                     .replace('1 small mathi', 'half mathi')
                     .replace('2-3 pieces', '1-2 pieces')
                     .replace('1 small vegetable puff', 'half vegetable puff');
      }
    }
  }
  
  // Apply deduplication to snack description
  snack = removeDuplicateFoodItems(snack);
  
  // Filter for allergies if specified
  if (allergies) {
    const snackArray = [snack];
    const filteredSnacks = filterAllergies(snackArray, allergies);
    snack = filteredSnacks[0] || "Fresh seasonal fruit";
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(snack);
  snack += ` - (${healthBenefit})`;
  
  return snack;
};
