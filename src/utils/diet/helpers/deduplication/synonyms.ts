
/**
 * Food synonym management
 * Provides functionality to track food synonyms
 * and prevent repetition of similar foods
 */

// Dictionary of known synonyms for specific food items
export const FOOD_SYNONYMS: Record<string, string[]> = {
  // Dairy products
  'dahi': ['curd', 'yogurt', 'yoghurt', 'raita'],
  'curd': ['dahi', 'yogurt', 'yoghurt', 'raita'],
  'yogurt': ['dahi', 'curd', 'yoghurt', 'raita'],
  'paneer': ['cottage cheese', 'queso fresco'],
  'buttermilk': ['chaas', 'mattha', 'lassi'],
  'chaas': ['buttermilk', 'mattha', 'lassi'],
  
  // Legumes
  'rajma': ['kidney beans', 'red beans'],
  'kidney beans': ['rajma', 'red beans'],
  'chana': ['chickpeas', 'garbanzo beans', 'chole'],
  'chickpeas': ['chana', 'garbanzo beans', 'chole'],
  'moong': ['mung', 'green gram', 'mung beans', 'moong sprouts'],
  'mung': ['moong', 'green gram', 'mung beans', 'moong sprouts'],
  'sprouts': ['moong sprouts', 'matki sprouts', 'sprouted', 'bean sprouts'],
  
  // Grains
  'brown rice': ['bhura chaval', 'whole grain rice'],
  'rotis': ['roti', 'chapati', 'chapatis', 'phulka'],
  'roti': ['rotis', 'chapati', 'chapatis', 'phulka'],
  'chapati': ['roti', 'chapatis', 'rotis', 'phulka'],
  'poha': ['flattened rice', 'beaten rice', 'rice flakes'],
  'oats': ['oatmeal', 'rolled oats', 'instant oats', 'steel cut oats'],
  
  // Fruits
  'kela': ['banana', 'plantain'],
  'banana': ['kela', 'plantain'],
  'seb': ['apple'],
  'apple': ['seb'],
  'santra': ['orange', 'mosambi', 'sweet lime'],
  'orange': ['santra', 'mosambi', 'sweet lime'],
  'papaya': ['papita'],
  'chickoo': ['sapota', 'sapodilla', 'chiku'],
  
  // Vegetables
  'palak': ['spinach'],
  'spinach': ['palak'],
  'gobi': ['cauliflower'],
  'cauliflower': ['gobi'],
  'tamatar': ['tomato', 'tomatoes'],
  'tomato': ['tamatar', 'tomatoes'],
  'aloo': ['potato', 'potatoes'],
  'potato': ['aloo', 'potatoes'],
  'bhindi': ['okra', 'lady finger', 'ladies finger'],
  'karela': ['bitter gourd', 'bitter melon'],
  
  // Seeds and Nuts
  'chia seeds': ['chia', 'sabja', 'tukmaria'],
  'flax seeds': ['flaxseed', 'alsi'],
  'almond': ['badam', 'almonds'],
  'peanuts': ['moongfali', 'groundnuts', 'peanut'],
  'peanut butter': ['moongfali butter', 'groundnut butter'],
  'walnut': ['akhrot', 'walnuts'],
  
  // Proteins
  'egg whites': ['egg white', 'whites of egg'],
  'egg': ['anda', 'eggs'],
  'chicken': ['murgh', 'chicken breast', 'chicken thigh'],
  'mutton': ['lamb', 'goat meat'],
  'fish': ['machli', 'seafood', 'salmon', 'tuna'],
  
  // Multiple tpes of sabzi (vegetable dish)
  'cabbage sabzi': ['patta gobi sabzi', 'cabbage curry', 'patta gobi'],
  'bhindi sabzi': ['okra sabzi', 'bhindi fry', 'okra curry'],
  'lauki sabzi': ['bottle gourd sabzi', 'doodhi sabzi', 'ghiya sabzi'],
  'vegetable curry': ['mixed vegetables', 'vegetable sabzi', 'sabzi', 'veg curry'],
  'mixed vegetables': ['vegetable curry', 'vegetable sabzi', 'sabzi', 'veg curry'],
  
  // Multiple ways to say curry
  'curry': ['sabzi', 'gravy', 'preparation'],
  'sabzi': ['curry', 'vegetable dish', 'bhaji'],
  
  // Multiple types of dal (lentil dish)
  'moong dal': ['yellow lentils', 'green gram dal'],
  'masoor dal': ['red lentils', 'masoor'],
  'toor dal': ['arhar dal', 'pigeon pea dal', 'split pigeon peas'],
  'urad dal': ['black gram dal', 'black lentils', 'maa ki dal'],
  'dal': ['lentils', 'pulses', 'legumes'],
  'lentils': ['dal', 'pulses', 'legumes'],
};

/**
 * Gets all known synonyms for a particular food
 * @param foodName Base food name
 * @returns Array of synonyms
 */
export const getSynonymsForFood = (foodName: string): string[] => {
  const normalizedName = foodName.toLowerCase().trim();
  return FOOD_SYNONYMS[normalizedName] || [];
};

/**
 * Checks if any synonyms of a food item exist in a set of seen foods
 * @param foodName The food item to check
 * @param seenFoods Set of food items already seen
 * @returns True if a synonym was found in the seen foods set
 */
export const hasSynonymInSeenFoods = (foodName: string, seenFoods: Set<string>): boolean => {
  const normalizedName = foodName.toLowerCase().trim();
  
  // First check if this exact food is in the set
  if (seenFoods.has(normalizedName)) {
    return true;
  }
  
  // Get all synonyms and check each one
  const synonyms = getSynonymsForFood(normalizedName);
  for (const synonym of synonyms) {
    if (seenFoods.has(synonym)) {
      return true;
    }
  }
  
  // Also handle checking known compound foods
  // For example, check if "moong" is present when "moong dal" is checked
  for (const seenFood of seenFoods) {
    // Check if the seen food is part of this food name
    if (normalizedName.includes(seenFood) && seenFood.length > 3) {
      return true;
    }
    
    // Check if this food is part of a seen food name
    if (seenFood.includes(normalizedName) && normalizedName.length > 3) {
      return true;
    }
  }
  
  return false;
};
