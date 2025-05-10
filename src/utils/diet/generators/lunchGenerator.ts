
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { getDryFruits } from '../data/dryFruits';

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
    if (isWeightLoss) {
      return `${regionalLunch} (reduced portion for weight management)`;
    } else if (isProteinFocus) {
      return `${regionalLunch} with extra protein portion`;
    }
    return regionalLunch;
  }
  
  const protein = proteins[dayIndex % proteins.length];
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
  // Occasionally add dry fruits (every 7th day)
  const dryFruitAddition = dayIndex % 7 === 0 ? `, with ${getDryFruits(isWeightLoss, isProteinFocus, dayIndex)}` : '';
  
  let main = "";
  if (isWeightLoss) {
    main = `${grain} (small portion, 1/2 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), small bowl of curd (1/2 cup)${dryFruitAddition}`;
  } else if (isProteinFocus) {
    main = `${grain} (3/4 cup), double portion of ${protein} curry (1 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)${dryFruitAddition}`;
  } else {
    main = `${grain} (3/4 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)${dryFruitAddition}`;
  }
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
