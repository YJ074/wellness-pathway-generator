
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
    'Vegetable Poha with curd',
    'Oats Idli with sambhar',
    'Vegetable Upma with a side of sprouts',
    'Besan Chilla with mint chutney',
    'Multigrain Dosa with coconut chutney',
    'Masala Daliya (Broken Wheat) with vegetables',
    'Ragi Dosa with tomato chutney',
    'Vegetable Uttapam with sambar',
    'Moong Dal Cheela with curd',
    'Steamed Sprouts Dhokla',
    'Vegetable Daliya Khichdi',
    'Jowar Upma with vegetables',
    'Quinoa Poha with vegetables',
    'Brown Rice Idli with tomato chutney',
    'Bajra Roti with vegetable curry'
  ];
  
  if (dietaryPreference === 'eggitarian') {
    const eggBreakfasts = [
      'Egg Bhurji with multigrain roti',
      'Masala Omelette with vegetable stuffing',
      'Boiled Eggs with vegetable sandwich',
      'Egg and Vegetable Wrap'
    ];
    
    if (dayIndex % 4 === 0) {
      return eggBreakfasts[dayIndex % eggBreakfasts.length];
    }
  }
  
  return breakfastOptions[dayIndex];
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
    return `${grain} (small portion), ${protein} curry, ${veggie1} and ${veggie2} stir-fry, small bowl of curd`;
  } else if (isProteinFocus) {
    return `${grain}, double portion of ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
  }
  return `${grain}, ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
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
    return `${protein} curry (light), ${veggie1} and ${veggie2} sabzi, small bowl of buttermilk`;
  } else if (isProteinFocus) {
    return `${protein} curry (generous portion), ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
  }
  return `${protein} curry, ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
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
