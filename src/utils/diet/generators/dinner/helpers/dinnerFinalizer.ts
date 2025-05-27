
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../../helpers/deduplication';

/**
 * Finalize dinner with health benefits and deduplication
 */
export const finalizeDinner = (dinner: string, dayIndex: number): string => {
  // Add probiotics and prebiotics occasionally (lighter for dinner)
  if (dayIndex % 6 === 0) {
    dinner = enrichWithProbiotics(dinner, dayIndex);
  } else if (dayIndex % 7 === 0) {
    dinner = enrichWithPrebiotics(dinner, dayIndex);
  }
  
  // Apply deduplication
  dinner = removeDuplicateFoodItems(dinner);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dinner);
  dinner += ` - (${healthBenefit})`;
  
  return dinner;
};
