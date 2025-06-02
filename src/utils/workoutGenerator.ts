
import { ExerciseType, WorkoutDay } from '../types/workout';
import { BODYWEIGHT_EXERCISES, WARMUP_EXERCISES, COOLDOWN_STRETCHES } from '../data/exercises';
import { 
  getInitialLevel, 
  shouldBeRestDay, 
  getRandomItems, 
  getWorkoutExercises,
  progressWorkout,
  adjustDifficultyForWeek,
  getGenderSpecificFocusArea,
  getAgeAppropriateModifications
} from './workoutUtils';
import { WorkoutPlan } from '../components/wellness/types';

export const generateWorkoutPlan = (
  exerciseFrequency: string, 
  fitnessGoal: string, 
  gender?: string,
  age?: string | number
): WorkoutPlan => {
  console.log(`Generating workout plan: Exercise frequency=${exerciseFrequency}, Fitness goal=${fitnessGoal}, Gender=${gender}, Age=${age}`);
  let workoutDays: WorkoutDay[] = [];
  const level = getInitialLevel(exerciseFrequency);
  const ageNumber = age ? parseInt(age.toString()) : undefined;
  console.log(`Initial fitness level determined: ${level}, Age: ${ageNumber}`);
  
  let currentExercises = BODYWEIGHT_EXERCISES[level];
  
  // Get age-appropriate modifications
  const ageModifications = getAgeAppropriateModifications(ageNumber);
  
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

    // Also determine rest days based on exercise frequency, gender, and age
    if (shouldBeRestDay(day, exerciseFrequency, gender, ageNumber)) {
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
    // Age-based progression adjustments
    const progressionInterval = ageNumber && ageNumber >= 50 ? 12 : ageNumber && ageNumber >= 40 ? 10 : 9;
    const shouldProgressVariations = (day % progressionInterval === 0 || day % (progressionInterval + 1) === 0);
    const isDeloadWeek = (weekNumber % 4 === 0);
    
    if (shouldProgressVariations && !isDeloadWeek) {
      const nextLevel = level === 'beginner' ? 'intermediate' : 'advanced';
      currentExercises = progressWorkout(currentExercises, BODYWEIGHT_EXERCISES[nextLevel]);
    }
    
    // Get base exercises with gender and age consideration
    let exercises = getWorkoutExercises(currentExercises, fitnessGoal, gender, ageNumber);
    
    // Determine focus area based on rotation and gender
    const dayInWeek = day % 7; 
    const focusArea = getGenderSpecificFocusArea(dayInWeek, fitnessGoal, gender);
    
    // Determine progression information
    let progression = `Week ${weekNumber}`;
    if (isDeloadWeek) {
      progression += " - Deload Week";
      // During deload week, reduce volume/intensity by different amounts based on age
      const deloadReduction = ageNumber && ageNumber >= 50 ? 0.5 : ageNumber && ageNumber >= 40 ? 0.6 : 0.7;
      exercises = exercises.map(ex => ({
        ...ex,
        reps: ex.reps.replace(/\d+/g, (match) => {
          const num = parseInt(match);
          return Math.max(Math.round(num * deloadReduction), 1).toString();
        }),
        description: ex.description + " (Lighter intensity for recovery)"
      }));
    } else {
      // Apply progressive overload based on week number, gender, and age
      exercises = adjustDifficultyForWeek(exercises, weekNumber, gender, ageNumber);
      progression += ` - ${getProgressionPhase(day, gender, ageNumber)}`;
    }

    // Add age-specific modifications to exercise descriptions
    if (ageModifications.length > 0) {
      exercises = exercises.map((ex, index) => ({
        ...ex,
        description: index === 0 && ageModifications.length > 0 ? 
          `${ex.description || ''} ${ageModifications[0]}`.trim() : ex.description
      }));
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

  console.log(`Generated ${workoutDays.length} workout days with gender and age-specific considerations`);
  
  // Return a proper WorkoutPlan object
  return { days: workoutDays };
};

// Helper function to determine progression phase based on day number, gender, and age
function getProgressionPhase(day: number, gender?: string, age?: number): string {
  // First determine where in the progression cycle this day falls
  const ageNumber = age ? parseInt(age.toString()) : 30;
  
  // Adjust progression cycle length based on age
  const cycleLength = ageNumber >= 50 ? 15 : ageNumber >= 40 ? 12 : 10;
  const progressionCycle = Math.floor((day - 1) / cycleLength) % 3;
  
  if (progressionCycle === 0) {
    if (ageNumber >= 50) {
      return gender === 'female' ? "Foundation & Mobility Phase" : "Foundation & Stability Phase";
    }
    return gender === 'female' ? "Foundation & Form Phase" : "Foundation Phase";
  }
  if (progressionCycle === 1) {
    if (ageNumber >= 50) {
      return gender === 'female' ? "Building & Balance Phase" : "Building & Strength Phase";
    }
    return gender === 'female' ? "Building & Endurance Phase" : "Building Phase";
  }
  if (ageNumber >= 50) {
    return gender === 'female' ? "Maintenance & Wellness Phase" : "Maintenance & Power Phase";
  }
  return gender === 'female' ? "Strength & Power Phase" : "Intensity Phase";
}
