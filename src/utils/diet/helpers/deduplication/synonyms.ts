
/**
 * Food synonym definitions and related utilities
 * Provides mapping of common food synonyms in Indian cuisine
 */

// Define food synonyms dictionary for Indian cuisine context
export const FOOD_SYNONYMS: Record<string, string[]> = {
  // Dairy products
  'curd': ['yogurt', 'dahi', 'yoghurt'],
  'yogurt': ['curd', 'dahi', 'yoghurt'],
  'dahi': ['curd', 'yogurt', 'yoghurt'],
  'buttermilk': ['chaas', 'mattha'],
  'chaas': ['buttermilk', 'mattha'],
  
  // Grains
  'rice': ['chawal', 'bhaat'],
  'brown rice': ['bhura chawal'],
  'bread': ['roti', 'chapati', 'paratha'],
  'roti': ['chapati', 'phulka'],
  'chapati': ['roti', 'phulka'],
  
  // Vegetables
  'spinach': ['palak'],
  'fenugreek': ['methi'],
  'eggplant': ['baingan', 'brinjal'],
  'ladyfinger': ['okra', 'bhindi'],
  'okra': ['ladyfinger', 'bhindi'],
  'potato': ['aloo'],
  'cauliflower': ['gobi', 'phool gobi'],
  
  // Legumes
  'lentil': ['dal', 'daal'],
  'dal': ['lentil', 'daal'],
  'chickpeas': ['chana', 'chole'],
  'chana': ['chickpeas', 'chole'],
  
  // Milk and milk products
  'cottage cheese': ['paneer'],
  'paneer': ['cottage cheese'],
  
  // Nuts
  'peanuts': ['moongfali'],
  'almonds': ['badam'],
};

/**
 * Gets a list of known synonyms for a given food
 * @param foodName The name of the food to find synonyms for
 * @returns Array of synonyms for the food
 */
export const getSynonymsForFood = (foodName: string): string[] => {
  // Clean up the food name for matching
  const cleanFoodName = foodName.toLowerCase().trim();
  
  // Direct lookup in the dictionary
  if (FOOD_SYNONYMS[cleanFoodName]) {
    return FOOD_SYNONYMS[cleanFoodName];
  }
  
  // Check if this food is a synonym in the dictionary
  for (const [key, synonyms] of Object.entries(FOOD_SYNONYMS)) {
    if (synonyms.includes(cleanFoodName)) {
      return [key, ...synonyms.filter(s => s !== cleanFoodName)];
    }
  }
  
  // No synonyms found
  return [];
};

/**
 * Checks if a food has a synonym in the seen foods list
 * @param foodName The food to check
 * @param seenFoods Set of already seen foods
 * @returns True if a synonym was found in the seen foods
 */
export const hasSynonymInSeenFoods = (foodName: string, seenFoods: Set<string>): boolean => {
  const cleanFoodName = foodName.toLowerCase().trim();
  
  // Check if the food itself is in seen foods
  if (seenFoods.has(cleanFoodName)) {
    return true;
  }
  
  // Check synonyms
  const synonyms = getSynonymsForFood(cleanFoodName);
  return synonyms.some(synonym => seenFoods.has(synonym.toLowerCase().trim()));
};
