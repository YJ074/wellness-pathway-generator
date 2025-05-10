
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { 
  getLocalizedProteinName, 
  getBreadPortionSize,
  composeRegionalMeal,
  composeDinnerMeal,
  getPortionSize
} from '../helpers/portionHelpers';

export const generateDinner = (
  dayIndex: number, 
  proteins: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional dinner options every 6th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 6 === 0) {
    const regionalDinner = regionalFoods.mains[(dayIndex + 2) % regionalFoods.mains.length];
    
    // Format dinner based on dietary goals using the helper function
    let dinner = composeRegionalMeal(regionalDinner, isWeightLoss, isProteinFocus);
    
    // Gently introduce pre/probiotics to regional specialties
    dinner = enrichWithPrebiotics(dinner, dayIndex);
    dinner = enrichWithProbiotics(dinner, dayIndex);
    
    return dinner;
  }
  
  // Select ingredients for today's dinner
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  // Add local names to protein if it doesn't already have them
  const proteinWithLocalName = getLocalizedProteinName(protein);
  
  // Define portion sizes based on dietary goals
  const curryPortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'curry',
    {
      standard: '¾ katori',
      weightLoss: '¾ katori',
      proteinFocus: '1 katori'
    }
  );
  
  const veggiePortion = '1 katori'; // Same across all plans
  
  // Get roti count (as a number, not a portion size)
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus);
  
  const ricePortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'rice',
    {
      standard: '½ katori',
      weightLoss: '¼ katori',
      proteinFocus: '½ katori'
    }
  );
  
  // Compose the main dinner meal using the helper function
  let main = composeDinnerMeal(
    proteinWithLocalName,
    veggie1,
    veggie2,
    curryPortion,
    veggiePortion,
    rotiCount,
    ricePortion
  );
  
  // Always include buttermilk (probiotic) with dinner
  main += `, chaas (1 glass)`;
  
  // For days that need additional prebiotics, add them to dinner
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  // Filter for allergies if specified
  if (allergies) {
    main = filterAllergies([main], allergies)[0] || "";
  }
  
  return main;
};
