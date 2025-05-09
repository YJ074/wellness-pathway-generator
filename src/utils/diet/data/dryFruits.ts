
// Array of dry fruits
export const dryFruitsList = [
  'Almonds (5-6)',
  'Walnuts (2-3 halves)',
  'Cashews (5-6)',
  'Raisins (1 tbsp)',
  'Dried Figs (1-2)',
  'Dried Apricots (2-3)',
  'Mixed Nuts (1 tbsp)',
  'Pistachios (10-12)',
  'Dates (1-2)',
  'Flaxseeds (1 tsp)',
  'Pumpkin Seeds (1 tbsp)',
  'Sunflower Seeds (1 tbsp)',
  'Chia Seeds (1 tsp)',
  'Sesame Seeds (1 tsp)',
  'Melon Seeds (1 tbsp)'
];

// Enhanced function to get dry fruits with portion control
export const getDryFruits = (isWeightLoss: boolean, highProtein: boolean, dayIndex: number): string => {
  // Use modulo to cycle through the list
  const selectedDryFruit = dryFruitsList[dayIndex % dryFruitsList.length];
  
  // If weight loss, include fewer items with precise portion control
  if (isWeightLoss) {
    return `${selectedDryFruit} (limited portion)`;
  }
  
  // For high protein goals, emphasize protein-rich nuts
  if (highProtein) {
    const proteinRichOptions = ['Almonds (8-10)', 'Walnuts (4-5 halves)', 'Pistachios (15-20)', 'Pumpkin Seeds (2 tbsp)'];
    return proteinRichOptions[dayIndex % proteinRichOptions.length];
  }
  
  // For regular plans, include a variety
  return selectedDryFruit;
};
