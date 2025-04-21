export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string; // in cm
  weight: string;
  mobileNumber: string;
  gender: 'male' | 'female' | 'other';
  dietaryPreference: 'lacto-vegetarian' | 'lacto-ovo-vegetarian' | 'pure-vegetarian' | 'jain' | 'sattvic' | 'non-vegetarian' | 'eggitarian';
  fitnessGoal: string;
  exerciseFrequency: string;
  heightFeet?: string;   // optional, for feet input
  heightInches?: string; // optional, for inches input
  has_muscular_build?: boolean; // NEW: Athletic build self-identification
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
  }>;
  bmi?: number;
  bmiCategory?: string;
  bmr?: number;
  dailyCalories?: number;
}

export interface WorkoutPlan {
  days: Array<{
    day: number;
    isRestDay: boolean;
    warmup: string[];
    exercises: Array<{
      name: string;
      reps: string;
      description: string;
      imageUrl?: string;
      tutorialUrl?: string;
      tutorialUrlHindi?: string;
    }>;
    cooldown: string[];
  }>;
}
