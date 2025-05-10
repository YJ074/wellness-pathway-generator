
import { DietaryPreference } from '../types';
import { filterAllergies } from '../helpers/allergyHelpers';

export const getProteinSources = (dietaryPreference: DietaryPreference, allergies?: string) => {
  const proteins: Record<DietaryPreference, string[]> = {
    'lacto-vegetarian': [
      'Paneer', 'Toor Dal', 'Chana Dal', 'Moong Dal', 'Masoor Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Sattu',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Quinoa', 'Greek Yogurt', 'Cottage Cheese', 
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Egg Whites',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Quinoa', 'Greek Yogurt', 'Boiled Eggs', 'Egg Bhurji',
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans'
    ],
    'pure-vegetarian': [
      'Paneer', 'Soya Chunks', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Sattu',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong',
      'Quinoa', 'Tofu', 'Tempeh', 'Hemp Seeds', 
      'Kala Chana', 'White Beans', 'Moth Beans'
    ],
    'jain': [
      'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Soya Products', 'Dried Beans', 'Peanuts', 'Mixed Sprouts',
      'Chickpeas', 'Whole Moong', 'Besan (Gram Flour)',
      'Rajma', 'White Beans', 'Quinoa', 'Hemp Seeds',
      'Paneer (without animal rennet)'
    ],
    'pure-jain': [
      // Strict Jain: NO sprouts, NO root vegetables, NO eggs, NO non-veg, NO mushrooms, NO fermented
      'Paneer (without animal rennet)', 'Curd', 'Buttermilk', 'Toor Dal', 
      'Moong Dal', 'Masoor Dal', 'Urad Dal', 'Chana Dal', 
      'Besan (Gram Flour)', 'Chickpeas', 'Rajma',
      'White Beans', 'Quinoa', 'Hemp Seeds', 'Peanuts',
      'Dry Fruits (assorted and soaked)'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains', 'Cow Milk',
      'Fresh Yogurt', 'Ghee', 'Organic Honey', 'Fresh Cottage Cheese',
      'Kheer', 'White Beans', 'Quinoa', 'Amaranth'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts',
      'Lean Mutton', 'Farm-Raised Prawns', 'Rohu Fish',
      'Grilled Chicken Tikka', 'Egg Whites', 'Greek Yogurt',
      'Tandoori Fish', 'Free-Range Eggs'
    ]
  };
  return filterAllergies(proteins[dietaryPreference] || proteins['lacto-vegetarian'], allergies);
};

export const getGrainSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const allGrains = dietaryPreference === 'pure-jain' ? [
      'Rice (Local Variety)', 'Roti', 'Jowar Roti (Sorghum Flatbread)',
      'Bajra Roti (Pearl Millet Flatbread)', 'Multigrain Roti', 'Poha (Rice Flakes)',
      'Foxtail Millet (Kangni)', 'Barley Roti (Jau)', 'Rice Flakes (Poha)',
      'White Rice', 'Red Rice', 'Barnyard Millet (Samvat)',
      'Little Millet (Kutki)', 'Amaranth Roti (Rajgira)', 
      'Buckwheat Roti (Kuttu)', 'Quinoa'
    ] : [
      'Rice (Local Variety)', 'Roti', 'Ragi Roti (Finger Millet)', 'Jowar Roti (Sorghum)',
      'Bajra Roti (Pearl Millet)', 'Multigrain Roti', 'Poha (Rice Flakes)', 
      'Kodo Millet (Kodra)', 'Proso Millet (Barri)',
      'Suji Roti (Semolina)', 'Barley Roti (Jau)', 'Mixed Millet Roti', 'Rice Flakes (Poha)',
      'Brown Rice', 'Black Rice', 'Red Rice', 'Wild Rice',
      'Foxtail Millet (Kangni) Roti', 'Little Millet (Kutki) Roti',
      'Amaranth Roti (Rajgira)', 'Buckwheat Roti (Kuttu)', 'Quinoa'
    ];
  return filterAllergies(allGrains, allergies);
};

