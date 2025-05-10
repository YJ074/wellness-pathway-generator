
export const getDryFruits = (isWeightLoss: boolean, fromProteinFoods = false, dayIndex = 0): string => {
  const dryFruitOptions = [
    'mixed dry fruits (5-6 nos)',
    'badaam (5 nos)',
    'kaju (5 nos)',
    'akhrot (2 nos)',
    'kismis (1 chamach)',
    'chironji (1 chamach)',
    'til seeds (1 chamach)',
    'flax seeds (1 chamach)',
    'chia seeds (1 chamach)',
    'sunflower seeds (1 chamach)'
  ];
  
  // For protein focus meals, use the higher-protein options
  if (fromProteinFoods) {
    const proteinDryFruits = [
      'badaam (5 nos)',
      'akhrot (2 nos)',
      'pumpkin seeds (1 chamach)',
      'til seeds (1 chamach)',
      'flax seeds (1 chamach)'
    ];
    return proteinDryFruits[dayIndex % proteinDryFruits.length];
  }
  
  // If weight loss is a goal, use smaller portions or restrict to certain types
  if (isWeightLoss) {
    const lightDryFruits = [
      'badaam (4 nos)',
      'kismis (1 chamach)',
      'akhrot (1 nos)',
      'til seeds (½ chamach)',
      'pumpkin seeds (½ chamach)',
      'flax seeds (½ chamach)',
      'chia seeds (½ chamach)',
      'sunflower seeds (½ chamach)'
    ];
    return lightDryFruits[dayIndex % lightDryFruits.length];
  }
  
  return dryFruitOptions[dayIndex % dryFruitOptions.length];
};
