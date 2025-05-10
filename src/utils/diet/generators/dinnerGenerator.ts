
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../helpers/prebioticProbioticHelper';

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
    let dinner = "";
    if (isWeightLoss) {
      dinner = `${regionalDinner} (light portion for evening)`;
    } else if (isProteinFocus) {
      dinner = `${regionalDinner} with extra protein`;
    } else {
      dinner = regionalDinner;
    }
    
    // Gently introduce pre/probiotics to regional specialties
    dinner = enrichWithPrebiotics(dinner, dayIndex);
    dinner = enrichWithProbiotics(dinner, dayIndex);
    
    return dinner;
  }
  
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  // Add local names to protein if it doesn't already have them
  let proteinWithLocalName = protein;
  if (protein === 'Paneer' && !protein.includes('(')) {
    proteinWithLocalName = 'Paneer (Indian Cottage Cheese)';
  } else if (protein === 'Tofu' && !protein.includes('(')) {
    proteinWithLocalName = 'Tofu (Soya Paneer)';
  } else if (protein === 'Chana' && !protein.includes('(')) {
    proteinWithLocalName = 'Chana (Chickpeas)';
  } else if (protein === 'Rajma' && !protein.includes('(')) {
    proteinWithLocalName = 'Rajma (Kidney Beans)';
  }
  
  // Include explicit carb portion in every dinner (rotis or rice)
  let main = "";
  if (isWeightLoss) {
    main = `${proteinWithLocalName} curry (light, 3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), Wheat Roti (1 piece) or Brown Rice (Bhura Chaval - 1/3 cup)`;
  } else if (isProteinFocus) {
    main = `${proteinWithLocalName} curry (generous portion, 1 cup), ${veggie1} and ${veggie2} sabzi (1 cup), Wheat Roti (2 pieces) or Brown Rice (Bhura Chaval - 1/2 cup)`;
  } else {
    main = `${proteinWithLocalName} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), Wheat Roti (2 pieces) or Brown Rice (Bhura Chaval - 1/2 cup)`;
  }
  
  // Always include buttermilk (probiotic) with dinner
  main += `, small bowl of buttermilk (Chaas - 1 cup)`;
  
  // For days that need additional prebiotics, add them to dinner
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  if (allergies) {
    const allergiesArr = allergies.split(',').map(x=>x.trim().toLowerCase());
    allergiesArr.forEach(a => {
      if (main.toLowerCase().includes(a)) {
        main = main.replace(new RegExp('\\b' + a + '\\b', 'gi'), '');
      }
    });
  }
  return main;
};
