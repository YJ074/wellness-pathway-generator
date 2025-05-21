
/**
 * Helper for Kerala-specific portion recommendations
 */
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
