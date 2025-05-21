
import { DietaryPreference } from '../../types';
import { filterAllergies } from '../../helpers/allergyHelpers';

export const getVegetableSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  let base: string[] = [
    'Seasonal Local Greens', 'Palak (Spinach)', 'Lauki (Bottle Gourd)', 'Cabbage', 'Cauliflower',
    'Carrots', 'Green Peas', 'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
    'Cucumber', 'Pumpkin', 'Radish', 'Beetroot', 'Local Leafy Greens', 'Capsicum',
    'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd', 'Cluster Beans (Gawar)',
    'Ivy Gourd (Tindora)', 'Okra (Bhindi)', 'Drumstick (Moringa)',
    'Turnip', 'Colocasia Leaves', 'Amaranth Leaves', 'Mustard Leaves',
    'Fenugreek Leaves', 'Curry Leaves', 'Karela (Bitter Gourd)', 'Parwal', 'Arbi',
    'Brinjal (Baingan)', 'Methi Leaves', 'Sem Phali (Flat Beans)'
  ];
  
  if (dietaryPreference === 'jain') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Lauki (Bottle Gourd)',
      'Cabbage', 'Cauliflower', 'Green Peas', 'Tomatoes',
      'Local Beans', 'Cucumber', 'Pumpkin', 'Capsicum',
      'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd',
      'Cluster Beans (Gawar)', 'Ivy Gourd (Tindora)',
      'Okra (Bhindi)', 'Amaranth Leaves', 'Fenugreek Leaves'
    ];
  } else if (dietaryPreference === 'sattvic') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Lauki (Bottle Gourd)',
      'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin',
      'Bottle Gourd (Lauki)', 'Ash Gourd', 'Ridge Gourd (Turai)',
      'Snake Gourd', 'Cluster Beans (Gawar)', 'Banana Stem',
      'Amaranth Leaves', 'Drumstick (Moringa)', 'Curry Leaves'
    ];
  }
  
  return filterAllergies(base, allergies);
};
