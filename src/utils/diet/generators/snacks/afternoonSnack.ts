
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

export const generateAfternoonSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Use prime numbers for varied indices to prevent repetition patterns
  // Different offsets from other snack times to ensure variety
  const snackIndex = (dayIndex * 11 + 17) % snacks.length;
  const fruitIndex = (dayIndex * 29 + 13) % fruits.length;
  
  // Use a completely different pattern for variety
  const useSnack = (dayIndex % 3 === 0); // Every third day
  
  let snack = "";
  
  if (!useSnack) {
    // Fruit-based snack
    const fruit = fruits[fruitIndex];
    const portion = getStandardFruitPortion(fruit);
    
    snack = isWeightLoss
      ? `${fruit} ${portion}`
      : `${fruit} ${portion} with a small cup of green tea`;
      
    // Apply deduplication
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
  } else {
    // Regular snack from snack options
    let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
    
    if (allergies) {
      snackOptions = filterAllergies(snackOptions, allergies);
    }
    
    // Get the snack for today
    snack = snackOptions[snackIndex];
    
    // Add probiotic foods occasionally (different from other snack patterns)
    if (dayIndex % 4 === 1) {
      snack = enrichWithProbiotics(snack, dayIndex);
    }
    
    // Apply deduplication
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
  }
};
