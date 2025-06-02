
import { ExerciseType, WorkoutDay } from '../types/workout';
import { BODYWEIGHT_EXERCISES, WARMUP_EXERCISES, COOLDOWN_STRETCHES } from '../data/exercises';
import { 
  getInitialLevel, 
  shouldBeRestDay, 
  getRandomItems, 
  getWorkoutExercises,
  progressWorkout,
  adjustDifficultyForWeek,
  getGenderSpecificFocusArea
} from './workoutUtils';
import { WorkoutPlan } from '../components/wellness/types';

export const generateWorkoutPlan = (
  exerciseFrequency: string, 
  fitnessGoal: string, 
  gender?: string
): WorkoutPlan => {
  console.log(`Generating workout plan: Exercise frequency=${exerciseFrequency}, Fitness goal=${fitnessGoal}, Gender=${gender}`);
  let workoutDays: WorkoutDay[] = [];
  const level = getInitialLevel(exerciseFrequency);
  console.log(`Initial fitness level determined: ${level}`);
  
  let currentExercises = BODYWEIGHT_EXERCISES[level];
  
  for (let day = 1; day <= 75; day++) {
    // Set recovery days on day 7, 14, 21, etc.
    if (day % 7 === 0) {
      workoutDays.push({
        day,
        isRestDay: true,
        warmup: [],
        exercises: [],
        cooldown: [],
        focusArea: "Recovery & Regeneration",
        progression: `Week ${Math.floor((day - 1) / 7) + 1} - Recovery Day`
      });
      continue;
    }

    // Also determine rest days based on exercise frequency and gender
    if (shouldBeRestDay(day, exerciseFrequency, gender)) {
      workoutDays.push({
        day,
        isRestDay: true,
        warmup: [],
        exercises: [],
        cooldown: [],
        focusArea: "Rest & Recovery",
        progression: `Week ${Math.floor((day - 1) / 7) + 1} - Rest Day`
      });
      continue;
    }

    // Calculate the week number (1-indexed)
    const weekNumber = Math.floor((day - 1) / 7) + 1;
    
    // Progress difficulty every 7-10 days (introduce variations)
    const shouldProgressVariations = (day % 9 === 0 || day % 10 === 0);
    const isDeloadWeek = (weekNumber % 4 === 0);
    
    if (shouldProgressVariations && !isDeloadWeek) {
      const nextLevel = level === 'beginner' ? 'intermediate' : 'advanced';
      currentExercises = progressWorkout(currentExercises, BODYWEIGHT_EXERCISES[nextLevel]);
    }
    
    // Get base exercises with gender consideration
    let exercises = getWorkoutExercises(currentExercises, fitnessGoal, gender);
    
    // Determine focus area based on rotation and gender
    const dayInWeek = day % 7; 
    const focusArea = getGenderSpecificFocusArea(dayInWeek, fitnessGoal, gender);
    
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
        description: ex.description + " (Lighter intensity for recovery)"
      }));
    } else {
      // Apply progressive overload based on week number and gender
      exercises = adjustDifficultyForWeek(exercises, weekNumber, gender);
      progression += ` - ${getProgressionPhase(day, gender)}`;
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

  console.log(`Generated ${workoutDays.length} workout days with gender-specific considerations`);
  
  // Return a proper WorkoutPlan object
  return { days: workoutDays };
};

// Helper function to determine progression phase based on day number and gender
function getProgressionPhase(day: number, gender?: string): string {
  // First determine where in the progression cycle this day falls
  const progressionCycle = Math.floor((day - 1) / 10) % 3;
  
  if (progressionCycle === 0) {
    return gender === 'female' ? "Foundation & Form Phase" : "Foundation Phase";
  }
  if (progressionCycle === 1) {
    return gender === 'female' ? "Building & Endurance Phase" : "Building Phase";
  }
  return gender === 'female' ? "Strength & Power Phase" : "Intensity Phase";
}
