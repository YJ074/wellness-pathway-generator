
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

    // Also determine rest days based on exercise frequency
    if (shouldBeRestDay(day, exerciseFrequency)) {
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
    
    // Get base exercises
    let exercises = getWorkoutExercises(currentExercises, fitnessGoal);
    
    // Determine focus area based on rotation to ensure all fitness components are included
    const dayInWeek = day % 7; 
    const focusArea = determineFocusArea(dayInWeek, fitnessGoal);
    
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
      // Apply progressive overload based on week number
      exercises = adjustDifficultyForWeek(exercises, weekNumber);
      progression += ` - ${getProgressionPhase(day)}`;
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

// Rotate through all fitness components throughout the week
function determineFocusArea(dayInWeek: number, fitnessGoal: string): string {
  // A complete rotation that covers core, mobility, strength, and yoga balance
  switch (dayInWeek) {
    case 1: return "Core & Stability";
    case 2: return "Mobility & Flexibility";
    case 3: return "Strength & Power";
    case 4: return "Yoga & Balance";
    case 5: return "Functional Movement";
    case 6: return fitnessGoal === 'weight-loss' ? "HIIT & Cardio" : "Endurance";
    default: return "Recovery & Regeneration";
  }
}

// Helper function to determine progression phase based on day number
function getProgressionPhase(day: number): string {
  // First determine where in the progression cycle this day falls
  const progressionCycle = Math.floor((day - 1) / 10) % 3;
  
  if (progressionCycle === 0) return "Foundation Phase";
  if (progressionCycle === 1) return "Building Phase";
  return "Intensity Phase";
}
