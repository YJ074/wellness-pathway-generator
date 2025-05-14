
import { filterAllergies } from '../../helpers/allergyHelpers';
import { enrichWithPrebiotics } from '../../helpers/prebioticProbioticHelper';
import { removeDuplicateFoodItems } from '../../helpers/deduplication';
import { getHealthBenefit } from '../../helpers/healthBenefitsHelper';
import { getStandardFruitPortion, isBigFruit } from '../../helpers/portionHelpers';
import { getDryFruits } from '../../data/dryFruits';

export const generateMidMorningSnack = (
  dayIndex: number,
  snacks: string[],
  fruits: string[],
  isWeightLoss: boolean,
  allergies?: string
) => {
  // Use prime number-based offsets for unique results
  const snackIndex = (dayIndex * 7 + 5) % snacks.length;
  const fruitIndex = (dayIndex * 11 + 3) % fruits.length;
  const dryFruitIndex = dayIndex % 4;
  
  // Get a seasonal fruit option
  const seasonalFruit = fruits[fruitIndex];
  
  // Determines type of snack based on day pattern for variety
  const snackType = dayIndex % 4;
  
  let snack = '';
  
  switch (snackType) {
    case 0:
      // FRUIT-BASED SNACK
      // Simple fruit option with correctly calculated portion
      const fruitPortion = getStandardFruitPortion(seasonalFruit);
      
      // Simple fruit-based snack with minimal processing
      // Removed the addition of kala namak and kali mirch
      snack = `${seasonalFruit} ${fruitPortion}`;
      
      // Apply deduplication to fruit snack
      snack = removeDuplicateFoodItems(snack);
      
      // Add health benefit
      const fruitHealthBenefit = getHealthBenefit(seasonalFruit);
      snack += ` - (${fruitHealthBenefit})`;
      break;
      
    case 1:
      // PROTEIN-RICH SNACK
      // For mid-morning, focus on protein-rich snacks to maintain satiety
      const proteinSnacks = [
        'Roasted Chana (¼ cup)',
        'Boiled Sprouts (½ katori)',
        'Paneer Cubes (4-5 small pieces)',
        'Masala Chaas (1 glass)',
        'Soya Chaat (½ katori)',
        'Curd with Cucumber (¾ katori)',
        'Boiled Moong Dal (½ katori)'
      ];
      
      const proteinSnack = proteinSnacks[dayIndex % proteinSnacks.length];
      snack = proteinSnack;
      
      // For weight loss, modify portions
      if (isWeightLoss) {
        snack = snack.replace('(¼ cup)', '(3 tbsp)')
                     .replace('(½ katori)', '(⅓ katori)')
                     .replace('(4-5 small pieces)', '(3-4 small pieces)')
                     .replace('(¾ katori)', '(½ katori)');
      }
      
      // Apply deduplication to protein snack
      snack = removeDuplicateFoodItems(snack);
      
      // Add health benefit
      const proteinHealthBenefit = getHealthBenefit(proteinSnack);
      snack += ` - (${proteinHealthBenefit})`;
      break;
      
    case 2:
      // TRADITIONAL INDIAN SNACK
      const indianSnack = snacks[snackIndex];
      
      // Portion control based on weight loss goal
      if (isWeightLoss) {
        snack = `Small portion of ${indianSnack} (½ serving)`;
      } else {
        snack = `${indianSnack} (1 small serving)`;
      }
      
      // Apply deduplication to traditional snack
      snack = removeDuplicateFoodItems(snack);
      
      // Add health benefit - THIS CALL NEEDS THE ARGUMENT
      const traditionalHealthBenefit = getHealthBenefit(indianSnack);
      snack += ` - (${traditionalHealthBenefit})`;
      break;
      
    case 3:
      // DRY FRUITS & NUTS
      // Get dry fruits from our specialized module
      const dryFruits = getDryFruits();
      
      // Create a mix of 2 types of dry fruits for variety and nutrition
      const dryFruit1 = dryFruits[dryFruitIndex % dryFruits.length];
      const dryFruit2 = dryFruits[(dryFruitIndex + 3) % dryFruits.length]; // Offset to ensure different selections
      
      // Adjust portion based on weight loss goal
      if (isWeightLoss) {
        snack = `Mixed dry fruits: ${dryFruit1} (4-5) and ${dryFruit2} (4-5)`;
      } else {
        snack = `Mixed dry fruits: ${dryFruit1} (6-7) and ${dryFruit2} (6-7)`;
      }
      
      // Apply deduplication to dry fruit snack
      snack = removeDuplicateFoodItems(snack);
      
      // Add health benefit
      const dryFruitsMix = `${dryFruit1} and ${dryFruit2}`;
      const dryFruitHealthBenefit = getHealthBenefit(dryFruitsMix);
      snack += ` - (${dryFruitHealthBenefit})`;
      break;
  }
  
  // Filter allergies if specified
  if (allergies) {
    const filteredSnacks = filterAllergies([snack], allergies);
    snack = filteredSnacks[0] || 'Apple (1 medium) - safe alternative';
  }
  
  return snack;
};
