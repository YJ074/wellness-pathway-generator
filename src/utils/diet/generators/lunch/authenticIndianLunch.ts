
import { getRegionalFoods } from '../../data/regionalFoods';
import { filterAllergies } from '../../helpers/allergyHelpers';
import { authenticLunchOptions } from './data/authenticLunchOptions';
import { getRegionKey } from './helpers/lunchRegionMapper';
import { addTraditionalAccompaniments } from './helpers/lunchAccompaniments';
import { adjustPortionsForGoals } from './helpers/lunchPortionAdjuster';
import { finalizeLunch } from './helpers/lunchFinalizer';

/**
 * Generate authentic Indian lunch options with cultural authenticity
 */
export const generateAuthenticIndianLunch = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean,
  region?: string,
  allergies?: string
): string => {
  // Get regional foods first for authenticity
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional main dishes if available
  if (region && regionalFoods.mains.length > 0) {
    const regionalIndex = (dayIndex * 7 + 11) % regionalFoods.mains.length;
    let lunch = regionalFoods.mains[regionalIndex];
    
    // Enhance with traditional accompaniments
    lunch = addTraditionalAccompaniments(lunch, region);
    
    // Apply portion adjustments
    lunch = adjustPortionsForGoals(lunch, isWeightLoss, isProteinFocus, isMale);
    
    // Filter allergies
    if (allergies) {
      const filtered = filterAllergies([lunch], allergies);
      if (filtered.length > 0) {
        lunch = filtered[0];
      }
    }
    
    return finalizeLunch(lunch, dayIndex);
  }
  
  // Fallback to authentic regional options
  const regionKey = getRegionKey(region);
  const lunchOptions = authenticLunchOptions[regionKey] || authenticLunchOptions.north;
  
  const lunchIndex = (dayIndex * 13 + 7) % lunchOptions.length;
  let lunch = lunchOptions[lunchIndex];
  
  // Apply adjustments
  lunch = adjustPortionsForGoals(lunch, isWeightLoss, isProteinFocus, isMale);
  
  // Filter allergies
  if (allergies) {
    const filtered = filterAllergies([lunch], allergies);
    if (filtered.length > 0) {
      lunch = filtered[0];
    }
  }
  
  return finalizeLunch(lunch, dayIndex);
};
