
/**
 * Helper functions for grain portion handling and customization
 */

// Helper to format grain names with local equivalents
export const getLocalizedGrainName = (grain: string): string => {
  if (grain === 'Rice' && !grain.includes('(')) {
    return 'Rice (Chawal)';
  } else if (grain === 'Wheat' && !grain.includes('(')) {
    return 'Whole Wheat (Gehun)';
  } else if (grain === 'Millet' && !grain.includes('(')) {
    return 'Millet (Bajra/Jowar/Ragi)';
  } else if (grain === 'Oats' && !grain.includes('(')) {
    return 'Oats (Jai)';
  } else if (grain === 'Barley' && !grain.includes('(')) {
    return 'Barley (Jau)';
  } else if (grain === 'Amaranth' && !grain.includes('(')) {
    return 'Amaranth (Rajgira)';
  } else if (grain === 'Quinoa' && !grain.includes('(')) {
    return 'Quinoa (Kinwa)';
  } else if (grain === 'Buckwheat' && !grain.includes('(')) {
    return 'Buckwheat (Kuttu)';
  }
  return grain;
};

// Helper for bread portion size based on dietary goals
export const getBreadPortionSize = (
  isWeightLoss: boolean, 
  isProteinFocus: boolean,
  isMale: boolean = false // Added parameter for gender-specific portions
): number => {
  // Base rotis for males and females
  const maleBase = 3;
  const femaleBase = 2;
  
  // Determine base count based on gender
  const baseCount = isMale ? maleBase : femaleBase;
  
  if (isWeightLoss) {
    return baseCount - 1; // Reduce by one for weight loss
  } else if (isProteinFocus) {
    return baseCount; // Standard count for protein focus
  } else {
    return baseCount; // Standard count for maintenance
  }
};
