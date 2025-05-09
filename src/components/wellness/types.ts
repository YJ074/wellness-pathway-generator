
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
    snacks: string;
    wellnessGoals?: WellnessGoal[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
  }>;
  bmi?: number;
  bmr?: number;
  bmiCategory?: string;
  dailyCalories?: number;
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
  dietaryPreference: DietaryPreference; // Changed from string to DietaryPreference
  fitnessGoal: string;
  exerciseFrequency: string;
  wellnessGoals: WellnessGoal[];
  region?: string;
  allergies?: string;
  has_muscular_build?: boolean;
  includeWorkoutPlan?: boolean;
}

export interface WorkoutPlan {
  days: Array<{
    day: number;
    isRestDay: boolean;
    warmup: string[]; // Required
    exercises: Array<{  // Required
      name: string;
      reps: string;
      description?: string;
    }>;
    cooldown: string[]; // Required
  }>;
}
