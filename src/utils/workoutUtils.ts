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
      return dayOfWeek === 0;
    case '3-4':
      return dayOfWeek === 0 || dayOfWeek === 4;
    case '1-2':
    default:
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
    return replaceNumbers(baseReps, 1.5);
  }
  if (fitnessGoal === 'muscle-gain') {
    return replaceNumbers(baseReps, 1.2);
  }
  return baseReps;
};

export const getWorkoutExercises = (exercises: ExerciseType[], fitnessGoal: string): ExerciseType[] => {
  const baseExercises = getRandomItems(exercises, 4);
  return baseExercises.map(exercise => ({
    ...exercise,
    reps: adjustRepsForGoal(exercise.reps, fitnessGoal)
  }));
};

export const progressWorkout = (currentExercises: ExerciseType[], nextLevelExercises: ExerciseType[]): ExerciseType[] => {
  return [...currentExercises.slice(2), ...nextLevelExercises.slice(0, 3)];
};
