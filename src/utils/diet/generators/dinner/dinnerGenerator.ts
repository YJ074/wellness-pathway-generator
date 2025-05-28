
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

  // Check for regional dinner options
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
  
  // Use prime number-based offsets to ensure variety across days
  // These create non-repeating patterns over 75 days
  const protein1Index = (dayIndex * 19 + 5) % proteins.length;
  let protein2Index = (dayIndex * 23 + 9) % proteins.length; // Different offset ensures variety
  
  const veggie1Index = (dayIndex * 11 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 13 + 11) % vegetables.length;
  
  // Select ingredients for today's dinner with protein diversity
  // Using two complementary protein sources increases amino acid profile completeness
  let protein1 = proteins[protein1Index];
  let protein2 = proteins[protein2Index]; // Different protein than lunch
  
  // Ensure we're not repeating dairy products across meals
  if (hasFoodBeenUsedToday(dayIndex, protein1)) {
    // Look for an alternative protein
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein1Index + i) % proteins.length;
      if (!hasFoodBeenUsedToday(dayIndex, proteins[newIndex])) {
        protein1 = proteins[newIndex];
        break;
      }
    }
  }
  
  // Also check second protein for repetition - especially avoid two dairy or two legumes
  if (hasFoodBeenUsedToday(dayIndex, protein2) || protein2.toLowerCase().includes(protein1.toLowerCase())) {
    // Try to find a different protein type
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein2Index + i) % proteins.length;
      const candidate = proteins[newIndex];
      
      // Check if it's different from protein1 and not used yet today
      if (candidate !== protein1 && !hasFoodBeenUsedToday(dayIndex, candidate)) {
        protein2 = candidate;
        break;
      }
    }
  }
  
  const veggie1 = vegetables[veggie1Index];
  const veggie2 = vegetables[veggie2Index];
  
  // Add local names to proteins for better understanding and cultural relevance
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Generate the complete dinner meal
  let dinner = composeDinnerMeal(
    dayIndex,
    {
      protein1: protein1WithLocalName,
      protein2: protein2WithLocalName,
      veggie1,
      veggie2
    },
    isWeightLoss,
    isProteinFocus,
    gender === 'male'
  );
  
  // Apply deduplication to dinner
  dinner = removeDuplicateFoodItems(dinner);
  
  // Filter for allergies if specified
  if (allergies) {
    dinner = filterAllergies([dinner], allergies)[0] || "";
  }
  
  // Add health benefit to help user understand nutritional value
  const healthBenefit = getHealthBenefit(dinner);
  dinner += ` - (${healthBenefit})`;
  
  return dinner;
};
