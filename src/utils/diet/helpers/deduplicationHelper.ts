
/**
 * Advanced deduplication module for food descriptions
 * Helps prevent duplicate food items in meal descriptions
 */

type DuplicateDetectionOptions = {
  caseSensitive?: boolean;
  checkConnectors?: boolean;
  handlePortionVariations?: boolean;
};

const DEFAULT_OPTIONS: DuplicateDetectionOptions = {
  caseSensitive: false,
  checkConnectors: true,
  handlePortionVariations: true
};

/**
 * Checks if a food item already exists in a meal description
 * Handles variations with different connectors (with, and)
 * @param mealDescription The full meal description
 * @param foodItem The food item to check for
 * @param options Configuration options for duplicate detection
 * @returns True if the food item appears to already be present
 */
export const hasFoodItem = (
  mealDescription: string,
  foodItem: string,
  options: DuplicateDetectionOptions = DEFAULT_OPTIONS
): boolean => {
  const { caseSensitive, checkConnectors, handlePortionVariations } = { ...DEFAULT_OPTIONS, ...options };
  
  // Normalize text based on case sensitivity option
  const processedMeal = caseSensitive ? mealDescription : mealDescription.toLowerCase();
  const processedFood = caseSensitive ? foodItem : foodItem.toLowerCase();
  
  // Simple exact match check
  if (processedMeal.includes(processedFood)) {
    return true;
  }
  
  // Extract just the food name without portions or descriptors
  const foodNameMatch = processedFood.match(/^([a-z\s]+?)(?:\s+\(|\s*$)/i);
  const foodName = foodNameMatch ? foodNameMatch[1].trim() : processedFood;
  
  // Check for food name with different connectors
  if (checkConnectors) {
    // Check for common connector patterns: "with X", "and X", "X and", "X with"
    if (
      processedMeal.includes(`with ${foodName}`) ||
      processedMeal.includes(`and ${foodName}`) ||
      processedMeal.includes(`${foodName} and`) ||
      processedMeal.includes(`${foodName} with`)
    ) {
      return true;
    }
  }
  
  // Check for portion variations if enabled
  if (handlePortionVariations) {
    // Match food with any portion description: "foodName (any portion)"
    const portionPattern = new RegExp(`${foodName}\\s+\\([^)]+\\)`, 'i');
    if (portionPattern.test(processedMeal)) {
      return true;
    }
  }
  
  return false;
};

/**
 * Adds an item to a meal description, ensuring no duplication
 * @param mealDescription The current meal description
 * @param addition The item to add
 * @returns Updated meal description with addition (if not already present)
 */
export const addWithoutDuplication = (
  mealDescription: string,
  addition: string
): string => {
  // Don't add if it's already there
  if (hasFoodItem(mealDescription, addition)) {
    return mealDescription;
  }
  
  // Add with proper formatting
  if (mealDescription.endsWith(',')) {
    return `${mealDescription} ${addition}`;
  } else if (mealDescription.endsWith('.') || mealDescription.endsWith('!')) {
    return `${mealDescription} ${addition}`;
  } else {
    return `${mealDescription}, ${addition}`;
  }
};

/**
 * Normalizes a meal description by removing duplicated food items
 * @param mealDescription The meal description to normalize
 * @returns Cleaned meal description with duplicates removed
 */
export const removeDuplicateFoodItems = (mealDescription: string): string => {
  // Start with basic whitespace normalization
  let normalizedMeal = mealDescription
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s+/g, ', ')
    .replace(/\s+\(/g, ' (')
    .replace(/\)\s+/g, ') ')
    .trim();
    
  // Common food items that frequently get duplicated
  const commonFoods = [
    "Chickoo", "cashews", "chia seeds", "flax seeds", "almonds", 
    "walnuts", "sprouts", "Dandelion Greens", "peanuts", "yogurt", 
    "curd", "dahi", "kombucha", "kefir", "buttermilk", "chaas",
    "sunflower seeds", "pumpkin seeds", "sesame seeds",
    "Banana", "Apple", "Mango", "Orange", "Papaya", "Watermelon",
    "Grapes", "Pomegranate", "Kiwi", "Berries", "Strawberries",
    "Blueberries", "Raspberries", "Blackberries", "Pineapple",
    "Guava", "Litchi", "Jackfruit", "Sapota", "Custard Apple",
    // Include common cereals and other items
    "oats", "poha", "daliya", "upma", "idli", "dosa", "roti", "paratha",
    "millet", "rice", "quinoa", "barley", "corn"
  ];
  
  // Process each food item and remove duplicates
  for (const food of commonFoods) {
    const lowerFood = food.toLowerCase();
    
    // Handle "with X (portion), with X (portion)" pattern
    // This catches the most common duplication pattern
    const withWithPattern = new RegExp(`(with\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(withWithPattern, '$1');
    
    // Handle "and X (portion), and X (portion)" pattern
    const andAndPattern = new RegExp(`(and\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(andAndPattern, '$1');
    
    // Handle mixed connectors: "with X (portion), and X (portion)" pattern
    const withAndPattern = new RegExp(`(with\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*and\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(withAndPattern, '$1');
    
    // Handle "and X (portion), with X (portion)" pattern
    const andWithPattern = new RegExp(`(and\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*with\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(andWithPattern, '$1');
    
    // More aggressive pattern - anything with this food regardless of connector
    const anyPattern = new RegExp(`((?:with|and)\\s+${food}\\s+\\([^)]+\\)[^,]*),\\s*(?:with|and)\\s+${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(anyPattern, '$1');
    
    // Handle standalone duplicates (no connector)
    const standalonePattern = new RegExp(`(${food}\\s+\\([^)]+\\)[^,]*),\\s*${food}\\s+\\([^)]+\\)`, 'gi');
    normalizedMeal = normalizedMeal.replace(standalonePattern, '$1');
  }
  
  // Cleanup formatting after deduplication
  return normalizedMeal
    .replace(/,\s*,/g, ',')            // Fix double commas
    .replace(/,\s+(and|with)/g, ' $1') // Fix comma followed by connector
    .replace(/\s+(and|with)\s+\1\s+/g, ' $1 ') // Fix double connectors
    .replace(/with\s+with/g, 'with')   // Fix repeated "with"
    .replace(/\s+/g, ' ')              // Normalize spaces
    .trim();
};

/**
 * Prepare a meal description for PDF rendering by ensuring no duplicates
 * and proper formatting of all food items
 * @param mealDescription The meal description to clean
 * @returns Fully normalized meal description 
 */
export const normalizeMealForPDF = (mealDescription: string): string => {
  // First remove duplicates
  let normalizedMeal = removeDuplicateFoodItems(mealDescription);
  
  // Additional PDF-specific normalization
  normalizedMeal = normalizedMeal
    .replace(/\(\s+/g, '(')            // Remove space after opening parenthesis
    .replace(/\s+\)/g, ')')            // Remove space before closing parenthesis
    .replace(/\s+,/g, ',')             // Remove space before comma
    .replace(/,(?!\s)/g, ', ')         // Ensure space after comma
    .replace(/\s+\./g, '.')            // Remove space before period
    .replace(/\.\s+\(/g, ' (')         // Fix spacing between period and parenthesis
    .trim();
    
  return normalizedMeal;
};
