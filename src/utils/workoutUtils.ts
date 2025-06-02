
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

export const shouldBeRestDay = (day: number, exerciseFrequency: string, gender?: string): boolean => {
  const dayOfWeek = day % 7;
  
  // Gender-specific rest day patterns
  // Females may benefit from slightly more recovery due to hormonal cycles
  const isFemale = gender === 'female';
  
  switch (exerciseFrequency) {
    case '5+':
      // Only 1 rest day per week for advanced users
      return dayOfWeek === 0;
    case '3-4':
      // 2 rest days per week for intermediate users
      // Females get an additional rest option during certain weeks
      if (isFemale && Math.floor(day / 7) % 4 === 2) {
        return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6;
      }
      return dayOfWeek === 0 || dayOfWeek === 4;
    case '1-2':
    case 'sedentary':
    default:
      // 3 rest days per week for beginners
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

export const adjustRepsForGoal = (baseReps: string, fitnessGoal: string, gender?: string): string => {
  const extractNumbers = (rep: string) => rep.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  
  const roundNumber = (num: number) => Math.round(num);

  const replaceNumbers = (rep: string, multiplier: number) => {
    return rep.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      return roundNumber(num * multiplier).toString();
    });
  };

  // Gender-specific adjustments
  let genderMultiplier = 1;
  if (gender === 'male') {
    genderMultiplier = 1.1; // Males typically can handle 10% more volume
  } else if (gender === 'female') {
    genderMultiplier = 0.95; // Females may start with slightly lower volume but progress faster
  }

  if (fitnessGoal === 'endurance') {
    // For endurance, increase reps by 50%
    return replaceNumbers(baseReps, 1.5 * genderMultiplier);
  }
  if (fitnessGoal === 'muscle-gain') {
    // For muscle gain, males get more volume, females focus on form
    const multiplier = gender === 'male' ? 1.3 : 1.15;
    return replaceNumbers(baseReps, multiplier);
  }
  if (fitnessGoal === 'weight-loss') {
    // For weight loss, slightly increase reps for calorie burn
    return replaceNumbers(baseReps, 1.3 * genderMultiplier);
  }
  return replaceNumbers(baseReps, genderMultiplier);
};

export const getWorkoutExercises = (exercises: ExerciseType[], fitnessGoal: string, gender?: string): ExerciseType[] => {
  // Apply progressive overload based on day number and fitness goal
  const baseExercises = getRandomItems(exercises, 4);
  return baseExercises.map(exercise => ({
    ...exercise,
    reps: adjustRepsForGoal(exercise.reps, fitnessGoal, gender)
  }));
};

export const progressWorkout = (currentExercises: ExerciseType[], nextLevelExercises: ExerciseType[]): ExerciseType[] => {
  // Progressive overload - gradually increase difficulty by mixing exercises
  return [...currentExercises.slice(2), ...nextLevelExercises.slice(0, 3)];
};

// New function to adjust workout difficulty based on the week number and gender
export const adjustDifficultyForWeek = (exercises: ExerciseType[], weekNumber: number, gender?: string): ExerciseType[] => {
  // Gender-specific progression rates
  let progressionRate = 0.05; // 5% base increase per week
  
  if (gender === 'female') {
    // Females often show better progression in endurance and flexibility
    progressionRate = 0.06; // 6% increase per week
  } else if (gender === 'male') {
    // Males typically progress more in strength-based exercises
    progressionRate = 0.055; // 5.5% increase per week
  }
  
  const progressionMultiplier = 1 + (weekNumber * progressionRate);
  
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

// New function to get gender-specific focus areas
export const getGenderSpecificFocusArea = (dayInWeek: number, fitnessGoal: string, gender?: string): string => {
  switch (dayInWeek) {
    case 1: 
      return gender === 'female' ? "Core & Pelvic Floor Strength" : "Core & Stability";
    case 2: 
      return "Mobility & Flexibility";
    case 3: 
      return gender === 'female' ? "Functional Strength" : "Strength & Power";
    case 4: 
      return "Yoga & Balance";
    case 5: 
      return "Functional Movement";
    case 6: 
      if (fitnessGoal === 'weight-loss') {
        return gender === 'female' ? "HIIT & Metabolic Training" : "HIIT & Cardio";
      }
      return "Endurance";
    default: 
      return "Recovery & Regeneration";
  }
};
