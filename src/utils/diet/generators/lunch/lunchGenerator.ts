
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getRegionalFoods } from '../../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../../helpers/deduplication';
import { 
  getLocalizedProteinName, 
  getLocalizedGrainName,
  composeRegionalMeal,
  getBreadPortionSize,
  getVeganProteinAlternative,
  getProteinPortion,
  getIndianMeasure
} from '../../helpers/portionHelpers';
import { generateRegionalLunch } from './regionalLunch';
import { generateNonVegLunch } from './nonVegLunch';
import { composeLunchMeal } from './lunchComposer';
import { getAllowedNonVegTypes } from '../../helpers/dietaryPreferenceHelper';

/**
 * Generate a lunch meal based on user preferences and dietary restrictions
 */
export const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string,
  dietaryPreference?: string,
  gender?: string
) => {
  // Check if non-vegetarian dishes are allowed
  const allowNonVeg = dietaryPreference && getAllowedNonVegTypes(dietaryPreference).length > 0;
  
  // Use non-vegetarian dishes every 3rd day if user allows non-veg food
  if (allowNonVeg && dayIndex % 3 === 0) {
    return generateNonVegLunch(
      dayIndex,
      isWeightLoss,
      isProteinFocus,
      dietaryPreference || 'non-vegetarian',
      allergies,
      region,
      gender
    );
  }

  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional lunch options every 5th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 5 === 0) {
    return generateRegionalLunch(
      dayIndex,
      regionalFoods,
      isWeightLoss,
      isProteinFocus,
      gender === 'male'
    );
  }
  
  // Standard lunch composition for non-regional, non-non-veg days
  return composeLunchMeal(
    dayIndex,
    proteins,
    grains,
    vegetables,
    isWeightLoss,
    isProteinFocus,
    allergies,
    gender === 'male'
  );
};
