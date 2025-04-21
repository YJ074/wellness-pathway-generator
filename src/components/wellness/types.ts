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
  heightFeet?: string;   // new: optional, for feet input
  heightInches?: string; // new: optional, for inches input
}

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }>;
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
