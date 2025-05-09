
export type DietaryPreference =
  | 'lacto-vegetarian'
  | 'lacto-ovo-vegetarian'
  | 'pure-vegetarian'
  | 'jain'
  | 'sattvic'
  | 'non-vegetarian'
  | 'pure-jain';

export type WellnessGoal = 
  | 'hair-fall-control'
  | 'glowing-skin'
  | 'fat-loss'
  | 'inch-loss'
  | 'general-wellness';

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks?: string;
    midMorningSnack?: string;
    eveningSnack?: string;
    wellnessGoals?: WellnessGoal[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
    calories?: number;
    water?: number;
    regionalNote?: string;
    bmi?: number;
    bmiCategory?: string;
  }>;
  // Add these properties to the DietPlan interface
  bmi?: number;
  bmiCategory?: string;
  bmr?: number;
  dailyCalories?: number;
}

// Import the WorkoutDay type from the workout types file
import { WorkoutDay } from '../../types/workout';

// Define WorkoutPlan interface
export interface WorkoutPlan {
  days: WorkoutDay[];
}

export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  heightFeet?: string;
  heightInches?: string;
  weight: string;
  mobileNumber: string;
  gender: 'male' | 'female' | 'other';
  dietaryPreference: string;
  fitnessGoal: string;
  exerciseFrequency: string;
  wellnessGoals: WellnessGoal[];
  region?: string;
  allergies?: string;
  has_muscular_build?: boolean;
  includeWorkoutPlan?: boolean; // Add this new field
}
