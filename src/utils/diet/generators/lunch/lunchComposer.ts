
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { removeDuplicateFoodItems, hasFoodBeenUsedToday } from '../../helpers/deduplication';
import { 
  getLocalizedProteinName, 
  getLocalizedGrainName,
  getBreadPortionSize
} from '../../helpers/portionHelpers';

/**
 * Compose a standard lunch meal with protein, vegetables, and grains
 */
export const composeLunchMeal = (
  dayIndex: number,
  proteins: string[],
  grains: string[],
  vegetables: string[],
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  isMale: boolean = false
) => {
  // Use prime number-based offsets to ensure variety across days
  // These create non-repeating patterns over 75 days to avoid repetition
  const protein1Index = (dayIndex * 7 + 3) % proteins.length;
  let protein2Index = (dayIndex * 11 + 13) % proteins.length; // Different offset ensures variety
  
  const grainIndex = (dayIndex * 5 + 1) % grains.length;
  const veggie1Index = (dayIndex * 13 + 7) % vegetables.length;
  const veggie2Index = (dayIndex * 17 + 11) % vegetables.length;
  
  // Ensure we get at least 2 protein sources for each lunch to maximize protein intake
  let protein1 = proteins[protein1Index];
  let protein2 = proteins[protein2Index]; // Use a different protein source
  
  // Check if these proteins have been used today already
  if (hasFoodBeenUsedToday(dayIndex, protein1)) {
    // Try to find another protein that hasn't been used
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein1Index + i) % proteins.length;
      if (!hasFoodBeenUsedToday(dayIndex, proteins[newIndex])) {
        protein1 = proteins[newIndex];
        break;
      }
    }
  }
  
  // Also check second protein for repetition or similarity to first
  const legumeType1 = protein1.toLowerCase().includes('dal') || 
                      protein1.toLowerCase().includes('beans') ||
                      protein1.toLowerCase().includes('lentil');
                     
  if (hasFoodBeenUsedToday(dayIndex, protein2) || 
     (legumeType1 && (protein2.toLowerCase().includes('dal') || 
                     protein2.toLowerCase().includes('beans') ||
                     protein2.toLowerCase().includes('lentil')))) {
    // Try to find a non-legume protein if the first one was legume
    for (let i = 1; i < proteins.length; i++) {
      const newIndex = (protein2Index + i) % proteins.length;
      const candidate = proteins[newIndex];
      
      if (!hasFoodBeenUsedToday(dayIndex, candidate) && 
         !(legumeType1 && (candidate.toLowerCase().includes('dal') || 
                          candidate.toLowerCase().includes('beans') ||
                          candidate.toLowerCase().includes('lentil')))) {
        protein2 = candidate;
        break;
      }
    }
  }
  
  // Make sure we use a grain in every meal for consistent carb balance
  const grain = grains[grainIndex];
  const veggie1 = vegetables[veggie1Index];
  const veggie2 = vegetables[veggie2Index];
  
  // Add local names to proteins if they don't already have them
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Ensure local names for grains too with specific preparation method
  const grainWithLocalName = getLocalizedGrainName(grain);
  
  // Get roti count based on diet goals and gender
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus, isMale);
  
  let main = composeLunchPortions(
    protein1WithLocalName, 
    protein2WithLocalName, 
    veggie1, 
    veggie2, 
    rotiCount,
    isWeightLoss,
    isProteinFocus,
    isMale
  );
  
  // Check if dairy has been used already today before adding curd
  const dairyTerms = ['dahi', 'yogurt', 'curd', 'buttermilk', 'chaas', 'milk', 'paneer'];
  const hasDairyInMeals = dairyTerms.some(term => hasFoodBeenUsedToday(dayIndex, term));
  
  // Add curd (probiotic) to lunch only if we haven't used dairy yet
  if (!hasDairyInMeals) {
    const curdPortion = isMale ? "1½ katori" : "1 katori";
    main += `, dahi (${curdPortion})`;
  }
  
  // For days not already featuring prebiotics, add some to the meal
  main = enrichWithPrebiotics(main, dayIndex);
  
  // Apply deduplication to lunch
  main = removeDuplicateFoodItems(main);
  
  if (allergies) {
    // Remove or swap allergy terms inside lunch text
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  
  // Add health benefit
  const healthBenefit = getHealthBenefit(main);
  main += ` - (${healthBenefit})`;
  
  return main;
};

/**
 * Helper function to compose the lunch portions based on dietary goals and gender
 */
const composeLunchPortions = (
  protein1: string,
  protein2: string,
  veggie1: string,
  veggie2: string,
  rotiCount: number,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
) => {
  if (isWeightLoss) {
    // Smaller portions for weight loss, but gender-adjusted
    const curryPortion = isMale ? "¾ katori" : "⅔ katori";
    const ricePortion = isMale ? "½ katori" : "⅓ katori";
    
    return `${protein1} and ${protein2} curry (${curryPortion} - balanced protein sources), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ${ricePortion} brown rice`;
  } else if (isProteinFocus) {
    // Higher protein portions, gender-adjusted
    const curryPortion = isMale ? "1½ katori" : "1 katori";
    const ricePortion = isMale ? "1 katori" : "¾ katori";
    
    return `${protein1} and ${protein2} curry (${curryPortion} - high protein mix), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ${ricePortion} rice`;
  } else {
    // Standard portions, gender-adjusted
    const curryPortion = isMale ? "1 katori" : "¾ katori";
    const ricePortion = isMale ? "¾ katori" : "⅔ katori";
    
    return `${protein1} and ${protein2} curry (${curryPortion} - protein-rich blend), ${veggie1} and ${veggie2} sabzi (1 katori), ${rotiCount} rotis (palm-sized) OR ${ricePortion} rice`;
  }
};
