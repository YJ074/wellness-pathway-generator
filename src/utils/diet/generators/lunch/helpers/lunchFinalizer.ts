
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../../helpers/deduplication';

/**
 * Finalize lunch with health benefits and deduplication
 */
export const finalizeLunch = (lunch: string, dayIndex: number): string => {
  // Add probiotics and prebiotics occasionally
  if (dayIndex % 4 === 0) {
    lunch = enrichWithProbiotics(lunch, dayIndex);
  } else if (dayIndex % 5 === 0) {
    lunch = enrichWithPrebiotics(lunch, dayIndex);
  }
  
  // Apply deduplication
  lunch = removeDuplicateFoodItems(lunch);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(lunch);
  lunch += ` - (${healthBenefit})`;
  
  return lunch;
};
