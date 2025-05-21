/**
 * Helper functions for meal composition and portion sizing,
 * including regional-specific recommendations.
 */

// Helper function to determine portion size based on dietary goals
export const getPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  mealType: 'rice' | 'curry' | 'vegetable',
  portions: {
    standard: string;
    weightLoss: string;
    proteinFocus: string;
  }
): string => {
  if (isWeightLoss) {
    return portions.weightLoss;
  } else if (isProteinFocus) {
    return portions.proteinFocus;
  } else {
    return portions.standard;
  }
};

// Helper function to compose a regional meal with portion control
export const composeRegionalMeal = (
  regionalMeal: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let meal = regionalMeal;
  if (isWeightLoss) {
    meal += ' (smaller portion)';
  } else if (isProteinFocus) {
    meal += ' (protein-rich portion)';
  }
  return meal;
};

// Helper function to compose a dinner meal with portion control
export const composeDinnerMeal = (
  protein: string,
  vegetables: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let meal = `${protein} and ${vegetables}`;
  if (isWeightLoss) {
    meal += ' (smaller portions)';
  } else if (isProteinFocus) {
    meal += ' (protein-rich portions)';
  }
  return meal;
};

// Helper function to create a meal item with portion control
export const createMealItem = (
  item: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  let mealItem = item;
  if (isWeightLoss) {
    mealItem += ' (smaller portion)';
  } else if (isProteinFocus) {
    mealItem += ' (protein-rich portion)';
  }
  return mealItem;
};

// Helper for Madhya Pradesh-specific portion recommendations
export const getMadhyaPradeshDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Madhya Pradesh breakfast portions
  if (dishName.includes('Poha') || dishName.includes('Upma')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Cheela') || dishName.includes('Paratha')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Dalia') || dishName.includes('Smoothie')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Idli') || dishName.includes('Dosa')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2 medium");
  }
  
  if (dishName.includes('Bhurji')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  // Handle Madhya Pradesh main dish portions
  if (dishName.includes('Dal') || dishName.includes('Palak')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Masala') || dishName.includes('Curry') || dishName.includes('Subzi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Bharta') || dishName.includes('Lauki')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Roti')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Maharashtra-specific portion recommendations
export const getMaharashtraDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Maharashtra breakfast portions
  if (dishName.includes('Poha') || dishName.includes('Upma')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Thalipeeth') || dishName.includes('Bhakri') || dishName.includes('Toast')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Khichdi') || dishName.includes('Usal')) {
    return isWeightLoss ? "⅔ cup" : (isProteinFocus ? "¾ cup" : "¾ cup");
  }
  
  if (dishName.includes('Idli') || dishName.includes('Dosa')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2 medium");
  }
  
  if (dishName.includes('Paratha')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "1 large" : "1 medium");
  }
  
  // Handle Maharashtra main dish portions
  if (dishName.includes('Amti') || dishName.includes('Dal')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Bharli') || dishName.includes('Vangi')) {
    return isWeightLoss ? "2-3 pieces" : "3-4 pieces";
  }
  
  if (dishName.includes('Bhaji') || dishName.includes('Rassa') || dishName.includes('Masala')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Bhaat') || dishName.includes('Rice')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Zunka')) {
    return isWeightLoss ? "½ cup" : "⅔ cup";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Kerala-specific portion recommendations
export const getKeralaDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Kerala breakfast portions
  if (dishName.includes('Idiyappam') || dishName.includes('Puttu')) {
    return isWeightLoss ? "½ serving" : (isProteinFocus ? "⅔ serving" : "1 serving");
  }
  
  if (dishName.includes('Dosa') || dishName.includes('Upma')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "1 large" : "1 medium");
  }
  
  if (dishName.includes('Aval') || dishName.includes('Poha')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Tapioca')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  // Handle Kerala main dish portions
  if (dishName.includes('Olan') || dishName.includes('Avial')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Thoran') || dishName.includes('Pachadi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Erissery') || dishName.includes('Moru')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Rice') || dishName.includes('Matta')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
