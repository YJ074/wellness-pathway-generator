
import { DietaryPreference } from '../../types';
import { filterAllergies } from '../../helpers/allergyHelpers';

// Get morning breakfast options based on dietary preference
export const getMorningBreakfastOptions = (
  dietaryPreference: DietaryPreference,
  allergies?: string
) => {
  // Common breakfast options across all diets
  const commonBreakfasts = {
    grains: [
      'wheat poha',
      'upma',
      'semolina upma',
      'vegetable daliya',
      'vegetable oats',
      'masala oats'
    ],
    indian: [
      'plain paratha',
      'stuffed vegetable paratha',
      'methi paratha',
      'palak paratha',
      'vegetable idli',
      'multigrain dosa',
      'vegetable uttapam',
      'moong dal cheela'
    ]
  };

  let breakfastOptions = {
    grains: [...commonBreakfasts.grains],
    indian: [...commonBreakfasts.indian],
    protein: []
  };

  // Add dietary preference specific options
  switch (dietaryPreference) {
    case 'vegan':
      breakfastOptions.protein = [
        'tofu scramble',
        'sprouts cheela',
        'soy milk with nuts',
        'almond milk with chia seeds',
        'vegan smoothie bowl'
      ];
      break;
    case 'pure-vegetarian':
    case 'sattvic':
      breakfastOptions.protein = [
        'paneer bhurji',
        'curd with fruits',
        'buttermilk',
        'fruit and yogurt smoothie',
        'nut milk with fruits'
      ];
      break;
    case 'lacto-vegetarian':
      breakfastOptions.protein = [
        'paneer bhurji',
        'curd with fruits',
        'buttermilk',
        'fruit and yogurt smoothie',
        'nut milk with fruits',
        'cottage cheese and vegetable sandwich'
      ];
      break;
    case 'lacto-ovo-vegetarian':
      breakfastOptions.protein = [
        'paneer bhurji',
        'curd with fruits',
        'buttermilk',
        'fruit and yogurt smoothie',
        'boiled eggs',
        'egg white omelette with vegetables',
        'vegetable egg scramble'
      ];
      break;
    case 'non-vegetarian':
      breakfastOptions.protein = [
        'egg bhurji',
        'boiled eggs',
        'egg white omelette with vegetables',
        'vegetable egg scramble',
        'grilled chicken breast',
        'chicken keema',
        'fish curry'
      ];
      break;
    case 'jain':
      // Remove items that are not allowed in Jain diet
      breakfastOptions.grains = breakfastOptions.grains.filter(
        item => !item.includes('onion') && !item.includes('garlic')
      );
      breakfastOptions.indian = breakfastOptions.indian.filter(
        item => !item.includes('onion') && !item.includes('garlic')
      );
      breakfastOptions.protein = [
        'curd with fruits (without root vegetables)',
        'dry fruit smoothie',
        'nut milk with fruits'
      ];
      break;
    default:
      // Default to lacto-vegetarian
      breakfastOptions.protein = [
        'paneer bhurji',
        'curd with fruits',
        'buttermilk',
        'fruit and yogurt smoothie'
      ];
  }

  // Filter for allergies if specified
  if (allergies) {
    breakfastOptions.grains = filterAllergies(breakfastOptions.grains, allergies);
    breakfastOptions.indian = filterAllergies(breakfastOptions.indian, allergies);
    breakfastOptions.protein = filterAllergies(breakfastOptions.protein, allergies);
  }

  return breakfastOptions;
};

// Export existing functions for backward compatibility
export const getEggBreakfastOptions = () => {
  return [
    'egg bhurji',
    'boiled eggs with toast',
    'egg white omelette with vegetables',
    'vegetable egg scramble'
  ];
};
