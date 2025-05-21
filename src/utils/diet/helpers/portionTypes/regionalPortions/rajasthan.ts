
/**
 * Helper for Rajasthan-specific portion recommendations
 */
export const getRajasthanDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle Rajasthani breakfast portions
  if (dishName.includes('Khichdi') || dishName.includes('Upma')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Roti') || dishName.includes('Paratha')) {
    return isWeightLoss ? "1 small" : (isProteinFocus ? "1 medium" : "1 medium");
  }
  
  if (dishName.includes('Cheela') || dishName.includes('Dhokla')) {
    return isWeightLoss ? "2 small" : (isProteinFocus ? "3 medium" : "2 medium");
  }
  
  if (dishName.includes('Chaat') || dishName.includes('Poha')) {
    return isWeightLoss ? "½ cup" : "⅔ cup";
  }
  
  // Handle Rajasthani main dish portions
  if (dishName.includes('Sangri') || dishName.includes('Gatte')) {
    return isWeightLoss ? "½ katori" : (isProteinFocus ? "¾ katori" : "¾ katori");
  }
  
  if (dishName.includes('Dal') || dishName.includes('Sabzi')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Bajra') || dishName.includes('Jowar')) {
    return isWeightLoss ? "1 small" : "1 medium";
  }
  
  if (dishName.includes('Curry') || dishName.includes('Masala')) {
    return isWeightLoss ? "½ katori" : "¾ katori";
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
