
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

export const generateSnacks = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Use prime numbers for varied indices to prevent repetition patterns
  const snackIndex1 = (dayIndex * 31 + 19) % snacks.length;
  const snackIndex2 = (dayIndex * 37 + 23) % snacks.length;
  const fruitIndex = (dayIndex * 41 + 29) % fruits.length;
  
  let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
  
  if (allergies) {
    snackOptions = filterAllergies(snackOptions, allergies);
  }
  
  // Generate two different snacks for variety
  let snack1 = snackOptions[snackIndex1];
  let snack2 = snackOptions[snackIndex2];
  
  // Ensure we're not repeating the same snack
  while (snack1.toLowerCase().includes(snack2.toLowerCase()) || 
         snack2.toLowerCase().includes(snack1.toLowerCase())) {
    snackIndex2 = (snackIndex2 + 1) % snackOptions.length;
    snack2 = snackOptions[snackIndex2];
  }
  
  // Every few days, include a fruit instead of a snack
  if (dayIndex % 5 === 0) {
    const fruit = fruits[fruitIndex];
    const portion = getStandardFruitPortion(fruit);
    
    // Replace one of the snacks with a fruit
    snack1 = `${fruit} ${portion}`;
  }
  
  // Add probiotic or prebiotic foods to enhance nutritional value
  if (dayIndex % 3 === 0) {
    snack2 = enrichWithProbiotics(snack2, dayIndex);
  } else if (dayIndex % 3 === 1) {
    snack2 = enrichWithPrebiotics(snack2, dayIndex);
  }
  
  // Combine snacks and apply deduplication
  let combinedSnack = `${snack1} and ${snack2}`;
  if (isWeightLoss) {
    combinedSnack = `Choose one: ${snack1} or ${snack2}`;
  }
  
  // Apply deduplication
  combinedSnack = removeDuplicateFoodItems(combinedSnack);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(combinedSnack);
  combinedSnack += ` - (${healthBenefit})`;
  
  return combinedSnack;
};
