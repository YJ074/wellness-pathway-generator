
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../../helpers/deduplication';
import { getNonVegDishPortion } from '../../helpers/portionTypes/nonVegPortions';
import { generateNonVegByRegion } from './regional/nonVegRegionalGenerator';
import { getNonVegDishOptions } from './nonVegDishOptions';

/**
 * Generate a non-vegetarian dish based on region and diet preferences
 * @param dayIndex - Current day index (0-based)
 * @param isWeightLoss - Whether the diet is for weight loss
 * @param isProteinFocus - Whether the diet is for protein focus
 * @param nonVegType - Type of non-vegetarian food ('chicken', 'fish', 'egg', 'mutton', etc.)
 * @param allergies - Comma-separated allergies to avoid
 * @param region - Regional preference
 * @returns Formatted non-vegetarian dish description
 */
export const generateNonVegDish = (
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType?: string,
  allergies?: string,
  region?: string
): string => {
  // Check for regional specialties first
  if (region) {
    const regionalDish = generateNonVegByRegion(
      region, 
      dayIndex, 
      isWeightLoss,
      isProteinFocus,
      nonVegType
    );
    
    // If we have a regional dish, use it (regional generator returns empty string if no dish found)
    if (regionalDish) {
      // Apply deduplication
      const dish = removeDuplicateFoodItems(regionalDish);
      
      // Add health benefit
      const healthBenefit = getHealthBenefit(dish);
      return `${dish} - (${healthBenefit})`;
    }
  }
  
  // Fallback to generic non-veg dishes if no regional dish is selected
  // If no specific non-veg type is provided, select randomly
  const availableTypes = ['chicken', 'fish', 'egg', 'mutton', 'prawn'];
  const selectedType = nonVegType || availableTypes[(dayIndex + 1) % availableTypes.length];
  
  // Get dish options based on the type
  const dishOptions = getNonVegDishOptions(selectedType);
  
  // Select a dish based on the day index to ensure variety
  const selectedDishIndex = (dayIndex * 13 + 7) % dishOptions.length;
  let dish = dishOptions[selectedDishIndex];
  
  // Get appropriate portion recommendation
  const portionInfo = getNonVegDishPortion(selectedType, isWeightLoss, isProteinFocus);
  
  // Format the dish with portion information
  dish = `${dish} (${portionInfo})`;
  
  // Add appropriate sides based on dietary goals
  if (isWeightLoss) {
    dish += ' with steamed vegetables and minimal rice';
  } else if (isProteinFocus) {
    dish += ' with extra lean protein and moderate carbs';
  } else {
    dish += ' with balanced sides';
  }
  
  // Apply deduplication
  dish = removeDuplicateFoodItems(dish);
  
  // Filter for allergies if specified
  if (allergies) {
    dish = filterAllergies([dish], allergies)[0] || "";
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(dish);
  dish += ` - (${healthBenefit})`;
  
  return dish;
};
