
export type ExerciseType = {
  name: string;
  reps: string;
  description: string;
  imageUrl?: string; // Changed from required to optional
  tutorialUrl?: string;
  tutorialUrlHindi?: string; // Added to support Indian language video links
};

export type WorkoutDay = {
  day: number;
  isRestDay: boolean;
  warmup: string[];
  exercises: ExerciseType[];
  cooldown: string[];
};

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
