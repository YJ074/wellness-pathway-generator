
/**
 * Add traditional Indian accompaniments based on region
 */
export const addTraditionalAccompaniments = (lunch: string, region?: string): string => {
  // Add traditional sides if not already present
  if (!lunch.toLowerCase().includes('rice') && !lunch.toLowerCase().includes('roti')) {
    if (region === 'south' || region === 'east') {
      lunch += ' with Steamed Rice';
    } else {
      lunch += ' with Roti';
    }
  }
  
  if (!lunch.toLowerCase().includes('pickle') && !lunch.toLowerCase().includes('papad')) {
    lunch += ', Pickle, and Papad';
  }
  
  if (region === 'south' && !lunch.toLowerCase().includes('sambar')) {
    lunch += ' with Sambar';
  }
  
  if (region === 'west' && !lunch.toLowerCase().includes('kadhi')) {
    lunch += ' with Gujarati Kadhi';
  }
  
  return lunch;
};
