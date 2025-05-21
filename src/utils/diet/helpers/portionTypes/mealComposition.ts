
/**
 * Helper functions for assembling meal components with proper portions
 */

// Helper for portion sizes based on dietary goals
export const getPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean, 
  item: string,
  options: {
    standard: string,
    weightLoss?: string,
    proteinFocus?: string
  }
): string => {
  if (isWeightLoss && options.weightLoss) {
    return options.weightLoss;
  } else if (isProteinFocus && options.proteinFocus) {
    return options.proteinFocus;
  }
  return options.standard;
};

// Helper for composing meals based on regional preferences
export const composeRegionalMeal = (
  regionalDish: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  if (isWeightLoss) {
    return `${regionalDish} (lighter portion for evening)`;
  } else if (isProteinFocus) {
    return `${regionalDish} with extra protein`;
  }
  return regionalDish;
};

// Helper to create a standardized dinner meal with curry, vegetables, and carbs
export const composeDinnerMeal = (
  protein: string,
  veggie1: string,
  veggie2: string,
  curryPortion: string,
  veggiePortion: string,
  rotiCount: string,
  ricePortion: string
): string => {
  return `${protein} curry (${curryPortion}), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), Roti (${rotiCount}), or Bhura Chaval (${ricePortion} Brown Rice)`;
};

// Helper for creating standardized meal items with portion sizes
export const createMealItem = (
  itemName: string,
  portionInfo: string
): string => {
  return `${itemName} (${portionInfo})`;
};

// Helper for Andhra-specific portion recommendations
export const getAndhraDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Andhra breakfast portions
  if (dishName.includes('Pesarattu') || dishName.includes('Dosa')) {
    return isWeightLoss ? "1 medium sized" : (isProteinFocus ? "2 medium sized" : "1-2 medium sized");
  }
  
  if (dishName.includes('Idli')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2-3 medium");
  }
  
  if (dishName.includes('Ragi') || dishName.includes('Millet')) {
    return isWeightLoss ? "1 small cup" : (isProteinFocus ? "1 cup with extra protein" : "1 cup");
  }
  
  if (dishName.includes('Upma') || dishName.includes('Pongal')) {
    return isWeightLoss ? "3/4 cup" : "1 cup";
  }
  
  // Handle Andhra main dish portions
  if (dishName.includes('Pappu') || dishName.includes('Dal')) {
    return isWeightLoss ? "3/4 katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Curry')) {
    return isWeightLoss ? "3/4 katori" : "1 katori";
  }
  
  if (dishName.includes('Vepudu') || dishName.includes('Fry') || dishName.includes('Poriyal')) {
    return isWeightLoss ? "1/2 katori" : "3/4 katori";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
