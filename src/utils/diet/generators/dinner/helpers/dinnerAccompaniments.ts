
/**
 * Add traditional Indian dinner accompaniments based on region
 */
export const addTraditionalDinnerAccompaniments = (dinner: string, region?: string): string => {
  // For dinner, lighter accompaniments are preferred
  if (!dinner.toLowerCase().includes('rice') && !dinner.toLowerCase().includes('roti')) {
    if (region === 'south' || region === 'east') {
      dinner += ' with Small Portion of Rice';
    } else {
      dinner += ' with 1-2 Rotis';
    }
  }
  
  // Add lighter sides for dinner
  if (!dinner.toLowerCase().includes('raita') && !dinner.toLowerCase().includes('salad')) {
    dinner += ' and Cucumber Raita';
  }
  
  return dinner;
};
