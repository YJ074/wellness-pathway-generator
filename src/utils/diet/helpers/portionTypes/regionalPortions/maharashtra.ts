
/**
 * Helper for Maharashtra-specific portion recommendations
 */
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
