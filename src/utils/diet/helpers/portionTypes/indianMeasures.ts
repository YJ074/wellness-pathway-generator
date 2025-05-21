
/**
 * Helper functions for Indian household measurements
 */

// Mapping of Western measurements to Indian equivalents
type MeasurementMapping = {
  [key: string]: {
    indian: string;
    description?: string;
  }
};

// Standard Indian measurement conversions
const standardMeasurements: MeasurementMapping = {
  'cup': { 
    indian: 'katori', 
    description: 'standard katori (~150-200 ml)'
  },
  '1/2 cup': { 
    indian: '½ katori', 
    description: 'half katori (~75-100 ml)' 
  },
  '1/4 cup': { 
    indian: '¼ katori', 
    description: 'quarter katori (~40-50 ml)' 
  },
  '3/4 cup': { 
    indian: '¾ katori', 
    description: 'three-quarter katori (~110-150 ml)' 
  },
  'tablespoon': { 
    indian: 'bada chamach', 
    description: 'tablespoon (~15 ml)' 
  },
  'teaspoon': { 
    indian: 'chota chamach', 
    description: 'teaspoon (~5 ml)' 
  },
  'ounce': { 
    indian: '30 grams', 
    description: 'approximately 2 tablespoons' 
  },
  'fluid ounce': { 
    indian: '30 ml', 
    description: 'approximately 2 tablespoons' 
  },
  'slice': { 
    indian: 'tukda', 
    description: 'one slice/piece' 
  },
  'handful': { 
    indian: 'mutthi', 
    description: 'one handful' 
  },
  'pinch': { 
    indian: 'chutki', 
    description: 'a pinch' 
  }
};

// Food-specific Indian measurements
const foodSpecificMeasurements: MeasurementMapping = {
  'roti': { 
    indian: 'roti', 
    description: 'palm-sized (~6 inches diameter)' 
  },
  'chapati': { 
    indian: 'chapati', 
    description: 'palm-sized (~6 inches diameter)' 
  },
  'dal': { 
    indian: 'katori', 
    description: 'standard katori dal (~150-200 ml)' 
  },
  'sabzi': { 
    indian: 'katori', 
    description: 'standard katori sabzi (~150-200 ml)' 
  },
  'rice': { 
    indian: 'katori', 
    description: 'standard katori rice (~150-200 ml cooked rice)' 
  },
  'curd': { 
    indian: 'katori', 
    description: 'standard katori dahi (~150-200 ml)' 
  },
  'dahi': { 
    indian: 'katori', 
    description: 'standard katori dahi (~150-200 ml)' 
  },
  'yogurt': { 
    indian: 'katori', 
    description: 'standard katori dahi (~150-200 ml)' 
  },
  'buttermilk': { 
    indian: 'glass', 
    description: 'standard glass chaas (~200 ml)' 
  },
  'chaas': { 
    indian: 'glass', 
    description: 'standard glass chaas (~200 ml)' 
  },
  'milk': { 
    indian: 'glass', 
    description: 'standard glass milk (~200 ml)' 
  },
  'nuts': { 
    indian: 'mutthi', 
    description: 'small handful (~15-20g)' 
  },
  'ghee': { 
    indian: 'chammach', 
    description: 'teaspoon (~5 ml)' 
  },
  'oil': { 
    indian: 'chammach', 
    description: 'teaspoon (~5 ml)' 
  }
};

/**
 * Convert Western measurements to Indian household measurements
 * @param measurement - Western measurement to convert
 * @param foodType - Type of food for context-specific conversion
 * @returns Indian equivalent measurement with description
 */
export const getIndianMeasure = (
  measurement: string, 
  foodType?: string
): string => {
  // Check if the measurement contains any Western units we need to convert
  let result = measurement;

  // Try to match the entire measurement string first
  if (standardMeasurements[measurement.toLowerCase()]) {
    return standardMeasurements[measurement.toLowerCase()].indian;
  }

  // If food type is specified and has a specific measurement
  if (foodType && foodSpecificMeasurements[foodType.toLowerCase()]) {
    return foodSpecificMeasurements[foodType.toLowerCase()].indian;
  }

  // Look for Western measurements within the string and replace them
  Object.keys(standardMeasurements).forEach(westMeasure => {
    if (measurement.toLowerCase().includes(westMeasure)) {
      const indianMeasure = standardMeasurements[westMeasure].indian;
      const desc = standardMeasurements[westMeasure].description;
      result = result.replace(
        new RegExp(westMeasure, 'gi'), 
        indianMeasure + (desc ? ` (${desc})` : '')
      );
    }
  });

  return result;
};

/**
 * Get size description for common Indian foods
 * @param foodType - Type of food
 * @returns Size description in Indian context
 */
export const getIndianSizeDescription = (foodType: string): string => {
  const sizeDescriptions: Record<string, string> = {
    'roti': 'palm-sized (~6 inches diameter)',
    'chapati': 'palm-sized (~6 inches diameter)',
    'katori': 'standard katori (~150-200 ml)',
    'bowl': 'medium-sized bowl (~200-250 ml)',
    'glass': 'standard glass (~200 ml)',
    'mutthi': 'handful (~20-30g for nuts/seeds)',
    'chammach': 'spoon'
  };

  return sizeDescriptions[foodType.toLowerCase()] || '';
};

/**
 * Add Indian measurement descriptions to a meal text
 * @param mealText - Original meal description
 * @returns Meal text with Indian measurement descriptions
 */
export const addIndianMeasureDescriptions = (mealText: string): string => {
  let result = mealText;
  
  // Add descriptions to rotis if not already present
  if (result.includes('roti') && !result.includes('palm-sized')) {
    result = result.replace(/(\d+)\s*rotis/gi, '$1 rotis (palm-sized)');
  }
  
  // Add descriptions to katori if not already present
  if (result.includes('katori') && !result.includes('ml')) {
    result = result.replace(/(\d+\s*\/?\d*)\s*katori/gi, '$1 katori (~150-200 ml)');
  }
  
  return result;
};
