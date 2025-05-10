
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
    'Vegetable Poha (1 cup) with curd (1/2 cup)',
    'Oats Idli (3 pieces) with sambhar (1/2 cup)',
    'Vegetable Upma (1 cup) with a side of sprouts (1/2 cup)',
    'Besan Chilla (2 pieces) with mint chutney (2 tbsp)',
    'Multigrain Dosa (2 pieces) with coconut chutney (2 tbsp)',
    'Masala Daliya (1 cup, Broken Wheat) with vegetables',
    'Ragi Dosa (2 pieces) with tomato chutney (2 tbsp)',
    'Vegetable Uttapam (2 pieces) with sambar (1/2 cup)',
    'Moong Dal Cheela (2 pieces) with curd (1/2 cup)',
    'Steamed Sprouts Dhokla (4 pieces)',
    'Vegetable Daliya Khichdi (1 cup)',
    'Jowar Upma (1 cup) with seasonal vegetables',
    'Quinoa Poha (3/4 cup) with vegetables',
    'Brown Rice Idli (3 pieces) with tomato chutney (2 tbsp)',
    'Bajra Roti (2 pieces) with vegetable curry (1/2 cup)',
    'Millet Upma (1 cup) with coconut chutney (2 tbsp)',
    'Sattu Paratha (2 pieces) with curd (1/2 cup)',
    'Sprouted Moong Chilla (2 pieces) with pudina chutney (2 tbsp)',
    'Vegetable Dalia (1 cup) with almond milk (1/2 cup)',
    'Ragi Idli (3 pieces) with tomato sambar (1/2 cup)',
    'Bajra Khichdi (1 cup) with buttermilk (1 glass)',
    'Jowar Dosa (2 pieces) with vegetable kurma (1/2 cup)',
    'Amaranth Porridge (1 cup) with seasonal fruits',
    'Buckwheat Pancakes (2) with honey (1 tsp)',
    'Quinoa Upma (1 cup) with coconut chutney (2 tbsp)'
  ];
  
  // Add dry fruits to breakfast occasionally (every 4th day)
  if (dayIndex % 4 === 0) {
    const dryFruits = getDryFruits(isWeightLoss, false, dayIndex);
    breakfastOptions = breakfastOptions.map(breakfast => `${breakfast}, with ${dryFruits}`);
  }
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    let eggBreakfasts = [
      'Egg Bhurji (2 eggs) with multigrain roti (1 piece)',
      'Masala Omelette (2 eggs) with vegetable stuffing',
      'Boiled Eggs (2) with vegetable sandwich (1)',
      'Egg and Vegetable Wrap (1 whole wheat wrap)',
      'Egg Akuri (2 eggs) with multigrain toast (1 slice)',
      'Egg Poha (1 cup) with vegetables',
      'Egg White Omelette (3 egg whites) with spinach and herbs',
      'Egg Muffins (2) with vegetables',
      'Egg Upma (1 cup) with mixed vegetables'
    ];
    
    // Add dry fruits to egg breakfasts occasionally
    if (dayIndex % 4 === 0) {
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
