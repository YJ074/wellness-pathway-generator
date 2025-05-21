
/**
 * Helper for Madhya Pradesh-specific portion recommendations
 */
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
