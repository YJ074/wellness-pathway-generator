
import { filterAllergies } from '../../helpers/allergyHelpers';
import { getStandardFruitPortion } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
// Update to use the new modular deduplication system
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

/**
 * Generates mid-morning snack options for the diet plan
 */
export const generateMidMorningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string,
  gender?: string
) => {
  // Check if this is a male who is not on weight loss plan
  // If so, provide more substantial snacks
  const needsLargerSnack = gender === 'male' && !isWeightLoss;
  
  // Use prime numbers for varied indices to prevent repetition patterns
  const snackIndex1 = (dayIndex * 7 + 3) % snacks.length;
  let snackIndex2 = (dayIndex * 13 + 5) % snacks.length;
  const fruitIndex = (dayIndex * 11 + 7) % fruits.length;
  
  // Ensure the two snack indices are different
  if (snackIndex1 === snackIndex2) {
    snackIndex2 = (snackIndex2 + 1) % snacks.length;
  }
  
  let snackOptions = snacks.slice(); // Create a copy to avoid mutating the original
  
  if (allergies) {
    snackOptions = filterAllergies(snackOptions, allergies);
  }
  
  // Get the snack items
  const snack1 = snackOptions[snackIndex1] || "Mixed nuts (small handful)";
  let snack2 = snackOptions[snackIndex2] || "Roasted chana";
  
  // Get a fruit option
  const fruit = fruits[fruitIndex] || "Apple";
  const fruitPortion = getStandardFruitPortion(fruit);
  
  // Combine into a cohesive snack recommendation
  let combinedSnack = "";
  
  if (isWeightLoss) {
    // For weight loss, recommend fewer options
    combinedSnack = `Choose one: ${snack1} or ${fruit} ${fruitPortion}`;
  } else if (needsLargerSnack) {
    // For males not on weight loss, offer more substantial options
    combinedSnack = `${snack1} AND ${fruit} ${fruitPortion}`;
    
    // Add extra protein for males on muscle gain
    if (snack1.toLowerCase().includes('protein') || snack1.toLowerCase().includes('nuts')) {
      combinedSnack += ` (larger portion)`;
    }
  } else {
    // For maintenance/standard female portion
    combinedSnack = `Choose one: ${snack1}, ${snack2}, or ${fruit} ${fruitPortion}`;
  }
  
  // Add prebiotic benefits occasionally
  if (dayIndex % 4 === 0) {
    combinedSnack = enrichWithPrebiotics(combinedSnack, dayIndex);
  }
  
  // Apply deduplication to the snack
  combinedSnack = removeDuplicateFoodItems(combinedSnack);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(combinedSnack);
  combinedSnack += ` - (${healthBenefit})`;
  
  return combinedSnack;
};
