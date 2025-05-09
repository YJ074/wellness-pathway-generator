
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
};

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
