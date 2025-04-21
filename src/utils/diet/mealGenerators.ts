
import { DietaryPreference } from './types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources 
} from './foodSources';

export const generateBreakfast = (dayIndex: number, dietaryPreference: DietaryPreference, isWeightLoss: boolean) => {
  const breakfastOptions = [
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
    'Bajra Roti (2 pieces) with vegetable curry (1/2 cup)'
  ];
  
  if (dietaryPreference === 'lacto-ovo-vegetarian' || dietaryPreference === 'non-vegetarian') {
    const eggBreakfasts = [
      'Egg Bhurji (2 eggs) with multigrain roti (1 piece)',
      'Masala Omelette (2 eggs) with vegetable stuffing',
      'Boiled Eggs (2) with vegetable sandwich (1)',
      'Egg and Vegetable Wrap (1 whole wheat wrap)'
    ];
    
    if (dayIndex % 4 === 0) {
      return eggBreakfasts[dayIndex % eggBreakfasts.length];
    }
  }
  
  return breakfastOptions[dayIndex];
};

export const generateMidMorningSnack = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean
) => {
  const midMorningOptions = [
    'Seasonal fruit (1 medium)',
    'Buttermilk (1 glass)',
    'Roasted chana (1/4 cup)',
    'Apple slices (1 small apple) with a thin spread of peanut butter (1 tsp)',
    'Sprouts salad (1/2 cup)',
    'Plain yogurt (1/2 cup) with berries',
    'Handful of mixed nuts (10-12 pieces)',
    'Cucumber and carrot sticks (1 cup)',
    'Fresh coconut pieces (1/4 cup)',
    'Small bowl of makhana (fox nuts, 1/4 cup)'
  ];
  
  return midMorningOptions[dayIndex % midMorningOptions.length];
};

export const generateLunch = (
  dayIndex: number, 
  proteins: string[], 
  grains: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean
) => {
  const protein = proteins[dayIndex % proteins.length];
  const grain = grains[dayIndex % grains.length];
  const veggie1 = vegetables[dayIndex % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
  
  if (isWeightLoss) {
    return `${grain} (small portion, 1/2 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), small bowl of curd (1/2 cup)`;
  } else if (isProteinFocus) {
    return `${grain} (3/4 cup), double portion of ${protein} curry (1 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)`;
  }
  return `${grain} (3/4 cup), ${protein} curry (3/4 cup), ${veggie1} and ${veggie2} stir-fry (1 cup), bowl of curd (1 cup)`;
};

export const generateEveningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean
) => {
  const eveningSnackOptions = [
    'Roasted makhana (1/4 cup)',
    'Vegetable cutlet (2 small pieces, baked)',
    'Multigrain dhokla (2 pieces)',
    'Roasted chana (1/4 cup) with chopped onions and tomatoes',
    'Masala puffed rice (1/2 cup)',
    'Steamed corn kernels (1/2 cup) with lemon and black salt',
    'Paneer tikka (4-5 small pieces, grilled)',
    'Peanut chaat (1/4 cup)',
    'Roasted sweet potato (1 small)',
    'Mixed vegetable soup (1 bowl)'
  ];
  
  return eveningSnackOptions[(dayIndex + 3) % eveningSnackOptions.length];
};

export const generateDinner = (
  dayIndex: number, 
  proteins: string[], 
  vegetables: string[], 
  isWeightLoss: boolean,
  isProteinFocus: boolean
) => {
  const protein = proteins[(dayIndex + 3) % proteins.length];
  const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
  const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
  
  if (isWeightLoss) {
    return `${protein} curry (light, 3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (1 piece), small bowl of buttermilk (1 cup)`;
  } else if (isProteinFocus) {
    return `${protein} curry (generous portion, 1 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
  }
  return `${protein} curry (3/4 cup), ${veggie1} and ${veggie2} sabzi (1 cup), roti (2 pieces), bowl of buttermilk (1 cup)`;
};

export const generateSnacks = (
  dayIndex: number, 
  snacks: string[], 
  fruits: string[], 
  isWeightLoss: boolean
) => {
  const snack = snacks[dayIndex % snacks.length];
  const fruit = fruits[dayIndex % fruits.length];
  
  if (isWeightLoss) {
    return `${fruit} OR ${snack} (choose one per day)`;
  }
  return `${fruit} AND ${snack}`;
};
