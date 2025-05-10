
import { filterAllergies } from '../helpers/allergyHelpers';
import { getRegionalFoods } from '../data/regionalFoods';
import { getDryFruits } from '../data/dryFruits';

export const generateBreakfast = (
  dayIndex: number,
  dietaryPreference: string,
  isWeightLoss: boolean,
  allergies?: string,
  region?: string
) => {
  // Check if we have regional specialties first
  const regionalFoods = getRegionalFoods(region);
  
  // If region is specified and has breakfast items, use them occasionally (every 3rd day)
  if (region && regionalFoods.breakfast.length > 0 && dayIndex % 3 === 0) {
    const regionalBreakfast = regionalFoods.breakfast[dayIndex % regionalFoods.breakfast.length];
    
    // Add portion control for weight loss
    if (isWeightLoss) {
      return `${regionalBreakfast} (reduced portion)`;
    }
    return regionalBreakfast;
  }
  
  let breakfastOptions = [
    'Vegetable Poha (Rice Flakes - 1 cup) with curd (1/2 cup)',
    'Oats Idli (3 pieces) with sambhar (1/2 cup)',
    'Vegetable Upma (Semolina Porridge - 1 cup) with a side of sprouts (1/2 cup)',
    'Besan Chilla (Gram Flour Pancakes - 2 pieces) with mint chutney (2 tbsp)',
    'Multigrain Dosa (2 pieces) with coconut chutney (2 tbsp)',
    'Masala Daliya (Broken Wheat - 1 cup) with vegetables',
    'Ragi Dosa (Finger Millet - 2 pieces) with tomato chutney (2 tbsp)',
    'Vegetable Uttapam (2 pieces) with sambar (1/2 cup)',
    'Moong Dal Cheela (Split Green Gram Pancakes - 2 pieces) with curd (1/2 cup)',
    'Steamed Sprouts Dhokla (4 pieces)',
    'Vegetable Daliya Khichdi (Broken Wheat Porridge - 1 cup)',
    'Jowar Upma (Sorghum Porridge - 1 cup) with seasonal vegetables',
    'Quinoa Poha (3/4 cup) with vegetables',
    'Brown Rice Idli (3 pieces) with tomato chutney (2 tbsp)',
    'Bajra Roti (Pearl Millet Flatbread - 2 pieces) with vegetable curry (1/2 cup)',
    'Kodo Millet Upma (Kodra - 1 cup) with coconut chutney (2 tbsp)',
    'Sattu Paratha (Roasted Gram Flour Flatbread - 2 pieces) with curd (1/2 cup)',
    'Sprouted Moong Chilla (2 pieces) with pudina chutney (2 tbsp)',
    'Vegetable Dalia (Broken Wheat - Daliya - 1 cup) with almond milk (1/2 cup)',
    'Ragi Idli (Finger Millet - 3 pieces) with tomato sambar (1/2 cup)',
    'Bajra Khichdi (Pearl Millet Porridge - 1 cup) with buttermilk (1 glass)',
    'Jowar Roti (Sorghum Flatbread - 2 pieces) with vegetable kurma (1/2 cup)',
    'Amaranth Porridge (Rajgira - 1 cup) with seasonal fruits',
    'Buckwheat Pancakes (Kuttu - 2) with honey (1 tsp)',
    'Proso Millet Upma (Barri - 1 cup) with coconut chutney (2 tbsp)',
    'Foxtail Millet Upma (Kangni - 1 cup) with vegetable curry (1/2 cup)',
    'Little Millet Dosa (Kutki - 2 pieces) with sambar (1/2 cup)',
    'Barnyard Millet Porridge (Samvat - 1 cup) with mixed fruits'
  ];
  
  // Add dry fruits to breakfast on odd days
  if (dayIndex % 2 === 0) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    breakfastOptions = breakfastOptions.map(breakfast => `${breakfast}, with ${dryFruits}`);
  }
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    let eggBreakfasts = [
      'Egg Bhurji (Scrambled Eggs - 2 eggs) with multigrain roti (1 piece)',
      'Masala Omelette (2 eggs) with vegetable stuffing',
      'Boiled Eggs (2) with vegetable sandwich (1)',
      'Egg and Vegetable Wrap (1 whole wheat wrap)',
      'Egg Akuri (Parsi Style Eggs - 2 eggs) with multigrain toast (1 slice)',
      'Egg Poha (Rice Flakes with Eggs - 1 cup) with vegetables',
      'Egg White Omelette (3 egg whites) with spinach and herbs',
      'Egg Muffins (2) with vegetables',
      'Egg Upma (Semolina with Eggs - 1 cup) with mixed vegetables'
    ];
    
    // Add dry fruits to egg breakfasts occasionally (same pattern as vegetarian breakfast)
    if (dayIndex % 2 === 0) {
      const dryFruits = getDryFruits(isWeightLoss, true, dayIndex);
      eggBreakfasts = eggBreakfasts.map(breakfast => `${breakfast}, with ${dryFruits}`);
    }
    
    if (allergies) {
      eggBreakfasts = filterAllergies(eggBreakfasts, allergies);
    }
    if (eggBreakfasts.length && dayIndex % 4 === 0) {
      return eggBreakfasts[dayIndex % eggBreakfasts.length];
    }
  }
  if (allergies) {
    breakfastOptions = filterAllergies(breakfastOptions, allergies);
  }
  return breakfastOptions[dayIndex % breakfastOptions.length] || "";
};
