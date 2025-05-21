
import { getNonVegDishPortion, balanceNonVegMeal, getHealthyNonVegCookingMethod } from '../../helpers/portionTypes/nonVegPortions';
import { getRegionalFoods } from '../../data/regionalFoods';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { filterAllergies } from '../../helpers/allergyHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { getNonVegOptions } from './nonVegDishOptions';
import { generateNonVegByRegion } from './regional/nonVegRegionalGenerator';

// Main generator function for non-vegetarian dishes
export const generateNonVegDish = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType: string, // 'chicken', 'fish', 'egg', 'mutton', etc.
  allergies?: string,
  region?: string
): string => {
  // Try regional non-veg dishes first if region is specified and it's a good day for it
  if (region && dayIndex % 4 === 0) {
    const regionalNonVegDish = generateNonVegByRegion(
      dayIndex,
      nonVegType,
      region,
      isWeightLoss,
      isProteinFocus
    );
    
    if (regionalNonVegDish) {
      // If we got a regional dish, use it (already has portions)
      return regionalNonVegDish;
    }
  }

  // Get standard non-veg options if no regional dish was selected
  const nonVegOptions = getNonVegOptions(nonVegType);
  
  // Use the day index to select a dish, with prime number offset to avoid repetition
  const dishIndex = (dayIndex * 7 + 11) % nonVegOptions.length;
  let dishBase = nonVegOptions[dishIndex];
  
  // Get appropriate portion size using Indian household measures
  const portion = getNonVegDishPortion(nonVegType, isWeightLoss, isProteinFocus);
  
  // Get appropriate cooking method based on health goals
  const cookingMethod = getHealthyNonVegCookingMethod(nonVegType, isWeightLoss);
  
  // Create basic dish with portion and cooking method
  let dish = `${cookingMethod} ${dishBase} (${portion})`;
  
  // Balance the meal with appropriate sides using Indian measures
  dish = balanceNonVegMeal(dish, isWeightLoss, isProteinFocus);
  
  // Apply prebiotics to enhance nutritional profile
  dish = enrichWithPrebiotics(dish, dayIndex);
  
  // Filter for allergies if specified
  if (allergies) {
    dish = filterAllergies([dish], allergies)[0] || "";
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dish);
  dish += ` - (${healthBenefit})`;
  
  return dish;
};
