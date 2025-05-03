
import { ExerciseType, WorkoutDay } from '../types/workout';
import { BODYWEIGHT_EXERCISES, WARMUP_EXERCISES, COOLDOWN_STRETCHES } from '../data/exercises';
import { 
  getInitialLevel, 
  shouldBeRestDay, 
  getRandomItems, 
  getWorkoutExercises,
  progressWorkout,
  adjustDifficultyForWeek
} from './workoutUtils';
import { WorkoutPlan } from '../components/wellness/types';

export const generateWorkoutPlan = (exerciseFrequency: string, fitnessGoal: string): WorkoutPlan => {
  console.log(`Generating workout plan: Exercise frequency=${exerciseFrequency}, Fitness goal=${fitnessGoal}`);
  let workoutDays: WorkoutDay[] = [];
  const level = getInitialLevel(exerciseFrequency);
  console.log(`Initial fitness level determined: ${level}`);
  
  let currentExercises = BODYWEIGHT_EXERCISES[level];
  
  for (let day = 1; day <= 75; day++) {
    // Determine if this should be a rest day based on exercise frequency
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

    // Calculate the week number (1-indexed)
    const weekNumber = Math.floor((day - 1) / 7) + 1;
    
    // Progress difficulty every 2 weeks (except during deload weeks)
    const isDeloadWeek = (weekNumber % 4 === 0);
    
    if (weekNumber % 2 === 0 && !isDeloadWeek) {
      const nextLevel = level === 'beginner' ? 'intermediate' : 'advanced';
      currentExercises = progressWorkout(currentExercises, BODYWEIGHT_EXERCISES[nextLevel]);
    }
    
    // Get base exercises
    let exercises = getWorkoutExercises(currentExercises, fitnessGoal);
    
    // Apply progressive overload based on week number (unless it's a deload week)
    if (!isDeloadWeek) {
      exercises = adjustDifficultyForWeek(exercises, weekNumber);
    } else {
      // During deload week, reduce volume/intensity by ~30%
      exercises = exercises.map(ex => ({
        ...ex,
        reps: ex.reps.replace(/\d+/g, (match) => {
          const num = parseInt(match);
          return Math.max(Math.round(num * 0.7), 1).toString();
        }),
        description: ex.description + " (Deload week: lower intensity)"
      }));
    }

    // Create the workout day
    workoutDays.push({
      day,
      isRestDay: false,
      warmup: getRandomItems(WARMUP_EXERCISES, 3),
      exercises,
      cooldown: getRandomItems(COOLDOWN_STRETCHES, 3)
    });
  }

  console.log(`Generated ${workoutDays.length} workout days`);
  
  // Return a proper WorkoutPlan object
  return { days: workoutDays };
};
