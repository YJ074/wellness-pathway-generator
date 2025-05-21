
import { addWithoutDuplication } from '../../helpers/deduplication';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';

// Generate breakfast with grains as the base
export const generateBreakfastWithGrains = (
  dayIndex: number, 
  breakfastOptions: any, 
  isWeightLoss: boolean,
  isMale: boolean = false
) => {
  // Use varied indices to prevent repetition patterns
  const grainIndex = (dayIndex * 5 + 3) % breakfastOptions.grains.length;
  const proteinIndex = (dayIndex * 7 + 11) % breakfastOptions.proteins.length;
  const fruitIndex = (dayIndex * 11 + 7) % breakfastOptions.fruits.length;
  
  // Get the components
  const grain = breakfastOptions.grains[grainIndex];
  const protein = breakfastOptions.proteins[proteinIndex];
  const fruit = breakfastOptions.fruits[fruitIndex];
  
  let portions = "";
  
  // Apply portion control based on weight loss goal and gender
  if (isWeightLoss) {
    // Smaller portions for weight loss, but still gender-adjusted
    portions = isMale ? 
      "medium serving of " : 
      "small serving of ";
  } else {
    // Standard portions adjusted by gender
    portions = isMale ? 
      "generous serving of " : 
      "regular serving of ";
  }
  
  // Combine with appropriate portions
  let breakfast = `${portions}${grain}`;
  
  // Add protein component if not already included in main dish
  if (!breakfast.toLowerCase().includes(protein.toLowerCase())) {
    breakfast = addWithoutDuplication(breakfast, ` with ${protein}`);
  }
  
  // For males, add an extra component if not on weight loss plan
  if (isMale && !isWeightLoss) {
    const extraIndex = (dayIndex * 13 + 17) % breakfastOptions.extras.length;
    const extra = breakfastOptions.extras[extraIndex];
    breakfast = addWithoutDuplication(breakfast, `, ${extra}`);
  }
  
  // Always include fruit
  breakfast = addWithoutDuplication(breakfast, `, and ${fruit}`);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};

// Generate healthy protein-focused breakfast
export const generateHealthyBreakfast = (
  dayIndex: number, 
  breakfastOptions: any, 
  isWeightLoss: boolean,
  isMale: boolean = false
) => {
  // Use varied indices to prevent repetition patterns
  const mainIndex = (dayIndex * 13 + 5) % breakfastOptions.mains.length;
  const proteinIndex = (dayIndex * 17 + 7) % breakfastOptions.proteins.length;
  const drinkIndex = (dayIndex * 7 + 3) % breakfastOptions.drinks.length;
  
  // Get the components
  const main = breakfastOptions.mains[mainIndex];
  const protein = breakfastOptions.proteins[proteinIndex];
  const drink = breakfastOptions.drinks[drinkIndex];
  
  // Define portion description based on goal and gender
  let portionDescription = "";
  
  if (isWeightLoss) {
    // Weight loss portions, but adjusted for gender
    portionDescription = isMale ? 
      "moderate portion" : 
      "small portion";
  } else {
    // Standard portions adjusted by gender
    portionDescription = isMale ? 
      "large portion" : 
      "regular portion";
  }
  
  // Combine with appropriate portions and health highlights
  let breakfast = `${main} (${portionDescription})`;
  
  // Add protein component if not already in the main
  if (!breakfast.toLowerCase().includes(protein.toLowerCase())) {
    breakfast = addWithoutDuplication(breakfast, ` with extra ${protein}`);
  }
  
  // For males, add an additional protein source or larger portion if not on weight loss
  if (isMale && !isWeightLoss) {
    const extraProteinIndex = (dayIndex * 19 + 11) % breakfastOptions.proteins.length;
    let extraProtein = breakfastOptions.proteins[extraProteinIndex];
    
    // Make sure it's not the same as the first protein
    if (extraProtein.toLowerCase() === protein.toLowerCase()) {
      extraProtein = breakfastOptions.proteins[(extraProteinIndex + 1) % breakfastOptions.proteins.length];
    }
    
    breakfast = addWithoutDuplication(breakfast, ` and ${extraProtein}`);
  }
  
  // Add drink
  breakfast = addWithoutDuplication(breakfast, `, with ${drink}`);
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(breakfast);
  breakfast += ` - (${healthBenefit})`;
  
  return breakfast;
};
