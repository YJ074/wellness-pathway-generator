
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { removeDuplicateFoodItems, normalizeMealForPDF } from '../../helpers/deduplicationHelper';

/**
 * Generates a general snack option based on diet preferences and day index
 */
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
  
  // Apply enhanced deduplication to ensure no repeated food terms
  // Using our more comprehensive normalization function
  snack = normalizeMealForPDF(snack);
  fruit = normalizeMealForPDF(fruit);
  
  // Add health benefits
  const snackHealthBenefit = getHealthBenefit(snack);
  const fruitHealthBenefit = getHealthBenefit(fruit);
  
  snack += ` - (${snackHealthBenefit})`;
  fruit += ` - (${fruitHealthBenefit})`;
  
  if (isWeightLoss) {
    return `${fruit} OR ${snack} (choose one per day)`;
  }
  return `${fruit} AND ${snack}`;
};
