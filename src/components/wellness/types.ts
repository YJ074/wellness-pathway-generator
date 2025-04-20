
export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  dietaryPreference: 'vegetarian' | 'eggitarian' | 'vegan';
  fitnessGoal: string;
  exerciseFrequency: string;
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
    }>;
    cooldown: string[];
  }>;
}
