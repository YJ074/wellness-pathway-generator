import { filterAllergies } from '../../helpers/allergyHelpers';
import { getFruitSources } from '../../data/foodSources';
import { getStandardFruitPortion, getDailyNutsMixture } from '../../helpers/portionHelpers';

// Enhanced helper to prevent duplicate additions to breakfast descriptions
// Now with comprehensive detection of all variations of food items
export const preventDuplicateAdditions = (breakfast: string, addition: string): string => {
  // Case insensitive check for the exact addition
  const lowerBreakfast = breakfast.toLowerCase();
  const lowerAddition = addition.toLowerCase();
  
  if (lowerBreakfast.includes(lowerAddition)) {
    return breakfast;
  }
  
  // Extract the food name from the addition for more thorough checking
  const foodMatch = addition.match(/(?:with|and)\s+([A-Za-z\s]+)(?:\s+\(|\b)/i);
  if (foodMatch && foodMatch[1]) {
    const foodName = foodMatch[1].trim().toLowerCase();
    
    // Check for the food name in various formats
    if (lowerBreakfast.includes(`with ${foodName}`) || 
        lowerBreakfast.includes(`and ${foodName}`) || 
        lowerBreakfast.includes(` ${foodName} (`) ||
        lowerBreakfast.includes(`${foodName},`)) {
      return breakfast; // Food is already included in some form
    }
    
    // Check for food variations (e.g., singular/plural forms)
    const pluralFoodName = foodName.endsWith('s') ? foodName : `${foodName}s`;
    const singularFoodName = foodName.endsWith('s') ? foodName.slice(0, -1) : foodName;
    
    if (lowerBreakfast.includes(` ${pluralFoodName} (`) || 
        lowerBreakfast.includes(` ${singularFoodName} (`)) {
      return breakfast; // Food is already included in variant form
    }
  }
  
  // Otherwise add it with proper comma formatting
  return breakfast.endsWith(',') ? `${breakfast} ${addition}` : `${breakfast}, ${addition}`;
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
