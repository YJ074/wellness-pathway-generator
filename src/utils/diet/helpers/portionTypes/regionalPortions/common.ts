
/**
 * Common helper functions for regional meal portions
 * Following ICMR/NIN guidelines for balanced meals
 */

// Helper function to compose regional meal with appropriate portion control
export const composeRegionalMeal = (
  regionalDish: string,
  isWeightLoss: boolean,
  isProteinFocus: boolean
): string => {
  // Apply portion control based on dietary goals
  if (isWeightLoss) {
    // For weight loss, we reduce the portion size and carbs
    if (!regionalDish.includes("(small")) {
      regionalDish += " (small katori portion, ~120-150ml)";
    }
    
    // Add explicit instructions to reduce rice/roti if not already mentioned
    if (regionalDish.includes("rice") && !regionalDish.includes("less rice")) {
      regionalDish = regionalDish.replace("rice", "rice (¼ katori)");
    } else if (regionalDish.includes("roti") && !regionalDish.toLowerCase().includes("1 roti")) {
      regionalDish = regionalDish.replace(/roti/, "1 roti (palm-sized)");
    }
    
    // Add vegetable suggestion if not already there
    if (!regionalDish.toLowerCase().includes("vegetable") && 
        !regionalDish.toLowerCase().includes("sabzi")) {
      regionalDish += " with 1 katori extra vegetables";
    }
    
    // Add calorie estimate aligned with ICMR/NIN guidelines
    if (!regionalDish.includes("kcal")) {
      regionalDish += " (~350-450 kcal, high fiber)";
    }
  }
  else if (isProteinFocus) {
    // For protein focus, we keep moderate portions but emphasize protein
    if (!regionalDish.includes("(") && !regionalDish.includes("portion")) {
      regionalDish += " (regular katori serving, ~150-200ml)";
    }
    
    // Highlight protein aspect
    if (regionalDish.toLowerCase().includes("dal") || 
        regionalDish.toLowerCase().includes("paneer") || 
        regionalDish.toLowerCase().includes("chicken") ||
        regionalDish.toLowerCase().includes("fish") ||
        regionalDish.toLowerCase().includes("egg")) {
      regionalDish = regionalDish.replace(
        /(dal|paneer|chicken|fish|egg)/i, 
        "extra $1 (protein-rich)"
      );
    } else {
      // Add protein if the dish doesn't already have it
      regionalDish += " with 1 katori dal for extra protein";
    }
    
    // Add calorie estimate aligned with ICMR/NIN guidelines
    if (!regionalDish.includes("kcal")) {
      regionalDish += " (~500-600 kcal, higher protein)";
    }
  }
  else {
    // For balanced diet, use standard portion and complete nutrition
    if (!regionalDish.includes("(") && !regionalDish.includes("portion")) {
      regionalDish += " (standard katori serving, ~150-200ml)";
    }
    
    // Add balanced macros note aligned with ICMR/NIN guidelines
    if (!regionalDish.includes("kcal")) {
      regionalDish += " (~450-550 kcal, balanced meal with ~50-60% carbs, 15-20% protein, 20-30% healthy fats)";
    }
  }
  
  return regionalDish;
};
