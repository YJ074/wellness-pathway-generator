

import { DietaryPreference } from '../types';
import { filterAllergies } from '../helpers/allergyHelpers';

export const getProteinSources = (dietaryPreference: DietaryPreference, allergies?: string) => {
  const proteins: Record<DietaryPreference, string[]> = {
    'lacto-vegetarian': [
      'Paneer', 'Toor Dal', 'Chana Dal', 'Moong Dal', 'Masoor Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Sattu',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Channa Flour Roti', 'Milk', 'Cottage Cheese', 
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans',
      'Milk Protein', 'Protein-Enriched Milk', 'Yogurt',
      'Chhena', 'Milk Solids (Khoya)', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram', 'Lima Beans',
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Egg Whites',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Channa Flour Roti', 'Yogurt', 'Boiled Eggs', 'Egg Bhurji',
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans',
      'Milk Protein', 'Protein-Enriched Milk', 'Egg Curry',
      'Black-Eyed Peas', 'Kulthi Dal', 'Val Dal', 'Horse Gram',
      'Lima Beans', 'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'pure-vegetarian': [
      'Paneer', 'Soya Chunks', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Sattu',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong',
      'Channa Flour Roti', 'Tofu', 'Lentil Soup', 'Flax Seeds', 
      'Kala Chana', 'White Beans', 'Moth Beans',
      'Protein-Enriched Milk', 'Yogurt', 'Soya Milk',
      'Chhena', 'Milk Solids (Khoya)', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram', 'Lima Beans',
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'vegan': [
      'Soya Chunks', 'Tofu', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Sattu',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong',
      'Channa Flour Roti', 'Lentil Soup', 'Flax Seeds', 'Chia Seeds',
      'Kala Chana', 'White Beans', 'Moth Beans', 'Quinoa',
      'Soya Milk', 'Peanut Butter', 'Almond Milk', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram', 'Lima Beans',
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'pure-jain': [
      // Strict Jain: NO sprouts, NO root vegetables, NO eggs, NO non-veg
      'Paneer (without animal rennet)', 'Curd', 'Buttermilk', 'Toor Dal', 
      'Moong Dal', 'Masoor Dal', 'Urad Dal', 'Chana Dal', 
      'Besan (Gram Flour)', 'Chickpeas', 'Rajma',
      'White Beans', 'Channa Flour Roti', 'Flax Seeds', 'Peanuts',
      'Dry Fruits (assorted and soaked)', 'Milk Solids (Khoya)',
      'Protein-Enriched Milk', 'Yogurt', 'Almond Milk',
      'Sunflower Seeds', 'Pumpkin Seeds', 'Val Dal',
      'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains', 'Cow Milk',
      'Fresh Yogurt', 'Ghee', 'Organic Honey', 'Fresh Cottage Cheese',
      'Kheer', 'White Beans', 'Channa Flour Roti', 'Amaranth',
      'Soaked and Peeled Almonds', 'Protein-Enriched Milk', 
      'Yogurt', 'Organic Soy Milk', 'Black-Eyed Peas',
      'Green Pigeon Peas', 'Split Pigeon Peas'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts',
      'Lean Mutton', 'Farm-Raised Prawns', 'Rohu Fish',
      'Grilled Chicken Tikka', 'Egg Whites', 'Yogurt',
      'Tandoori Fish', 'Free-Range Eggs',
      'Egg Protein', 'Chicken Breast', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram'
    ]
  };
  return filterAllergies(proteins[dietaryPreference] || proteins['lacto-vegetarian'], allergies);
};

export const getGrainSources = (dietaryPreference?: DietaryPreference, allergies?: string) => {
  // Grains are mostly the same for all dietary preferences
  const allGrains = dietaryPreference === 'pure-jain' ? [
      'Rice (Local Variety)', 'Wheat Roti', 'Jowar Roti (Sorghum Flatbread)',
      'Bajra Roti (Pearl Millet Flatbread)', 'Multigrain Roti', 'Poha (Rice Flakes)',
      'Foxtail Millet Roti', 'Barley Roti (Jau Roti)', 'Rice Flakes (Poha)',
      'White Rice (Safed Chaval)', 'Red Rice', 'Barnyard Millet Khichdi',
      'Little Millet Roti', 'Amaranth Roti (Rajgira Roti)', 
      'Buckwheat Roti (Kuttu Roti)'
    ] : [
      'Rice (Local Variety)', 'Wheat Roti', 'Ragi Roti (Finger Millet Roti)', 'Jowar Roti (Sorghum Roti)',
      'Bajra Roti (Pearl Millet Roti)', 'Multigrain Roti', 'Poha (Rice Flakes)', 
      'Kodo Millet Roti', 'Proso Millet Upma',
      'Suji Roti (Semolina Roti)', 'Barley Roti (Jau Roti)', 'Mixed Millet Roti', 'Rice Flakes (Poha)',
      'Brown Rice (Bhura Chaval)', 'Black Rice', 'Red Rice', 'Hand-Pound Rice',
      'Foxtail Millet Roti', 'Little Millet Roti',
      'Amaranth Roti (Rajgira Roti)', 'Buckwheat Roti (Kuttu Roti)', 'Local Rice Pulao'
    ];
  return filterAllergies(allGrains, allergies);
};

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
  if (dietaryPreference === 'pure-jain') {
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
        'Wood Apple', 'Jackfruit', 'Lychee (seasonal)',
        'Amla (Indian Gooseberry)', 'Ber (Indian Jujube)',
        'Bael Fruit', 'Karonda', 'Sitaphal (Sugar-apple)'
      ];
  return filterAllergies(fruits, allergies);
};

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
  } else if (dietaryPreference === 'pure-jain') {
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
