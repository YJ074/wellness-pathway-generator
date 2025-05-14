
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

export const generateMidMorningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Use prime numbers for varied indices to prevent repetition patterns
  const snackIndex = (dayIndex * 13 + 11) % snacks.length;
  const fruitIndex = (dayIndex * 17 + 5) % fruits.length;
  
  // On even days, use fruit; on odd days, use snacks
  const isEvenDay = dayIndex % 2 === 0;
  
  let snack = "";
  
  if (isEvenDay) {
    // Fruit-based snack
    const fruit = fruits[fruitIndex];
    const portion = getStandardFruitPortion(fruit);
    
    snack = isWeightLoss
      ? `${fruit} ${portion}`
      : `${fruit} ${portion} with a small handful of nuts`;
      
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
    
    // Add prebiotic foods occasionally to improve gut health
    if (dayIndex % 3 === 1) { // Every third day starting from day 1
      snack = enrichWithPrebiotics(snack, dayIndex);
    }
    
    // Apply deduplication to the snack
    snack = removeDuplicateFoodItems(snack);
    
    // Add health benefit
    const healthBenefit = getHealthBenefit(snack);
    snack += ` - (${healthBenefit})`;
    
    return snack;
  }
};
