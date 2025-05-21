
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { composeRegionalMeal } from '../../helpers/portionHelpers';
import { RegionalFoodData } from '../../data/regions/types';

/**
 * Generate a lunch based on regional specialties
 */
export const generateRegionalLunch = (
  dayIndex: number,
  regionalFoods: RegionalFoodData,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
) => {
  // Use varied index to avoid repetition in regional foods
  const regionalIndex = (dayIndex * 7 + 3) % regionalFoods.mains.length;
  const regionalLunch = regionalFoods.mains[regionalIndex];
  
  // Format lunch based on dietary goals using helper function
  let lunch = composeRegionalMeal(regionalLunch, isWeightLoss, isProteinFocus, isMale);
  
  // Ensure regional meals always mention rice/roti
  if (!lunch.toLowerCase().includes('roti') && !lunch.toLowerCase().includes('rice')) {
    // Gender-specific portion sizes
    const rotiCount = isMale ? 
      (isWeightLoss ? 3 : 4) : 
      (isWeightLoss ? 2 : 3);
      
    lunch += `, served with ${rotiCount} rotis or ${isMale ? '¾' : '½'} katori rice`;
  }
  
  // For regional specialties, gently introduce pre/probiotics without forcing them
  lunch = enrichWithPrebiotics(lunch, dayIndex);
  lunch = enrichWithProbiotics(lunch, dayIndex);
  
  // Apply deduplication to the regional lunch
  lunch = removeDuplicateFoodItems(lunch);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(lunch);
  lunch += ` - (${healthBenefit})`;
  
  return lunch;
};
