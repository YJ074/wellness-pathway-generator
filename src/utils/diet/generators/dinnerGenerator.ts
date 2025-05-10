
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';

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
    if (isWeightLoss) {
      return `${regionalDinner} (light portion for evening)`;
    } else if (isProteinFocus) {
      return `${regionalDinner} with extra protein`;
    }
    return regionalDinner;
  }
  
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  let main = "";
  if (isWeightLoss) {
    main = `${protein} curry (light, 3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (1 piece), small bowl of buttermilk (1 cup)`;
  } else if (isProteinFocus) {
    main = `${protein} curry (generous portion, 1 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
  } else {
    main = `${protein} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
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
