
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';
import { 
  getLocalizedProteinName, 
  getLocalizedGrainName,
  composeRegionalMeal,
  getBreadPortionSize,
  getVeganProteinAlternative,
  getProteinPortion
} from '../helpers/portionHelpers';

export const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  allergies?: string,
  region?: string
) => {
  // Check for regional specialties
  const regionalFoods = getRegionalFoods(region);
  
  // Use regional lunch options every 5th day if available
  if (region && regionalFoods.mains.length > 0 && dayIndex % 5 === 0) {
    const regionalLunch = regionalFoods.mains[dayIndex % regionalFoods.mains.length];
    
    // Format lunch based on dietary goals using helper function
    let lunch = composeRegionalMeal(regionalLunch, isWeightLoss, isProteinFocus);
    
    // For regional specialties, gently introduce pre/probiotics without forcing them
    lunch = enrichWithPrebiotics(lunch, dayIndex);
    lunch = enrichWithProbiotics(lunch, dayIndex);
    
    return lunch;
  }
  
  // Ensure we get at least 2 protein sources for each lunch to maximize protein intake
  const protein1 = proteins[dayIndex % proteins.length];
  const protein2 = proteins[(dayIndex + 7) % proteins.length]; // Use a different protein source
  
  // Make sure we use a grain in every meal for consistent carb balance
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
  // Add local names to proteins if they don't already have them
  const protein1WithLocalName = getLocalizedProteinName(protein1);
  const protein2WithLocalName = getLocalizedProteinName(protein2);
  
  // Ensure local names for grains too with specific preparation method
  const grainWithLocalName = getLocalizedGrainName(grain);
  
  // Get roti count (as a number, not as "X rotis")
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus);
  
  // Explicitly include carbs in the form of roti/rice/bread in each meal description
  let main = "";
  if (isWeightLoss) {
    main = `${grainWithLocalName} (${rotiCount} roti or ½ katori rice), ${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - balanced protein sources), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else if (isProteinFocus) {
    main = `${grainWithLocalName} (${rotiCount} roti or ¾ katori rice), double portion of ${protein1WithLocalName} and ${protein2WithLocalName} curry (1 katori - high protein mix), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  } else {
    main = `${grainWithLocalName} (${rotiCount} roti or ¾ katori rice), ${protein1WithLocalName} and ${protein2WithLocalName} curry (¾ katori - protein-rich blend), ${veggie1} and ${veggie2} sabzi (1 katori)`;
  }
  
  // Add curd (probiotic) to every lunch - a staple in Indian diets
  main += `, dahi (1 katori)`;
  
  // For days not already featuring prebiotics, add some to the meal
  main = enrichWithPrebiotics(main, dayIndex);
  
  if (allergies) {
    // Remove or swap allergy terms inside lunch text (rough approach)
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  return main;
};
