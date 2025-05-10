
/**
 * Helper functions for fruit portion standardization
 */

// Helper function to determine if a fruit is a "big fruit" that should be measured in bowls
export const isBigFruit = (fruitName: string): boolean => {
  const bigFruits = [
    'watermelon', 'muskmelon', 'pineapple', 'papaya', 'jackfruit',
    'cantaloupe', 'honeydew', 'tarbuja', 'kharbooja', 'papita', 'kathal'
  ];
  
  return bigFruits.some(fruit => 
    fruitName.toLowerCase().includes(fruit.toLowerCase())
  );
};

// Helper function to determine if a fruit should be measured in katoris (small numerous fruits)
export const isKatoriFruit = (fruitName: string): boolean => {
  const katoriFruits = [
    'lychee', 'grapes', 'berries', 'strawberry', 'strawberries', 'blueberry', 
    'blueberries', 'raspberry', 'raspberries', 'blackberry', 'blackberries', 
    'mulberry', 'mulberries', 'jamun', 'cherries', 'cherry'
  ];
  
  return katoriFruits.some(fruit => 
    fruitName.toLowerCase().includes(fruit.toLowerCase())
  );
};

// Helper to standardize fruit portion display
export const getStandardFruitPortion = (fruitName: string): string => {
  if (isBigFruit(fruitName)) {
    return "(1 bowl)";
  } else if (isKatoriFruit(fruitName)) {
    return "(1 katori)";
  }
  return "(1 nos)";
};
