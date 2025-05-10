
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
        cooldown: [],
        focusArea: "Recovery",
        progression: "Rest Day"
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
    
    // Determine focus area based on week pattern
    const focusArea = determineFocusArea(weekNumber, fitnessGoal, isDeloadWeek);
    
    // Determine progression information
    let progression = `Week ${weekNumber}`;
    if (isDeloadWeek) {
      progression += " - Deload Week";
      // During deload week, reduce volume/intensity by ~30%
      exercises = exercises.map(ex => ({
        ...ex,
        reps: ex.reps.replace(/\d+/g, (match) => {
          const num = parseInt(match);
          return Math.max(Math.round(num * 0.7), 1).toString();
        }),
        description: ex.description + " (Deload week: lower intensity)"
      }));
    } else {
      // Apply progressive overload based on week number
      exercises = adjustDifficultyForWeek(exercises, weekNumber);
      progression += ` - ${getProgressionPhase(weekNumber)}`;
    }

    // Create the workout day
    workoutDays.push({
      day,
      isRestDay: false,
      warmup: getRandomItems(WARMUP_EXERCISES, 3),
      exercises,
      cooldown: getRandomItems(COOLDOWN_STRETCHES, 3),
      focusArea,
      progression
    });
  }

  console.log(`Generated ${workoutDays.length} workout days`);
  
  // Return a proper WorkoutPlan object
  return { days: workoutDays };
};

// Helper function to determine focus area based on week number and fitness goal
function determineFocusArea(weekNumber: number, fitnessGoal: string, isDeloadWeek: boolean): string {
  if (isDeloadWeek) return "Recovery & Regeneration";
  
  // Each week emphasizes different fitness aspects in a cycle
  const weekRotation = weekNumber % 3;
  
  if (fitnessGoal === 'weight-loss') {
    if (weekRotation === 0) return "Endurance";
    if (weekRotation === 1) return "HIIT";
    return "Strength";
  }
  
  if (fitnessGoal === 'muscle-gain') {
    if (weekRotation === 0) return "Strength";
    if (weekRotation === 1) return "Hypertrophy";
    return "Power";
  }
  
  // Default/maintenance goal
  if (weekRotation === 0) return "Flexibility & Mobility";
  if (weekRotation === 1) return "Strength & Stability";
  return "Endurance & Balance";
}

// Helper function to determine progression phase
function getProgressionPhase(weekNumber: number): string {
  const cycleWeek = weekNumber % 4;
  if (cycleWeek === 1) return "Foundation Phase";
  if (cycleWeek === 2) return "Build Phase";
  return "Peak Phase";
}
