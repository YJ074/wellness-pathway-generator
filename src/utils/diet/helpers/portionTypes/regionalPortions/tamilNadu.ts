
/**
 * Helper for Tamil Nadu-specific portion recommendations
 */
export const getTamilNaduDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Tamil Nadu breakfast portions
  if (dishName.includes('Dosa') || dishName.includes('Idli')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2 medium");
  }
  
  if (dishName.includes('Pongal') || dishName.includes('Upma')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Porridge') || dishName.includes('Koozh')) {
    return isWeightLoss ? "¾ cup" : "1 cup";
  }
  
  if (dishName.includes('Uthappam') || dishName.includes('Adai')) {
    return isWeightLoss ? "1 medium" : (isProteinFocus ? "1 large" : "1 medium");
  }
  
  // Handle Tamil Nadu main dish portions
  if (dishName.includes('Kootu') || dishName.includes('Sambar')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Poriyal') || dishName.includes('Curry')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Avial') || dishName.includes('Kuzhambu')) {
    return isWeightLoss ? "½ katori" : "¾ katori";
  }
  
  if (dishName.includes('Rice') || dishName.includes('Millets')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
