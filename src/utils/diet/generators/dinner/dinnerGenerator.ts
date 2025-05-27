
import { filterAllergies } from '../../helpers/allergyHelpers';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../../helpers/deduplication';
import { 
  getLocalizedProteinName,
  getPortionSize,
  getBreadPortionSize
} from '../../helpers/portionHelpers';
import { getAllowedNonVegTypes } from '../../helpers/dietaryPreferenceHelper';
import { generateNonVegDinner } from './nonVegDinner';
import { generateRegionalDinner } from './regionalDinner';
import { composeDinnerMeal } from './dinnerComposer';
import { generateAuthenticIndianDinner } from './authenticIndianDinner';

export const generateDinner = (
  dayIndex: number, 
  proteins: string[], 
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
  
  // Use non-vegetarian dishes every 4th day if user allows non-veg food
  // Use a different pattern than lunch to ensure variety
  if (allowNonVeg && (dayIndex + 2) % 4 === 0) {
    const allowedTypes = getAllowedNonVegTypes(dietaryPreference || 'non-vegetarian');
    // Use different non-veg types on different days
    const nonVegType = allowedTypes[(dayIndex * 11 + 5) % allowedTypes.length];
    
    return generateNonVegDinner(
      dayIndex,
      isWeightLoss,
      isProteinFocus,
      nonVegType,
      allergies,
      region
    );
  }

  // Priority 1: Use authentic Indian dinner options (every other day)
  if (dayIndex % 2 === 1) {
    return generateAuthenticIndianDinner(
      dayIndex,
      isWeightLoss,
      isProteinFocus,
      gender === 'male',
      region,
      allergies
    );
  }

  // Priority 2: Check for regional dinner options
  if (region && dayIndex % 6 === 0) {
    const regionalDinner = generateRegionalDinner(
      dayIndex,
      region,
      isWeightLoss,
      isProteinFocus,
      gender === 'male'
    );
    
    if (regionalDinner) {
      return regionalDinner;
    }
  }
  
  // Fallback: Standard dinner composition
  return composeDinnerMeal(
    dayIndex,
    {
      protein1: getLocalizedProteinName(proteins[(dayIndex * 19 + 5) % proteins.length]),
      protein2: getLocalizedProteinName(proteins[(dayIndex * 23 + 9) % proteins.length]),
      veggie1: vegetables[(dayIndex * 11 + 7) % vegetables.length],
      veggie2: vegetables[(dayIndex * 13 + 11) % vegetables.length]
    },
    isWeightLoss,
    isProteinFocus,
    gender === 'male'
  );
};
