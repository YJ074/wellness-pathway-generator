
import { getRegionalFoods } from '../../../data/regionalFoods';
import { getRegionalNonVegDishes } from './regionalDishData';

/**
 * Generate a region-specific non-vegetarian dish
 * @param nonVegType - Type of non-vegetarian food (e.g., "chicken", "fish")
 * @param dayIndex - Current day index (0-based)
 * @param isWeightLoss - Whether the diet is for weight loss
 * @param isProteinFocus - Whether the diet is for protein focus
 * @param region - Region code
 * @returns Regional dish description or empty string if not found
 */
export const generateNonVegByRegion = (
  nonVegType: string, // Changed parameter order: nonVegType first
  dayIndex: number,   // dayIndex second
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  region?: string
): string => {
  // Get region-specific dishes
  const regionalNonVegDishes = getRegionalNonVegDishes(region || '');
  
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
