
/**
 * Food synonym definitions and related helper functions
 * Helps identify duplicates with different names
 */

// Common food synonyms to help identify duplicates with different names
export const FOOD_SYNONYMS: Record<string, string[]> = {
  'curd': ['yogurt', 'dahi', 'yoghurt'],
  'yogurt': ['curd', 'dahi', 'yoghurt'],
  'dahi': ['curd', 'yogurt', 'yoghurt'],
  'buttermilk': ['chaas', 'mattha'],
  'chaas': ['buttermilk', 'mattha'],
  'rice flakes': ['poha', 'beaten rice'],
  'poha': ['rice flakes', 'beaten rice'],
  'semolina': ['suji', 'rava', 'rawa'],
  'suji': ['semolina', 'rava', 'rawa'],
  'rava': ['semolina', 'suji', 'rawa'],
  'rawa': ['semolina', 'suji', 'rava'],
  'broken wheat': ['daliya', 'dalia', 'bulgur'],
  'daliya': ['broken wheat', 'dalia', 'bulgur'],
  'dalia': ['broken wheat', 'daliya', 'bulgur'],
  'cottage cheese': ['paneer'],
  'paneer': ['cottage cheese'],
  'chickpeas': ['chana', 'garbanzo beans'],
  'chana': ['chickpeas', 'garbanzo beans'],
  'egg': ['anda', 'eggs'],
  'anda': ['egg', 'eggs'],
  'chapati': ['roti', 'phulka'],
  'roti': ['chapati', 'phulka'],
  'flat bread': ['chapati', 'roti', 'phulka'],
};

/**
 * Gets all synonyms for a given food item
 * @param foodName The food name to look up synonyms for
 * @returns Array of synonyms for the food
 */
export const getSynonymsForFood = (foodName: string): string[] => {
  const synonyms: string[] = [];
  const lowerFoodName = foodName.toLowerCase();
  
  // Check if this food name has direct synonyms
  Object.entries(FOOD_SYNONYMS).forEach(([key, values]) => {
    // If food contains this key, add all its synonyms
    if (lowerFoodName.includes(key.toLowerCase())) {
      synonyms.push(...values);
    }
    
    // If food contains any of the values, add the key
    if (values.some(value => lowerFoodName.includes(value.toLowerCase()))) {
      synonyms.push(key);
    }
  });
  
  return synonyms;
};

/**
 * Check if a food name has a synonym match in the seen foods set
 * @param foodName The food name to check
 * @param seenFoods Set of previously seen foods
 * @returns True if a synonym match is found
 */
export const hasSynonymInSeenFoods = (foodName: string, seenFoods: Set<string>): boolean => {
  const lowerFoodName = foodName.toLowerCase();
  const seenFoodsArray = Array.from(seenFoods);
  
  // Check all synonym pairs
  for (const [key, values] of Object.entries(FOOD_SYNONYMS)) {
    // If our food contains this key and any seen food contains this key or its values
    if (lowerFoodName.includes(key.toLowerCase()) && 
        seenFoodsArray.some(seen => seen.includes(key.toLowerCase()) || 
                                  values.some(v => seen.includes(v.toLowerCase())))) {
      return true;
    }
    
    // If our food contains any of the values and any seen food contains the key or values
    if (values.some(value => lowerFoodName.includes(value.toLowerCase())) &&
        seenFoodsArray.some(seen => seen.includes(key.toLowerCase()) || 
                                  values.some(v => seen.includes(v.toLowerCase())))) {
      return true;
    }
  }
  
  return false;
};
