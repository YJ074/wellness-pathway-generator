
// Extend with additional properties as needed
// Re-export existing types for backward compatibility
export * from '@/utils/diet/types';

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks?: string;
    midMorningSnack?: string;
    eveningSnack?: string;
    calories?: number;
    water?: number;
    bmi?: number;
    bmiCategory?: string;
    wellnessGoals?: string[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    pcosFriendlyNotes?: string;
    herbalRecommendations?: string[];
    regionalNote?: string;
    mealTimings?: {
      breakfast: string;
      midMorningSnack: string;
      lunch: string;
      eveningSnack: string;
      dinner: string;
    };
    cheatMealInfo?: string | null;
    timingTips?: string;
  }>;
  bmi?: number;
  bmiCategory?: string;
  bmr?: number;
  dailyCalories?: number;
}

export interface WorkoutPlan {
  days: WorkoutDay[];
}

// Import and re-export the WorkoutDay type to ensure consistency
import { WorkoutDay } from '@/types/workout';
export type { WorkoutDay };

export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  heightFeet?: string;
  heightInches?: string;
  weight: string;
  mobileNumber: string;
  gender: string;
  dietaryPreference: string;
  fitnessGoal: string;
  exerciseFrequency: string;
  has_muscular_build: boolean;
  includeWorkoutPlan?: boolean;
  wellnessGoals: string[];
  region?: string;
  allergies?: string;
}
