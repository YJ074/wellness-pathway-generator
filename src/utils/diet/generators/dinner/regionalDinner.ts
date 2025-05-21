
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { composeRegionalMeal } from '../../helpers/portionHelpers';

/**
 * Generates a regional-specific dinner based on the user's region
 */
export function generateRegionalDinner(
  dayIndex: number,
  region: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string | null {
  // Get region-specific foods
  const regionalFoods = getRegionalFoods(region);
  
  // Only proceed if regional main dishes are available
  if (regionalFoods.mains.length === 0) {
    return null;
  }
  
  // Use varied index to avoid repetition in regional foods
  const regionalIndex = (dayIndex * 5 + 11) % regionalFoods.mains.length;
  const regionalDinner = regionalFoods.mains[regionalIndex];
  
  // Format dinner based on dietary goals using the helper function
  // Pass gender information for portion sizing
  let dinner = composeRegionalMeal(regionalDinner, isWeightLoss, isProteinFocus, isMale);
  
  // Ensure regional meals always mention rice/roti with gender-specific portions
  if (!dinner.toLowerCase().includes('roti') && !dinner.toLowerCase().includes('rice')) {
    const rotiCount = isMale ? (isWeightLoss ? 2 : 3) : (isWeightLoss ? 1 : 2);
    dinner += `, served with ${rotiCount} rotis or ${isMale ? '½' : '¼'} katori rice`;
  }
  
  // Gently introduce pre/probiotics to regional specialties
  dinner = enrichWithPrebiotics(dinner, dayIndex);
  dinner = enrichWithProbiotics(dinner, dayIndex);
  
  // Apply deduplication to regional dinner
  dinner = removeDuplicateFoodItems(dinner);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dinner);
  dinner += ` - (${healthBenefit})`;
  
  return dinner;
}
