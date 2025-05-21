/**
 * Common helper functions for regional meal portions
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
  }
  else {
    // For balanced diet, use standard portion and complete nutrition
    if (!regionalDish.includes("(") && !regionalDish.includes("portion")) {
      regionalDish += " (standard katori serving, ~150-200ml)";
    }
  }
  
  return regionalDish;
};
