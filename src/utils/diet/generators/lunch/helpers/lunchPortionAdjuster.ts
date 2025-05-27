
/**
 * Adjust portions based on fitness goals and gender
 */
export const adjustPortionsForGoals = (
  lunch: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string => {
  if (isWeightLoss) {
    // Add weight loss modifications
    lunch = lunch.replace(/rice/gi, 'small portion of brown rice');
    lunch += ' (smaller portions with extra vegetables)';
  } else if (isProteinFocus) {
    // Add protein focus modifications
    lunch += ' (extra dal/protein with less rice)';
  } else if (isMale) {
    // Larger portions for males
    lunch += ' (larger portions)';
  }
  
  return lunch;
};
