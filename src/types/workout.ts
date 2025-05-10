
export type ExerciseType = {
  name: string;
  reps: string;
  description?: string; // Changed from required to optional
  imageUrl?: string; 
  tutorialUrl?: string;
  tutorialUrlHindi?: string;
};

export type WorkoutDay = {
  day: number;
  isRestDay: boolean;
  warmup: string[];
  exercises: ExerciseType[];
  cooldown: string[];
  focusArea?: string; // New field for weekly focus area
  progression?: string; // New field for progression information
};

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
