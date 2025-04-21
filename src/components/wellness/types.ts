
export interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  mobileNumber: string;  // New field
  dietaryPreference: 'lacto-vegetarian' | 'lacto-ovo-vegetarian' | 'pure-vegetarian' | 'jain' | 'sattvic' | 'non-vegetarian';
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
      imageUrl?: string;  // Optional image URL for exercise illustration
      tutorialUrl?: string; // Optional tutorial URL in English
      tutorialUrlHindi?: string; // Optional tutorial URL in Hindi
    }>;
    cooldown: string[];
  }>;
}
