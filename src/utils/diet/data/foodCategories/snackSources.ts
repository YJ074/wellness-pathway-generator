
import { DietaryPreference } from '../../types';
import { filterAllergies } from '../../helpers/allergyHelpers';

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean, allergies?: string) => {
  let baseSnacks: string[];
  
  if (dietaryPreference === 'vegan') {
    baseSnacks = [
      'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
      'Homemade Poha (Rice Flakes)', 'Boiled Sprouts', 'Seasonal Fruit',
      'Lemon Water', 'Homemade Herbal Tea', 'Coconut Water',
      'Makhana (Fox Nuts)', 'Roasted Seeds Mix',
      'Baked Vegetable Chips', 'Vegetable Cutlets',
      'Ragi (Finger Millet) Cookies', 'Oats Chilla', 'Palak Patta Chaat',
      'Homemade Trail Mix', 'Steamed Sweet Corn',
      'Almond Milk', 'Soy Yogurt', 'Coconut Yogurt'
    ];
  } else if (dietaryPreference === 'jain') {
    baseSnacks = [
      'Roasted Chana', 'Roasted Peanuts', 'Homemade Poha (Rice Flakes)',
      'Dahi (plain curd)', 'Homemade Buttermilk', 'Soaked Dry Fruits',
      'Lemon Water', 'Cucumber Slices', 'Makhana (Fox Nuts)',
      'Dry Fruit Ladoo', 'Fruit Salad', 'Coconut Water'
    ];
  } else {
    baseSnacks = [
      'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
      'Homemade Poha (Rice Flakes)', 'Boiled Sprouts', 'Seasonal Fruit',
      'Buttermilk', 'Lemon Water', 'Homemade Chaas',
      'Makhana (Fox Nuts)', 'Roasted Seeds Mix',
      'Baked Vegetable Chips', 'Cucumber Raita',
      'Multigrain Dhokla', 'Vegetable Cutlets',
      'Ragi (Finger Millet) Cookies', 'Oats Chilla', 'Palak Patta Chaat',
      'Homemade Trail Mix', 'Steamed Sweet Corn'
    ];
  }
  
  return filterAllergies(baseSnacks, allergies);
};
