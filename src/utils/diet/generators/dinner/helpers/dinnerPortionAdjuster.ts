/**
 * Adjust portions specifically for dinner (lighter than lunch)
 */
export const adjustDinnerPortions = (
  dinner: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string => {
  if (isWeightLoss) {
    // Emphasize lighter dinner for weight loss
    dinner = dinner.replace(/rice/gi, 'small bowl of rice');
    dinner = dinner.replace(/roti/gi, '1 roti');
    dinner += ' (light dinner with extra vegetables)';
  } else if (isProteinFocus) {
    // Focus on protein while keeping carbs moderate for dinner
    dinner += ' (protein-rich with moderate carbs)';
  } else if (isMale && !isWeightLoss) {
    // Slightly larger portions for males but still moderate for dinner
    dinner += ' (moderate portions)';
  } else {
    // Standard female portions
    dinner += ' (light and nutritious)';
  }
  
  return dinner;
};
