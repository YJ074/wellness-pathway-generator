
import { getRegionalFoods } from '../../../data/regionalFoods';
import { getRegionalNonVegDishes } from './regionalDishData';

/**
 * Generate a region-specific non-vegetarian dish
 * @param region - Region code
 * @param dayIndex - Current day index (0-based)
 * @param isWeightLoss - Whether the diet is for weight loss
 * @param isProteinFocus - Whether the diet is for protein focus
 * @param nonVegType - Optional specific non-veg type preference
 * @returns Regional dish description or empty string if not found
 */
export const generateNonVegByRegion = (
  region: string,
  dayIndex: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  nonVegType?: string
): string => {
  // Get region-specific dishes
  const regionalNonVegDishes = getRegionalNonVegDishes(region);
  
  // Use regional dish every 4th day if available
  if (regionalNonVegDishes.length > 0 && dayIndex % 4 === 0) {
    const regionalIndex = (dayIndex * 7 + 3) % regionalNonVegDishes.length;
    const regionalDish = regionalNonVegDishes[regionalIndex];
    
    // Apply portion control based on diet goals
    let dish = regionalDish;
    
    if (isWeightLoss) {
      dish += ' (smaller portion with extra vegetables)';
    } else if (isProteinFocus) {
      dish += ' (protein-rich portion with minimal carbs)';
    }
    
    return dish;
  }
  
  // Return empty string if no regional dish selected
  return '';
};
