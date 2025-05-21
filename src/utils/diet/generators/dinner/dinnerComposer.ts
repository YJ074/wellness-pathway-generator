
import { getPortionSize, getBreadPortionSize } from '../../helpers/portionHelpers';
import { enrichWithPrebiotics, enrichWithProbiotics } from '../../helpers/prebioticProbioticHelper';
import { hasFoodBeenUsedToday } from '../../helpers/deduplication';

interface DinnerIngredients {
  protein1: string;
  protein2: string;
  veggie1: string;
  veggie2: string;
}

/**
 * Composes a complete dinner meal with appropriate portions based on dietary goals
 */
export function composeDinnerMeal(
  dayIndex: number,
  ingredients: DinnerIngredients,
  isWeightLoss: boolean,
  isProteinFocus: boolean,
  isMale: boolean
): string {
  const { protein1, protein2, veggie1, veggie2 } = ingredients;
  
  // Define portion sizes based on dietary goals using Indian measurements
  // More scientific approach that considers satiety and macro distribution
  const curryPortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'curry',
    {
      // Gender-specific portions
      standard: isMale ? '1 katori' : '¾ katori',
      weightLoss: isMale ? '¾ katori' : '½ katori',
      proteinFocus: isMale ? '1½ katori' : '1 katori'
    }
  );
  
  // Maintain vegetable portion regardless of goal - vegetables are nutrient-dense and low-calorie
  const veggiePortion = isMale ? '1½ katori' : '1 katori'; // Gender-adjusted
  
  // Get roti count adjusted by gender
  const rotiCount = getBreadPortionSize(isWeightLoss, isProteinFocus, isMale);
  
  // Rice portion varies by goal - higher for muscle gain, lower for weight loss
  const ricePortion = getPortionSize(
    isWeightLoss,
    isProteinFocus,
    'rice',
    {
      // Gender-specific portions
      standard: isMale ? '¾ katori' : '½ katori',
      weightLoss: isMale ? '⅓ katori' : '¼ katori',
      proteinFocus: isMale ? '1 katori' : '½ katori'
    }
  );
  
  // Always explicitly include both roti and rice options in dinner for Indian diet context
  let main = `${protein1} and ${protein2} curry (${curryPortion}), ${veggie1} and ${veggie2} sabzi (${veggiePortion}), ${rotiCount} rotis (palm-sized) OR ${ricePortion} brown rice`;
  
  // Only include buttermilk if we haven't used dairy products in other meals
  // Check for dairy terms in existing meals
  const dairyTerms = ['dahi', 'yogurt', 'curd', 'buttermilk', 'chaas', 'milk', 'paneer'];
  const hasDairyInMeals = dairyTerms.some(term => hasFoodBeenUsedToday(dayIndex, term));
  
  if (!hasDairyInMeals) {
    main += `, chaas (1 glass)`;
  }
  
  // For days that need additional prebiotics, add them to dinner
  // Prebiotics support gut microbiome and enhance probiotic effectiveness
  if (dayIndex % 3 === 0) {
    main = enrichWithPrebiotics(main, dayIndex, true);
  }
  
  return main;
}