export const getVegetableSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  let base: string[] = [
    'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds', 'Cabbage', 'Cauliflower',
    'Carrots', 'Green Peas', 'Onions', 'Tomatoes', 'Potatoes', 'Local Beans',
    'Cucumber', 'Pumpkin', 'Radish', 'Beetroot', 'Broccoli', 'Capsicum',
    'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd', 'Cluster Beans (Gawar)',
    'Ivy Gourd (Tindora)', 'Okra (Bhindi)', 'Drumstick (Moringa)',
    'Turnip', 'Colocasia Leaves', 'Amaranth Leaves', 'Mustard Leaves',
    'Fenugreek Leaves', 'Curry Leaves'
  ];
  if (dietaryPreference === 'pure-jain' || dietaryPreference === 'jain') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Green Peas', 'Tomatoes',
      'Local Beans', 'Cucumber', 'Pumpkin', 'Capsicum',
      'Bottle Gourd (Lauki)', 'Ridge Gourd (Turai)', 'Snake Gourd',
      'Cluster Beans (Gawar)', 'Ivy Gourd (Tindora)',
      'Okra (Bhindi)', 'Amaranth Leaves', 'Fenugreek Leaves'
    ];
  } else if (dietaryPreference === 'sattvic') {
    base = [
      'Seasonal Local Greens', 'Palak (Spinach)', 'Local Gourds',
      'Cabbage', 'Cauliflower', 'Carrots', 'Green Peas',
      'Tomatoes', 'Local Beans', 'Cucumber', 'Pumpkin',
      'Bottle Gourd (Lauki)', 'Ash Gourd', 'Ridge Gourd (Turai)',
      'Snake Gourd', 'Cluster Beans (Gawar)', 'Banana Stem',
      'Amaranth Leaves', 'Drumstick (Moringa)', 'Curry Leaves'
    ];
  }
  return filterAllergies(base, allergies);
};

export const getFruitSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  const fruits = dietaryPreference === 'pure-jain'
    ? ['Bananas', 'Raisins', 'Almonds (soaked)', 'Cashews (soaked)', 'Figs (soaked)',
       'Apples (without seeds)', 'Mangoes', 'Papaya (ripened)',
       'Pomegranate', 'Chickoo', 'Guava', 'Pears']
    : [
        'Seasonal Local Fruits', 'Bananas', 'Local Varieties of Apples',
        'Oranges', 'Mosambi', 'Watermelon', 'Papaya',
        'Guava', 'Local Berries', 'Jamun (in season)',
        'Musk Melon', 'Indian Plums', 'Mangoes (seasonal)',
        'Pineapple', 'Pomegranate', 'Chickoo', 'Custard Apple',
        'Wood Apple', 'Jackfruit', 'Star Fruit', 'Lychee (seasonal)',
        'Amla (Indian Gooseberry)', 'Ber (Indian Jujube)',
        'Bael Fruit', 'Karonda', 'Sitaphal (Sugar-apple)'
      ];
  return filterAllergies(fruits, allergies);
};

export const getSnackSources = (dietaryPreference: DietaryPreference, isWeightLoss: boolean, allergies?: string) => {
  let baseSnacks = dietaryPreference === 'pure-jain'
    ? [
        'Roasted Chana', 'Roasted Peanuts', 'Homemade Poha (Rice Flakes)',
        'Dahi (plain curd)', 'Homemade Buttermilk', 'Soaked Dry Fruits',
        'Lemon Water', 'Cucumber Slices', 'Makhana (Fox Nuts)',
        'Dry Fruit Ladoo', 'Fruit Salad', 'Coconut Water'
      ]
    : [
        'Roasted Chana', 'Puffed Rice', 'Roasted Peanuts',
        'Homemade Poha (Rice Flakes)', 'Boiled Sprouts', 'Seasonal Fruit',
        'Buttermilk', 'Lemon Water', 'Homemade Chaas',
        'Makhana (Fox Nuts)', 'Roasted Seeds Mix',
        'Baked Vegetable Chips', 'Cucumber Raita',
        'Multigrain Dhokla', 'Vegetable Cutlets',
        'Ragi (Finger Millet) Cookies', 'Oats Chilla', 'Palak Patta Chaat',
        'Homemade Trail Mix', 'Steamed Sweet Corn'
      ];
  return filterAllergies(baseSnacks, allergies);
};
