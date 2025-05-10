
/**
 * Helper functions for grain portions and localization
 */

// Helper to format grain names with local equivalents
export const getLocalizedGrainName = (grain: string): string => {
  if (grain.includes('Rice Flakes') && !grain.includes('(')) {
    return 'Poha (Rice Flakes)';
  } else if (grain.includes('Broken Wheat') && !grain.includes('(')) {
    return 'Daliya (Broken Wheat Porridge)';
  } else if (grain.includes('Millet') && !grain.includes('(')) {
    if (grain.includes('Foxtail')) {
      return 'Kangni Roti (Foxtail Millet Roti)';
    } else if (grain.includes('Pearl')) {
      return 'Bajra Roti (Pearl Millet Roti)';
    } else if (grain.includes('Finger')) {
      return 'Ragi Roti (Finger Millet Roti)';
    } else if (grain.includes('Little')) {
      return 'Kutki Roti (Little Millet Roti)';
    } else if (grain.includes('Barnyard')) {
      return 'Samvat Khichdi (Barnyard Millet Khichdi)';
    } else if (grain.includes('Kodo')) {
      return 'Kodra Roti (Kodo Millet Roti)';
    } else if (grain.includes('Proso')) {
      return 'Barri Upma (Proso Millet Upma)';
    }
  }
  return grain;
};

// Helper to get bread portion size (rotis/chapatis/phulkas use numbers, not containers)
export const getBreadPortionSize = (
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  if (isWeightLoss) {
    return "1";  // 1 roti for weight loss
  } else if (isProteinFocus) {
    return "2";  // 2 rotis for protein focus
  }
  return "2";    // 2 rotis standard
};
