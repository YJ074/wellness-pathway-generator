import { ExerciseType, FitnessLevel } from '../types/workout';

export const getInitialLevel = (exerciseFrequency: string): FitnessLevel => {
  switch (exerciseFrequency) {
    case '3-4':
    case '5+':
      return 'intermediate';
    case '1-2':
    default:
      return 'beginner';
  }
};

export const shouldBeRestDay = (day: number, exerciseFrequency: string): boolean => {
  const dayOfWeek = day % 7;
  switch (exerciseFrequency) {
    case '5+':
      // Only 1 rest day per week for advanced users
      return dayOfWeek === 0;
    case '3-4':
      // 2 rest days per week for intermediate users
      return dayOfWeek === 0 || dayOfWeek === 4;
    case '1-2':
    case 'sedentary':
    default:
      // 3 rest days per week for beginners (and add deload week every 4th week)
      if (Math.floor(day / 28) === 1 && day % 28 >= 1 && day % 28 <= 7) {
        // Every 4th week (days 29-35, 57-63) is a deload week with extra rest
        return dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
      }
      return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5;
  }
};

export const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const adjustRepsForGoal = (baseReps: string, fitnessGoal: string): string => {
  const extractNumbers = (rep: string) => rep.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  
  const roundNumber = (num: number) => Math.round(num);

  const replaceNumbers = (rep: string, multiplier: number) => {
    return rep.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      return roundNumber(num * multiplier).toString();
    });
  };

  if (fitnessGoal === 'endurance') {
    // For endurance, increase reps by 50%
    return replaceNumbers(baseReps, 1.5);
  }
  if (fitnessGoal === 'muscle-gain') {
    // For muscle gain, increase intensity by 20% but keep reps moderate
    return replaceNumbers(baseReps, 1.2);
  }
  if (fitnessGoal === 'weight-loss') {
    // For weight loss, slightly increase reps for calorie burn
    return replaceNumbers(baseReps, 1.3);
  }
  return baseReps;
};

export const getWorkoutExercises = (exercises: ExerciseType[], fitnessGoal: string): ExerciseType[] => {
  // Apply progressive overload based on day number and fitness goal
  const baseExercises = getRandomItems(exercises, 4);
  return baseExercises.map(exercise => ({
    ...exercise,
    reps: adjustRepsForGoal(exercise.reps, fitnessGoal)
  }));
};

export const progressWorkout = (currentExercises: ExerciseType[], nextLevelExercises: ExerciseType[]): ExerciseType[] => {
  // Progressive overload - gradually increase difficulty by mixing exercises
  return [...currentExercises.slice(2), ...nextLevelExercises.slice(0, 3)];
};

// New function to adjust workout difficulty based on the week number
export const adjustDifficultyForWeek = (exercises: ExerciseType[], weekNumber: number): ExerciseType[] => {
  const progressionMultiplier = 1 + (weekNumber * 0.05); // 5% increase per week
  
  // Apply the progression multiplier to the reps/duration
  return exercises.map(exercise => ({
    ...exercise,
    reps: exercise.reps.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      // Cap the progression at 2x the initial value
      const adjusted = Math.min(num * progressionMultiplier, num * 2);
      return Math.round(adjusted).toString();
    })
  }));
};
