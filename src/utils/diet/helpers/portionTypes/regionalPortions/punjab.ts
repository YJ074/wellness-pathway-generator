
/**
 * Helper for Punjab-specific portion recommendations
 */
export const getPunjabDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Punjabi breakfast portions
  if (dishName.includes('Paratha') || dishName.includes('Roti')) {
    return isWeightLoss ? "1 small" : (isProteinFocus ? "1 medium" : "1 medium");
  }
  
  if (dishName.includes('Cheela') || dishName.includes('Idli')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2 medium");
  }
  
  if (dishName.includes('Dalia') || dishName.includes('Smoothie')) {
    return isWeightLoss ? "¾ cup" : "1 cup";
  }
  
  if (dishName.includes('Chole') || dishName.includes('Toast')) {
    return isWeightLoss ? "½ cup" : "⅔ cup";
  }
  
  // Handle Punjabi main dish portions
  if (dishName.includes('Masala') || dishName.includes('Bharta')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Saag') || dishName.includes('Kadhi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Dal') || dishName.includes('Curry')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Palak') || dishName.includes('Gobhi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
