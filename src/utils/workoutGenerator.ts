
type ExerciseType = {
  name: string;
  reps: string;
  description: string;
};

type WorkoutDay = {
  day: number;
  isRestDay: boolean;
  warmup: string[];
  exercises: ExerciseType[];
  cooldown: string[];
};

const BODYWEIGHT_EXERCISES = {
  beginner: [
    { name: "Push-ups from knees", reps: "5-8 reps", description: "Modified push-ups with knees on the ground" },
    { name: "Wall push-ups", reps: "8-10 reps", description: "Push-ups against a wall" },
    { name: "Assisted squats", reps: "10 reps", description: "Squats while holding onto a chair for support" },
    { name: "Standing crunches", reps: "10 reps", description: "Crunches performed while standing" },
    { name: "Incline push-ups", reps: "8 reps", description: "Push-ups with hands elevated on a stable surface" }
  ],
  intermediate: [
    { name: "Regular push-ups", reps: "10-12 reps", description: "Standard push-ups" },
    { name: "Bodyweight squats", reps: "15 reps", description: "Regular squats without support" },
    { name: "Mountain climbers", reps: "20 reps", description: "Alternating knee drives in plank position" },
    { name: "Plank hold", reps: "30 seconds", description: "Hold plank position with proper form" },
    { name: "Lunges", reps: "10 each leg", description: "Forward lunges alternating legs" }
  ],
  advanced: [
    { name: "Diamond push-ups", reps: "12-15 reps", description: "Push-ups with hands forming a diamond shape" },
    { name: "Jump squats", reps: "20 reps", description: "Explosive squats with jump at the top" },
    { name: "Burpees", reps: "12 reps", description: "Full burpee with push-up" },
    { name: "Plank to downward dog", reps: "10 reps", description: "Alternating between plank and downward dog positions" },
    { name: "Walking lunges", reps: "20 steps", description: "Continuous lunges walking forward" }
  ]
};

const WARMUP_EXERCISES = [
  "Arm circles (10 forward, 10 backward)",
  "Shoulder rolls (10 each direction)",
  "Hip circles (10 each direction)",
  "Jumping jacks (30 seconds)",
  "High knees (30 seconds)",
  "Leg swings (10 each leg)"
];

const COOLDOWN_STRETCHES = [
  "Child's pose (30 seconds)",
  "Cat-cow stretch (10 repetitions)",
  "Hamstring stretch (30 seconds each leg)",
  "Quad stretch (30 seconds each leg)",
  "Shoulder stretch (30 seconds each side)"
];

export const generateWorkoutPlan = (exerciseFrequency: string, fitnessGoal: string): WorkoutDay[] => {
  let workoutDays: WorkoutDay[] = [];
  const level = getInitialLevel(exerciseFrequency);
  let currentExercises = BODYWEIGHT_EXERCISES[level];
  
  for (let day = 1; day <= 75; day++) {
    // Determine if it's a rest day
    const isRestDay = shouldBeRestDay(day, exerciseFrequency);
    
    if (isRestDay) {
      workoutDays.push({
        day,
        isRestDay: true,
        warmup: [],
        exercises: [],
        cooldown: []
      });
      continue;
    }

    // Progress difficulty every 2 weeks
    if (day % 14 === 0) {
      currentExercises = progressWorkout(currentExercises, fitnessGoal);
    }

    workoutDays.push({
      day,
      isRestDay: false,
      warmup: getRandomItems(WARMUP_EXERCISES, 3),
      exercises: getWorkoutExercises(currentExercises, fitnessGoal),
      cooldown: getRandomItems(COOLDOWN_STRETCHES, 3)
    });
  }

  return workoutDays;
};

const getInitialLevel = (exerciseFrequency: string): 'beginner' | 'intermediate' | 'advanced' => {
  switch (exerciseFrequency) {
    case '3-4':
    case '5+':
      return 'intermediate';
    case '1-2':
      return 'beginner';
    default:
      return 'beginner';
  }
};

const shouldBeRestDay = (day: number, exerciseFrequency: string): boolean => {
  const dayOfWeek = day % 7;
  switch (exerciseFrequency) {
    case '5+':
      return dayOfWeek === 0; // Only Sunday rest
    case '3-4':
      return dayOfWeek === 0 || dayOfWeek === 4; // Sunday and Thursday rest
    case '1-2':
      return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5; // Sunday, Wednesday, Friday rest
    default:
      return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5; // Same as 1-2
  }
};

const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getWorkoutExercises = (exercises: ExerciseType[], fitnessGoal: string): ExerciseType[] => {
  const baseExercises = getRandomItems(exercises, 4);
  
  // Adjust reps based on fitness goal
  return baseExercises.map(exercise => ({
    ...exercise,
    reps: adjustRepsForGoal(exercise.reps, fitnessGoal)
  }));
};

const adjustRepsForGoal = (baseReps: string, fitnessGoal: string): string => {
  if (fitnessGoal === 'endurance') {
    return baseReps.replace(/\d+/g, (match) => (parseInt(match) * 1.5).toString());
  }
  if (fitnessGoal === 'muscle-gain') {
    return baseReps.replace(/\d+/g, (match) => (parseInt(match) * 1.2).toString());
  }
  return baseReps;
};

const progressWorkout = (currentExercises: ExerciseType[], fitnessGoal: string): ExerciseType[] => {
  // Increase difficulty by mixing in more challenging exercises
  const nextLevel = currentExercises === BODYWEIGHT_EXERCISES.beginner 
    ? BODYWEIGHT_EXERCISES.intermediate 
    : BODYWEIGHT_EXERCISES.advanced;
  
  return [...currentExercises.slice(2), ...nextLevel.slice(0, 3)];
};

