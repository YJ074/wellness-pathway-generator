
import { ExerciseType, WorkoutDay } from '../types/workout';
import { BODYWEIGHT_EXERCISES, WARMUP_EXERCISES, COOLDOWN_STRETCHES } from '../data/exercises';
import { 
  getInitialLevel, 
  shouldBeRestDay, 
  getRandomItems, 
  getWorkoutExercises,
  progressWorkout 
} from './workoutUtils';

export const generateWorkoutPlan = (exerciseFrequency: string, fitnessGoal: string): WorkoutDay[] => {
  let workoutDays: WorkoutDay[] = [];
  const level = getInitialLevel(exerciseFrequency);
  let currentExercises = BODYWEIGHT_EXERCISES[level];
  
  for (let day = 1; day <= 75; day++) {
    if (shouldBeRestDay(day, exerciseFrequency)) {
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
      const nextLevel = level === 'beginner' ? 'intermediate' : 'advanced';
      currentExercises = progressWorkout(currentExercises, BODYWEIGHT_EXERCISES[nextLevel]);
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
