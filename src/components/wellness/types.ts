
import { WorkoutDay } from '../../types/workout';
import { WellnessGoal } from '../../utils/diet/types';

export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string; // in cm
  weight: string;
  mobileNumber: string;
  gender: 'male' | 'female' | 'other';
  dietaryPreference: 'lacto-vegetarian' | 'lacto-ovo-vegetarian' | 'pure-vegetarian' | 'jain' | 'sattvic' | 'non-vegetarian';
  fitnessGoal: string;
  exerciseFrequency: string;
  heightFeet?: string;   // optional, for feet input
  heightInches?: string; // optional, for inches input
  has_muscular_build: boolean; // Muscular build self-identification
  allergies?: string; // New field to support allergies/exclusions
  wellnessGoals?: WellnessGoal[]; // New field for specific wellness goals
}

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    midMorningSnack?: string;
    lunch: string;
    eveningSnack?: string;
    dinner: string;
    snacks?: string; // legacy field
    calories?: number;
    water?: number;
    bmi?: number;
    bmiCategory?: string;
    wellnessGoals?: WellnessGoal[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
  }>;
  bmi?: number;
  bmiCategory?: string;
  bmr?: number;
  dailyCalories?: number;
}

export interface WorkoutPlan {
  days: WorkoutDay[];
}
