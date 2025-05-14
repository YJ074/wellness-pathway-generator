
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

/**
 * Generates general snack options for the diet plan
 */
export const generateSnacks = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Use prime numbers for varied indices to prevent repetition patterns
  // Each day's snack should be different from all other meal components
  const snackIndex1 = (dayIndex * 13 + 11) % snacks.length;
  let snackIndex2 = (dayIndex * 19 + 7) % snacks.length;
  const fruitIndex = (dayIndex * 17 + 5) % fruits.length;
  
  // Ensure the two snack indices are different
  if (snackIndex1 === snackIndex2) {
    snackIndex2 = (snackIndex2 + 1) % snacks.length;
  }
  
  let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
  
  if (allergies) {
    snackOptions = filterAllergies(snackOptions, allergies);
  }
  
  // Get the two snacks for the day
  const snack1 = snackOptions[snackIndex1] || "Mixed nuts (small handful)";
  let snack2 = snackOptions[snackIndex2] || "Greek yogurt with berries";
  
  // Get a fruit option
  const fruit = fruits[fruitIndex] || "Apple";
  const fruitPortion = getStandardFruitPortion(fruit);
  
  // Combine into a cohesive snack recommendation
  let combinedSnack = "";
  
  if (isWeightLoss) {
    // For weight loss, recommend either one snack or a fruit option
    combinedSnack = `Choose one: ${snack1} or ${fruit} ${fruitPortion}`;
  } else {
    // For maintenance/muscle gain, offer more options
    combinedSnack = `Choose one: ${snack1}, ${snack2}, or ${fruit} ${fruitPortion}`;
  }
  
  // Add prebiotic/probiotic benefits occasionally
  if (dayIndex % 3 === 0) {
    combinedSnack = enrichWithPrebiotics(combinedSnack, dayIndex);
  } else if (dayIndex % 3 === 1) {
    combinedSnack = enrichWithProbiotics(combinedSnack, dayIndex);
  }
  
  // Apply deduplication to the snack
  combinedSnack = removeDuplicateFoodItems(combinedSnack);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(combinedSnack);
  combinedSnack += ` - (${healthBenefit})`;
  
  return combinedSnack;
};
