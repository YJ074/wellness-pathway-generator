import { filterAllergies } from '../../helpers/allergyHelpers';
import { getFruitSources } from '../../data/foodSources';
import { getStandardFruitPortion, getDailyNutsMixture } from '../../helpers/portionHelpers';
// Update this import to use the new modular deduplication system
import { addWithoutDuplication } from '../../helpers/deduplication';

// Enhanced helper to prevent duplicate additions to breakfast descriptions
// Now leverages the centralized deduplication module with strict matching
export const preventDuplicateAdditions = (breakfast: string, addition: string): string => {
  return addWithoutDuplication(breakfast, addition);
};

// Helper to add fruits to breakfast options
export const addFruitsToBreakfast = (
  breakfastOptions: string[],
  dayIndex: number,
  allergies?: string
): string[] => {
  const availableFruits = getFruitSources(undefined, allergies);
  
  // Use a different index calculation for fruits to avoid repetition
  const fruitIndex = (dayIndex * 3 + 7) % availableFruits.length;
  const seasonalFruit = availableFruits[fruitIndex];
  
  // Standardized fruit portion using our helper
  const fruitPortion = getStandardFruitPortion(seasonalFruit);
  
  return breakfastOptions.map(breakfast => {
    // Check first if the breakfast already contains this fruit (case-insensitive)
    if (breakfast.toLowerCase().includes(seasonalFruit.toLowerCase())) {
      return breakfast;
    }
    // Use our enhanced duplicate prevention function
    return preventDuplicateAdditions(breakfast, `with ${seasonalFruit} ${fruitPortion}`);
  });
};

// Helper to add nuts to breakfast options
export const addNutsToBreakfast = (
  breakfastOptions: string[],
  dayIndex: number
): string[] => {
  const dailyNuts = getDailyNutsMixture(dayIndex);
  return breakfastOptions.map(breakfast => {
    // Check first if the breakfast already contains these nuts
    if (breakfast.toLowerCase().includes(dailyNuts.toLowerCase())) {
      return breakfast;
    }
    // Only add nuts if they're not already included (using our enhanced function)
    return preventDuplicateAdditions(breakfast, `with ${dailyNuts}`);
  });
};

// Helper to determine if a breakfast already contains probiotics
export const hasProbiotics = (breakfast: string): boolean => {
  const lowerBreakfast = breakfast.toLowerCase();
  return lowerBreakfast.includes('curd') || 
         lowerBreakfast.includes('dahi') || 
         lowerBreakfast.includes('yogurt') || 
         lowerBreakfast.includes('kombucha');
};

// Helper to determine if a breakfast already contains prebiotics
export const hasPrebiotics = (breakfast: string): boolean => {
  const lowerBreakfast = breakfast.toLowerCase();
  return lowerBreakfast.includes('onion') || 
         lowerBreakfast.includes('garlic') || 
         lowerBreakfast.includes('banana') || 
         lowerBreakfast.includes('oats');
};
