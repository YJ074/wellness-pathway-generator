
import { DietaryPreference } from './types';

export const getProteinSources = (dietaryPreference: DietaryPreference) => {
  const proteins = {
    'lacto-vegetarian': [
      'Paneer', 'Curd', 'Buttermilk', 'Cottage Cheese',
      'Dal Makhani', 'Rajma', 'Chana', 'Moong Dal',
      'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Greek Yogurt'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Curd', 'Buttermilk',
      'Dal Makhani', 'Rajma', 'Chana', 'Moong Dal',
      'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Greek Yogurt'
    ],
    'pure-vegetarian': [
      'Tofu', 'Tempeh', 'Soya Chunks', 'Chana',
      'Rajma', 'Moong Dal', 'Toor Dal', 'Masoor Dal',
      'Urad Dal', 'Peanuts', 'Almonds', 'Cashews'
    ],
    'jain': [
      'Tofu', 'Moong Dal', 'Toor Dal', 'Masoor Dal',
      'Urad Dal', 'Peanuts', 'Almonds', 'Cashews',
      'Soya Products', 'Dried Beans', 'Chickpeas'
    ],
    'sattvic': [
      'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Fresh Paneer', 'Buttermilk', 'Ghee', 'Nuts',
      'Dried Fruits', 'Sprouted Grains'
    ],
    'non-vegetarian': [
      'Chicken', 'Fish', 'Eggs', 'Mutton',
      'Paneer', 'Dal Makhani', 'Rajma', 'Chana',
      'Moong Dal', 'Toor Dal', 'Greek Yogurt'
    ]
  };
  
  return proteins[dietaryPreference] || proteins['lacto-vegetarian'];
};

export const getGrainSources = () => [
  'Brown Rice', 'Quinoa', 'Bajra Roti', 'Jowar Roti', 'Ragi Roti',
  'Whole Wheat Roti', 'Oats', 'Millet', 'Brown Rice Poha',
  'Whole Wheat Bread', 'Multigrain Dosa', 'Red Rice'
];

export const getVegetableSources = () => [
  'Spinach', 'Methi (Fenugreek Leaves)', 'Palak (Spinach)', 'Broccoli',
  'Lauki (Bottle Gourd)', 'Bhindi (Okra)', 'Baingan (Eggplant)',
  'Capsicum (Bell Pepper)', 'Carrots', 'Tomatoes', 'Cabbage',
  'Cauliflower', 'Green Beans', 'Peas', 'Beetroot', 'Pumpkin',
  'Zucchini', 'Asparagus', 'Brussels Sprouts', 'Kale'
];

export const getFruitSources = () => [
  'Apple', 'Banana', 'Papaya', 'Watermelon', 'Muskmelon',
  'Orange', 'Guava', 'Pomegranate', 'Pineapple', 'Strawberry',
  'Kiwi', 'Mango (in moderation)', 'Jamun', 'Chikoo'
];

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean) => {
  const baseSnacks = [
    'Roasted Chana', 'Makhana (Fox Nuts)', 'Murmura (Puffed Rice)',
    'Sprouts Chaat', 'Cucumber Slices', 'Carrot Sticks',
    'Homemade Hummus', 'Buttermilk', 'Vegetable Soup'
  ];
  
  if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
    baseSnacks.push('Boiled Egg');
  }
  
  return baseSnacks;
};
