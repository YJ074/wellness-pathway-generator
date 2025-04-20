export type ExerciseType = {
  name: string;
  reps: string;
  description: string;
  imageUrl: string;
  tutorialUrl?: string;
};

export type WorkoutDay = {
  day: number;
  isRestDay: boolean;
  warmup: string[];
  exercises: ExerciseType[];
  cooldown: string[];
};

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
