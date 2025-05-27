
import { getRegionalFoods } from '../../data/regionalFoods';
import { filterAllergies } from '../../helpers/allergyHelpers';
import { authenticDinnerOptions } from './data/authenticDinnerOptions';
import { getRegionKey } from './helpers/dinnerRegionMapper';
import { addTraditionalDinnerAccompaniments } from './helpers/dinnerAccompaniments';
import { adjustDinnerPortions } from './helpers/dinnerPortionAdjuster';
import { finalizeDinner } from './helpers/dinnerFinalizer';

/**
 * Generate authentic Indian dinner options with cultural authenticity
 */
export const generateAuthenticIndianDinner = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean,
  region?: string,
  allergies?: string
): string => {
  // Get regional foods first for authenticity
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional main dishes if available (prioritize dinner authenticity)
  if (region && regionalFoods.mains.length > 0 && dayIndex % 3 === 0) {
    const regionalIndex = (dayIndex * 11 + 13) % regionalFoods.mains.length;
    let dinner = regionalFoods.mains[regionalIndex];
    
    // Enhance with traditional dinner accompaniments
    dinner = addTraditionalDinnerAccompaniments(dinner, region);
    
    // Apply portion adjustments for dinner (typically lighter than lunch)
    dinner = adjustDinnerPortions(dinner, isWeightLoss, isProteinFocus, isMale);
    
    // Filter allergies
    if (allergies) {
      const filtered = filterAllergies([dinner], allergies);
      if (filtered.length > 0) {
        dinner = filtered[0];
      }
    }
    
    return finalizeDinner(dinner, dayIndex);
  }
  
  // Use authentic regional dinner options
  const regionKey = getRegionKey(region);
  const dinnerOptions = authenticDinnerOptions[regionKey] || authenticDinnerOptions.north;
  
  const dinnerIndex = (dayIndex * 17 + 11) % dinnerOptions.length;
  let dinner = dinnerOptions[dinnerIndex];
  
  // Apply dinner-specific adjustments
  dinner = adjustDinnerPortions(dinner, isWeightLoss, isProteinFocus, isMale);
  
  // Filter allergies
  if (allergies) {
    const filtered = filterAllergies([dinner], allergies);
    if (filtered.length > 0) {
      dinner = filtered[0];
    }
  }
  
  return finalizeDinner(dinner, dayIndex);
};
