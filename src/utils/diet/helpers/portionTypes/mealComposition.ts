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

// Helper for Arunachal Pradesh-specific portion recommendations
export const getArunachalDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Arunachal Pradesh breakfast portions
  if (dishName.includes('Khura') || dishName.includes('Pancakes')) {
    return isWeightLoss ? "1-2 small" : (isProteinFocus ? "2-3 medium" : "2 medium");
  }
  
  if (dishName.includes('Porridge') || dishName.includes('Soup')) {
    return isWeightLoss ? "3/4 bowl" : (isProteinFocus ? "1 bowl" : "1 bowl");
  }
  
  if (dishName.includes('Millet') || dishName.includes('Red Rice')) {
    return isWeightLoss ? "1/2 cup" : (isProteinFocus ? "3/4 cup" : "3/4 cup");
  }
  
  if (dishName.includes('Upma') || dishName.includes('Idli')) {
    return isWeightLoss ? "2-3 small" : "3-4 medium";
  }
  
  // Handle Arunachal Pradesh main dish portions
  if (dishName.includes('Thukpa')) {
    return isWeightLoss ? "3/4 bowl" : (isProteinFocus ? "1 bowl with extra protein" : "1 bowl");
  }
  
  if (dishName.includes('Stew') || dishName.includes('Curry')) {
    return isWeightLoss ? "3/4 katori" : "1 katori";
  }
  
  if (dishName.includes('Stir Fry') || dishName.includes('Stir-fry')) {
    return isWeightLoss ? "1/2 katori" : "3/4 katori";
  }
  
  if (dishName.includes('Bamboo Shoot')) {
    return isWeightLoss ? "1/3 cup" : "1/2 cup";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Chhattisgarh-specific portion recommendations
export const getChattisgarhDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Chhattisgarh breakfast portions
  if (dishName.includes('Faraa') || dishName.includes('Dumplings')) {
    return isWeightLoss ? "2-3 small" : (isProteinFocus ? "4-5 medium" : "3-4 medium");
  }
  
  if (dishName.includes('Porridge') || dishName.includes('Ragi')) {
    return isWeightLoss ? "3/4 cup" : (isProteinFocus ? "1 cup with added protein" : "1 cup");
  }
  
  if (dishName.includes('Pancake') || dishName.includes('Cheela')) {
    return isWeightLoss ? "1-2 small" : (isProteinFocus ? "2-3 medium" : "2 medium");
  }
  
  if (dishName.includes('Idli')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2-3 medium");
  }
  
  if (dishName.includes('Poha') || dishName.includes('Rice')) {
    return isWeightLoss ? "1/2 cup" : (isProteinFocus ? "3/4 cup" : "2/3 cup");
  }
  
  // Handle Chhattisgarh main dish portions
  if (dishName.includes('Khichdi')) {
    return isWeightLoss ? "3/4 cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Curry') || dishName.includes('Saag')) {
    return isWeightLoss ? "3/4 katori" : "1 katori";
  }
  
  if (dishName.includes('Stew')) {
    return isWeightLoss ? "3/4 bowl" : "1 bowl";
  }
  
  if (dishName.includes('Kofta')) {
    return isWeightLoss ? "3-4 small pieces" : "4-5 medium pieces";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Assam-specific portion recommendations
export const getAssamDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Assam breakfast portions
  if (dishName.includes('Pitha') || dishName.includes('Rice Cakes')) {
    return isWeightLoss ? "2 small pieces" : (isProteinFocus ? "3 medium pieces" : "2-3 medium pieces");
  }
  
  if (dishName.includes('Rice Poha') || dishName.includes('Flattened Rice')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Porridge') || dishName.includes('Black Rice')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Dosa') || dishName.includes('Chilla')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  // Handle Assam main dish portions
  if (dishName.includes('Tenga') || dishName.includes('Curry')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Khar')) {
    return isWeightLoss ? "½ katori" : "¾ katori";
  }
  
  if (dishName.includes('Fish')) {
    return isWeightLoss ? "1 medium piece" : (isProteinFocus ? "2 medium pieces" : "1-2 medium pieces");
  }
  
  if (dishName.includes('Saag') || dishName.includes('Leafy')) {
    return isWeightLoss ? "1 katori" : "1 katori"; // Leafy greens portions remain consistent
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Bihar-specific portion recommendations
export const getBiharDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Bihar breakfast portions
  if (dishName.includes('Paratha') || dishName.includes('Litti')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Daliya') || dishName.includes('Porridge')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Cheela') || dishName.includes('Toast')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Idli')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2-3 medium");
  }
  
  if (dishName.includes('Smoothie')) {
    return isWeightLoss ? "1 small glass" : "1 medium glass";
  }
  
  // Handle Bihar main dish portions
  if (dishName.includes('Dal') || dishName.includes('Kadhi')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Saag') || dishName.includes('Bharta')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Curry') || dishName.includes('Masala')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Chokha')) {
    return isWeightLoss ? "½ katori" : "¾ katori";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Goa-specific portion recommendations
export const getGoaDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Goa breakfast portions
  if (dishName.includes('Bhakri') || dishName.includes('Roti')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Sanna') || dishName.includes('Rice Cakes')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2-3 medium");
  }
  
  if (dishName.includes('Dosa') || dishName.includes('Pancakes')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "1-2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Upma') || dishName.includes('Porridge')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Poha')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  // Handle Goa main dish portions
  if (dishName.includes('Curry') || dishName.includes('Caldeen')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Bhaji') || dishName.includes('Leaves')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Fish') || dishName.includes('Clams')) {
    return isWeightLoss ? "1 medium piece" : (isProteinFocus ? "2 medium pieces" : "1-2 medium pieces");
  }
  
  if (dishName.includes('Dal')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Gujarat-specific portion recommendations
export const getGujaratDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Gujarat breakfast portions
  if (dishName.includes('Handvo') || dishName.includes('Cake')) {
    return isWeightLoss ? "1 small piece" : (isProteinFocus ? "1 medium piece" : "1 medium piece");
  }
  
  if (dishName.includes('Thepla') || dishName.includes('Flatbread')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Dhokla') || dishName.includes('Khaman')) {
    return isWeightLoss ? "2 small pieces" : (isProteinFocus ? "3 medium pieces" : "2-3 medium pieces");
  }
  
  if (dishName.includes('Khichu') || dishName.includes('Upma')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Muthiya') || dishName.includes('Dumplings')) {
    return isWeightLoss ? "2-3 small pieces" : (isProteinFocus ? "4 medium pieces" : "3-4 medium pieces");
  }
  
  // Handle Gujarat main dish portions
  if (dishName.includes('Rotla') || dishName.includes('Roti')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Sabzi') || dishName.includes('Shaak')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Dal')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Khichdi')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};

// Helper for Haryana-specific portion recommendations
export const getHaryanaDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Haryana breakfast portions
  if (dishName.includes('Roti') || dishName.includes('Paratha')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Khichdi') || dishName.includes('Daliya')) {
    return isWeightLoss ? "¾ cup" : (isProteinFocus ? "1 cup" : "1 cup");
  }
  
  if (dishName.includes('Cheela') || dishName.includes('Chilla')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "2 medium" : "1-2 medium");
  }
  
  if (dishName.includes('Flattened Rice') || dishName.includes('Poha')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  // Handle Haryana main dish portions
  if (dishName.includes('Masala') || dishName.includes('Curry')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Bharta') || dishName.includes('Subzi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Dal')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Kadhi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
