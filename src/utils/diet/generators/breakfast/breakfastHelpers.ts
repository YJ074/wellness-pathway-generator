
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';

// Interface for breakfast options structure
interface BreakfastOptions {
  grains: string[];
  indian: string[];
  protein: string[];
}

/**
 * Generate a grain-based breakfast dish
 */
export const generateBreakfastWithGrains = (
  dayIndex: number,
  options: BreakfastOptions,
  isWeightLoss: boolean,
  isMale: boolean = false
): string => {
  // Ensure options and its properties exist
  if (!options || !options.grains || !options.grains.length) {
    return "Vegetable poha with sprouts (1 bowl)";
  }

  // Select grains and complementary items using prime-based indices for variety
  const grainIndex = (dayIndex * 7 + 5) % options.grains.length;
  const grain = options.grains[grainIndex];
  
  // Add Indian twist occasionally
  const useIndianStyle = (dayIndex % 3 === 0) && options.indian && options.indian.length > 0;
  let indianStyle = "";
  
  if (useIndianStyle) {
    const indianIndex = (dayIndex * 5 + 3) % options.indian.length;
    indianStyle = options.indian[indianIndex];
  }
  
  // Determine portion size based on weight loss goal and gender
  const portionSize = isWeightLoss 
    ? (isMale ? "1 medium bowl" : "¾ bowl") 
    : (isMale ? "1 large bowl" : "1 medium bowl");
  
  // Format breakfast description
  let breakfast = useIndianStyle 
    ? `${indianStyle} (${portionSize})` 
    : `${grain} (${portionSize})`;
    
  // Add fruit side for better nutrition
  const fruits = ["sliced banana", "apple", "papaya", "berries", "pomegranate"];
  const fruitIndex = (dayIndex * 11 + 3) % fruits.length;
  const fruit = fruits[fruitIndex];
  
  // Weight loss plans get fruits for nutrients with fewer calories; others get optional extras
  if (isWeightLoss) {
    breakfast += ` with ${fruit}`;
  } else {
    // Add nutritious garnishes occasionally
    const garnishes = ["nuts", "seeds", "honey", "cinnamon"];
    const garnishIndex = (dayIndex * 13 + 7) % garnishes.length;
    const garnish = garnishes[garnishIndex];
    
    breakfast += ` with ${fruit} and ${garnish}`;
  }
  
  // Add prebiotics occasionally
  if (dayIndex % 7 === 0) {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex);
  }
  
  // Remove any duplicated food terms
  return removeDuplicateFoodItems(breakfast);
};

/**
 * Generate a protein-focused healthy breakfast
 */
export const generateHealthyBreakfast = (
  dayIndex: number,
  options: BreakfastOptions,
  isWeightLoss: boolean,
  isMale: boolean = false
): string => {
  // Safety check - ensure options and protein array exist with items
  if (!options || !options.protein || !options.protein.length) {
    // Default fallback breakfast if options aren't available
    return "Mixed vegetable oats upma (1 bowl) with sprouts";
  }
  
  // Select a protein source
  const proteinIndex = (dayIndex * 11 + 7) % options.protein.length;
  const protein = options.protein[proteinIndex];
  
  // Determine portion size based on weight loss goal and gender
  const proteinPortionSize = isWeightLoss 
    ? (isMale ? "moderate portion" : "small portion") 
    : (isMale ? "large portion" : "moderate portion");
  
  // Format breakfast description
  let breakfast = `${protein} (${proteinPortionSize})`;
  
  // Add accompaniments
  const sides = ["fruit salad", "vegetable slices", "sprouts", "cucumber", "tomato"];
  const sideIndex = (dayIndex * 13 + 5) % sides.length;
  const side = sides[sideIndex];
  
  // Add more items to non-weight loss plans
  if (isWeightLoss) {
    breakfast += ` with ${side}`;
  } else {
    const grains = ["whole wheat toast", "multigrain bread", "ragi roti", "jowar roti"];
    const grainIndex = (dayIndex * 7 + 3) % grains.length;
    const grain = grains[grainIndex];
    
    breakfast += ` with ${side} and ${grain}`;
  }
  
  // Add prebiotics occasionally
  if (dayIndex % 6 === 0) {
    breakfast = enrichWithPrebiotics(breakfast, dayIndex);
  }
  
  // Remove any duplicated food terms
  return removeDuplicateFoodItems(breakfast);
};
