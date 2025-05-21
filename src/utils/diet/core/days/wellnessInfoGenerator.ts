
import {
  generateHairNutrients,
  generateSkinNutrients,
  generateFatLossNotes,
  generatePCOSFriendlyNotes,
  generateHerbalRecommendations
} from '../../wellness/wellnessRecommendations';
import { generateRegionalNote } from '../../regional/regionalRecommendations';
import { getCheatMealGuidance, getMealTimingTips } from '../../helpers/mealTimingsHelper';
import { WellnessGoal } from '../../types';

interface WellnessInfoParams {
  dayIndex: number;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    midMorningSnack?: string;
    eveningSnack?: string;
  };
  wellnessGoals: WellnessGoal[];
  region?: string;
  fitnessGoal: string;
  totalCalories: number;
  weight: number;
  gender?: string;
}

export function generateDayWellnessInfo(params: WellnessInfoParams) {
  const {
    dayIndex,
    meals,
    wellnessGoals,
    region,
    fitnessGoal,
    totalCalories,
    weight,
    gender
  } = params;
  
  const { breakfast, lunch, dinner } = meals;
  const dayNumber = dayIndex + 1;
  
  // Check if this is a cheat meal day
  const cheatMealInfo = getCheatMealGuidance(dayNumber, fitnessGoal);
  
  // Get meal timing tips based on fitness goal
  const timingTips = getMealTimingTips(fitnessGoal);
  
  // Calculate approximate calories for the day
  // Gender-specific adjustments to base calories
  const calories = totalCalories;
  
  // Recommended water intake (in liters)
  // Adjusted based on gender and weight following scientific guidelines
  const waterIntake = gender === 'male' ? 
    Math.max(2.5, Math.round((weight * 0.033) * 10) / 10) : 
    Math.max(2.0, Math.round((weight * 0.03) * 10) / 10);
  
  // Generate wellness goal specific information
  const hairNutrients = wellnessGoals.includes('hair-fall-control' as WellnessGoal) ? 
    generateHairNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
    
  const skinNutrients = wellnessGoals.includes('glowing-skin' as WellnessGoal) ? 
    generateSkinNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
    
  const fatLossNotes = (wellnessGoals.includes('fat-loss' as WellnessGoal) || wellnessGoals.includes('inch-loss' as WellnessGoal)) ? 
    generateFatLossNotes(`${breakfast} ${lunch} ${dinner}`, calories) : undefined;
  
  // Generate PCOS/PCOD friendly notes if that goal is selected
  const pcosFriendlyNotes = wellnessGoals.includes('pcos-pcod-friendly' as WellnessGoal) ?
    generatePCOSFriendlyNotes(`${breakfast} ${lunch} ${dinner}`) : undefined;
    
  const herbalRecommendations = generateHerbalRecommendations(dayIndex, wellnessGoals);
  
  // Generate regional note if applicable
  const regionalNote = region ? generateRegionalNote(region) : undefined;
  
  return {
    calories,
    water: waterIntake,
    hairNutrients,
    skinNutrients,
    fatLossNotes,
    pcosFriendlyNotes,
    herbalRecommendations,
    regionalNote,
    cheatMealInfo,
    timingTips
  };
}
