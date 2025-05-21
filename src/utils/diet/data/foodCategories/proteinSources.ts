
import { DietaryPreference } from '../../types';
import { filterAllergies } from '../allergyHelpers';

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
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with millets and pulse combinations
      'Ragi Dosa', 'Bajra Khichdi with Mixed Pulses', 'Quinoa with Lentils',
      'Foxtail Millet Upma with Chana', 'Pearl Millet Porridge with Nuts',
      'Little Millet Pulao with Beans', 'Barnyard Millet with Sprouts',
      'Jowar Roti with Dal Mix', 'Amaranth Porridge with Seeds',
      'Kodo Millet with Roasted Peanuts', 'Multi-Millet Mix with Tofu',
      'Proso Millet with Lentil Sprouts', 'Brown Rice and Bean Mix'
    ],
    'lacto-ovo-vegetarian': [
      'Paneer', 'Eggs', 'Toor Dal', 'Chana Dal', 'Moong Dal',
      'Curd', 'Buttermilk', 'Besan (Gram Flour)', 'Egg Whites',
      'Mixed Sprouts', 'Rajma', 'Chana', 'Peanuts', 
      'Channa Flour Roti', 'Yogurt', 'Boiled Eggs', 'Egg Bhurji',
      'Kala Chana', 'White Beans', 'Urad Dal', 'Moth Beans',
      'Milk Protein', 'Protein-Enriched Milk', 'Egg Curry',
      'Black-Eyed Peas', 'Kulthi Dal', 'Val Dal', 'Horse Gram',
      'Lima Beans', 'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with millets and pulse combinations
      'Ragi Dosa with Egg', 'Bajra Khichdi with Mixed Pulses',
      'Quinoa with Lentils and Egg Whites', 'Foxtail Millet with Chana',
      'Pearl Millet Porridge with Greek Yogurt', 'Little Millet with Beans',
      'Barnyard Millet with Egg Scramble', 'Jowar with Dal Mix',
      'Amaranth Porridge with Eggs', 'Kodo Millet with Roasted Peanuts',
      'Multi-Millet Mix with Cottage Cheese', 'Proso Millet with Lentils'
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
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with millets and pulse combinations
      'Ragi Idli with Lentil Chutney', 'Bajra Khichdi with Mixed Pulses',
      'Quinoa with Masoor Dal', 'Foxtail Millet Upma with Chana',
      'Pearl Millet Porridge with Milk', 'Little Millet Pulao with Sprouts',
      'Barnyard Millet Uttapam with Paneer', 'Jowar Roti with Dal Mix',
      'Amaranth Porridge with Nuts', 'Kodo Millet with Yogurt',
      'Multi-Millet Mix with Tofu', 'Proso Millet with Soya Granules'
    ],
    'vegan': [
      'Soya Chunks', 'Tofu', 'Mixed Sprouts', 'Chana Dal', 'Moong Dal',
      'Rajma', 'Toor Dal', 'Masoor Dal', 'Urad Dal', 'Sattu',
      'Peanuts', 'Besan (Gram Flour)', 'Chana', 'Whole Moong',
      'Channa Flour Roti', 'Lentil Soup', 'Flax Seeds', 'Chia Seeds',
      'Kala Chana', 'White Beans', 'Moth Beans', 'Quinoa',
      'Soya Milk', 'Peanut Butter', 'Almond Milk', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram', 'Lima Beans',
      'Cowpeas', 'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with millets and pulse combinations
      'Ragi Dosa with Lentil Spread', 'Bajra Khichdi with Mixed Pulses',
      'Quinoa with Tofu Crumble', 'Foxtail Millet Upma with Chana',
      'Pearl Millet Porridge with Plant Milk', 'Little Millet with Beans',
      'Barnyard Millet Khichdi with Sprouts', 'Jowar Roti with Vegan Dal Mix',
      'Amaranth Porridge with Seeds', 'Kodo Millet with Roasted Peanuts',
      'Multi-Millet Mix with Tempeh', 'Proso Millet with Lentil Sprouts'
    ],
    'jain': [
      // Strict Jain: NO sprouts, NO root vegetables, NO eggs, NO non-veg
      'Paneer (without animal rennet)', 'Curd', 'Buttermilk', 'Toor Dal', 
      'Moong Dal', 'Masoor Dal', 'Urad Dal', 'Chana Dal', 
      'Besan (Gram Flour)', 'Chickpeas', 'Rajma',
      'White Beans', 'Channa Flour Roti', 'Flax Seeds', 'Peanuts',
      'Dry Fruits (assorted and soaked)', 'Milk Solids (Khoya)',
      'Protein-Enriched Milk', 'Yogurt', 'Almond Milk',
      'Sunflower Seeds', 'Pumpkin Seeds', 'Val Dal',
      'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with millets and allowed pulses
      'Amaranth Ladoo with Nuts', 'Jowar Roti with Urad Dal',
      'Bajra Khichdi with Dal', 'Barnyard Millet Porridge with Milk',
      'Kodo Millet Mix with Paneer', 'Little Millet with Toor Dal',
      'Multi-Millet Bhakri with White Beans', 'Foxtail Millet with Flax Seeds',
      'Quinoa with Masoor Dal', 'Proso Millet with Rajma'
    ],
    'sattvic': [
      'Paneer', 'Moong Dal', 'Toor Dal', 'Masoor Dal', 'Urad Dal',
      'Mixed Sprouts', 'Buttermilk', 'Peanuts', 'Whole Moong',
      'Dried Fruits (in moderation)', 'Sprouted Grains', 'Cow Milk',
      'Fresh Yogurt', 'Ghee', 'Organic Honey', 'Fresh Cottage Cheese',
      'Kheer', 'White Beans', 'Channa Flour Roti', 'Amaranth',
      'Soaked and Peeled Almonds', 'Protein-Enriched Milk', 
      'Yogurt', 'Organic Soy Milk', 'Black-Eyed Peas',
      'Green Pigeon Peas', 'Split Pigeon Peas',
      // Added more variety with sattvic millets and pulse combinations
      'Ragi Porridge with Milk', 'Bajra Roti with Moong Dal',
      'Barnyard Millet Kheer', 'Foxtail Millet with Fresh Yogurt',
      'Little Millet Upma with Sprouts', 'Jowar Dosa with Coconut Chutney',
      'Pearl Millet with Ghee and Jaggery', 'Quinoa with Fresh Herbs',
      'Multi-Millet Khichdi with Ghee', 'Amaranth Ladoo with Dried Fruits',
      'Kodo Millet with Cow Milk', 'Proso Millet with Toor Dal'
    ],
    'non-vegetarian': [
      'Eggs', 'Chicken (local variety)', 'Sardines', 'Indian Mackerel',
      'Local Fish Varieties', 'Paneer', 'Dal Makhani', 'Rajma',
      'Chana', 'Moong Dal', 'Toor Dal', 'Mixed Sprouts',
      'Lean Mutton', 'Farm-Raised Prawns', 'Rohu Fish',
      'Grilled Chicken Tikka', 'Egg Whites', 'Yogurt',
      'Tandoori Fish', 'Free-Range Eggs',
      'Egg Protein', 'Chicken Breast', 'Black-Eyed Peas',
      'Kulthi Dal', 'Val Dal', 'Horse Gram',
      // Added more variety with millets and pulse combinations
      'Ragi Dosa with Egg Masala', 'Bajra Khichdi with Chicken',
      'Quinoa with Fish Fillet', 'Foxtail Millet Biryani with Chicken',
      'Pearl Millet with Egg Bhurji', 'Little Millet Pulao with Prawns',
      'Barnyard Millet with Sardines', 'Jowar Roti with Egg Curry',
      'Amaranth Mix with Boiled Eggs', 'Kodo Millet with Fish Curry',
      'Multi-Millet Mix with Chicken Tikka', 'Proso Millet with Mutton'
    ]
  };
  return filterAllergies(proteins[dietaryPreference] || proteins['lacto-vegetarian'], allergies);
};
