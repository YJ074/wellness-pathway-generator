
import { DietaryPreference } from './types';

export const getProteinSources = (dietaryPreference: DietaryPreference) => {
  const proteins = {
    'lacto-vegetarian': [
      'Paneer', 'Toor Dal', 'Chana Dal', 'Moong Dal', 'Masoor Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts'
    ],
    'pure-vegetarian': [
      'Paneer', 'Soya Chunks', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong'
    ],
    'jain': [
      'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Soya Products', 'Dried Beans', 'Peanuts', 'Mixed Sprouts',
      'Chickpeas', 'Whole Moong', 'Besan (Gram Flour)'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts'
    ],
    'eggitarian': [
      'Eggs', 'Mixed Sprouts', 'Paneer', 'Moong Dal',
      'Toor Dal', 'Chana Dal', 'Peanuts', 'Besan (Gram Flour)'
    ]
  };
  
  return proteins[dietaryPreference] || proteins['lacto-vegetarian'];
};

export const getGrainSources = () => [
  'Rice (Local Variety)', 'Broken Wheat', 'Ragi', 'Jowar',
  'Bajra', 'Whole Wheat Atta', 'Poha', 'Local Millet Varieties',
  'Suji (Semolina)', 'Barley', 'Mixed Millet Roti', 'Rice Flakes'
];

export const getVegetableSources = () => [
  'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
  'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
  'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
  'Cucumber', 'Pumpkin', 'Radish', 'Beetroot'
];

export const getFruitSources = () => [
  'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
  'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
  'Guava', 'Local Berries', 'Jamun (in season)',
  'Musk Melon', 'Indian Plums'
];

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean) => {
  const baseSnacks = [
    'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
    'Homemade Poha', 'Boiled Sprouts', 'Seasonal Fruit',
    'Buttermilk', 'Lemon Water', 'Homemade Chaas'
  ];
  
  if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
    baseSnacks.push('Boiled Egg');
  }
  
  return baseSnacks;
};

