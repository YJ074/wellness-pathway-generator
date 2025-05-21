
/**
 * Helper for North-East India specific portion recommendations
 */
export const getNorthEastDishPortion = (
  dishName: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Handle North-East breakfast portions
  if (dishName.includes('Rice') || dishName.includes('Porridge')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Pancake') || dishName.includes('Cheela')) {
    return isWeightLoss ? "1-2 small" : (isProteinFocus ? "2 medium" : "2 small");
  }
  
  if (dishName.includes('Stir Fry') || dishName.includes('Poha')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "¾ cup" : "⅔ cup");
  }
  
  if (dishName.includes('Sweet Potato') || dishName.includes('Tapioca')) {
    return isWeightLoss ? "½ cup" : "¾ cup";
  }
  
  // Handle North-East main dish portions
  if (dishName.includes('Curry') || dishName.includes('Stew')) {
    return isWeightLoss ? "¾ katori" : (isProteinFocus ? "1 katori" : "1 katori");
  }
  
  if (dishName.includes('Bamboo') || dishName.includes('Fermented')) {
    return isWeightLoss ? "2 tablespoons" : "3 tablespoons";
  }
  
  if (dishName.includes('Saag') || dishName.includes('Greens')) {
    return isWeightLoss ? "¾ katori" : "1 katori";
  }
  
  if (dishName.includes('Red Rice') || dishName.includes('Sticky Rice')) {
    return isWeightLoss ? "½ cup" : (isProteinFocus ? "⅔ cup" : "⅔ cup");
  }
  
  // Default portion
  return isWeightLoss ? "moderate portion" : (isProteinFocus ? "protein-rich portion" : "standard portion");
};
