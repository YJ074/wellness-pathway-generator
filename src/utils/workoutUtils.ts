
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

export const shouldBeRestDay = (day: number, exerciseFrequency: string, gender?: string, age?: number): boolean => {
  const dayOfWeek = day % 7;
  
  // Age-based rest day adjustments
  const ageNumber = age ? parseInt(age.toString()) : 30;
  let ageRestMultiplier = 1;
  
  if (ageNumber >= 50) {
    ageRestMultiplier = 1.5; // 50% more rest days for 50+
  } else if (ageNumber >= 40) {
    ageRestMultiplier = 1.3; // 30% more rest days for 40-49
  } else if (ageNumber >= 60) {
    ageRestMultiplier = 2; // Double rest days for 60+
  }
  
  // Gender-specific rest day patterns
  // Females may benefit from slightly more recovery due to hormonal cycles
  const isFemale = gender === 'female';
  
  switch (exerciseFrequency) {
    case '5+':
      // Only 1 rest day per week for advanced users, adjusted for age
      if (ageNumber >= 50) {
        return dayOfWeek === 0 || dayOfWeek === 4; // Add mid-week rest for 50+
      }
      return dayOfWeek === 0;
    case '3-4':
      // 2 rest days per week for intermediate users
      // Females get an additional rest option during certain weeks
      if (isFemale && Math.floor(day / 7) % 4 === 2) {
        return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6;
      }
      // Age adjustments for intermediate level
      if (ageNumber >= 50) {
        return dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 5;
      }
      return dayOfWeek === 0 || dayOfWeek === 4;
    case '1-2':
    case 'sedentary':
    default:
      // 3 rest days per week for beginners, more for older adults
      if (ageNumber >= 50) {
        return dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6;
      }
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

export const adjustRepsForGoal = (baseReps: string, fitnessGoal: string, gender?: string, age?: number): string => {
  const extractNumbers = (rep: string) => rep.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  
  const roundNumber = (num: number) => Math.round(num);

  const replaceNumbers = (rep: string, multiplier: number) => {
    return rep.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      return roundNumber(num * multiplier).toString();
    });
  };

  // Age-based adjustments
  const ageNumber = age ? parseInt(age.toString()) : 30;
  let ageMultiplier = 1;
  
  if (ageNumber >= 60) {
    ageMultiplier = 0.7; // 30% reduction for 60+
  } else if (ageNumber >= 50) {
    ageMultiplier = 0.8; // 20% reduction for 50-59
  } else if (ageNumber >= 40) {
    ageMultiplier = 0.9; // 10% reduction for 40-49
  } else if (ageNumber < 25) {
    ageMultiplier = 1.1; // 10% increase for under 25
  }

  // Gender-specific adjustments
  let genderMultiplier = 1;
  if (gender === 'male') {
    genderMultiplier = 1.1; // Males typically can handle 10% more volume
  } else if (gender === 'female') {
    genderMultiplier = 0.95; // Females may start with slightly lower volume but progress faster
  }

  const combinedMultiplier = ageMultiplier * genderMultiplier;

  if (fitnessGoal === 'endurance') {
    // For endurance, increase reps by 50%
    return replaceNumbers(baseReps, 1.5 * combinedMultiplier);
  }
  if (fitnessGoal === 'muscle-gain') {
    // For muscle gain, males get more volume, females focus on form
    const multiplier = gender === 'male' ? 1.3 : 1.15;
    return replaceNumbers(baseReps, multiplier * ageMultiplier);
  }
  if (fitnessGoal === 'weight-loss') {
    // For weight loss, slightly increase reps for calorie burn
    return replaceNumbers(baseReps, 1.3 * combinedMultiplier);
  }
  return replaceNumbers(baseReps, combinedMultiplier);
};

export const getWorkoutExercises = (exercises: ExerciseType[], fitnessGoal: string, gender?: string, age?: number): ExerciseType[] => {
  // Apply progressive overload based on day number and fitness goal
  const baseExercises = getRandomItems(exercises, 4);
  return baseExercises.map(exercise => ({
    ...exercise,
    reps: adjustRepsForGoal(exercise.reps, fitnessGoal, gender, age)
  }));
};

export const progressWorkout = (currentExercises: ExerciseType[], nextLevelExercises: ExerciseType[]): ExerciseType[] => {
  // Progressive overload - gradually increase difficulty by mixing exercises
  return [...currentExercises.slice(2), ...nextLevelExercises.slice(0, 3)];
};

// New function to adjust workout difficulty based on the week number, gender, and age
export const adjustDifficultyForWeek = (exercises: ExerciseType[], weekNumber: number, gender?: string, age?: number): ExerciseType[] => {
  // Age-based progression rates
  const ageNumber = age ? parseInt(age.toString()) : 30;
  let ageProgressionRate = 0.05; // 5% base increase per week
  
  if (ageNumber >= 60) {
    ageProgressionRate = 0.02; // 2% increase per week for 60+
  } else if (ageNumber >= 50) {
    ageProgressionRate = 0.03; // 3% increase per week for 50-59
  } else if (ageNumber >= 40) {
    ageProgressionRate = 0.04; // 4% increase per week for 40-49
  } else if (ageNumber < 25) {
    ageProgressionRate = 0.06; // 6% increase per week for under 25
  }
  
  // Gender-specific progression rates
  let genderProgressionRate = ageProgressionRate;
  
  if (gender === 'female') {
    // Females often show better progression in endurance and flexibility
    genderProgressionRate = ageProgressionRate * 1.2; // 20% faster progression
  } else if (gender === 'male') {
    // Males typically progress more in strength-based exercises
    genderProgressionRate = ageProgressionRate * 1.1; // 10% faster progression
  }
  
  const progressionMultiplier = 1 + (weekNumber * genderProgressionRate);
  
  // Apply the progression multiplier to the reps/duration
  return exercises.map(exercise => ({
    ...exercise,
    reps: exercise.reps.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      // Cap the progression at different levels based on age
      const maxMultiplier = ageNumber >= 50 ? 1.5 : ageNumber >= 40 ? 1.7 : 2;
      const adjusted = Math.min(num * progressionMultiplier, num * maxMultiplier);
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

// New function to get age-appropriate exercise modifications
export const getAgeAppropriateModifications = (age?: number): string[] => {
  const ageNumber = age ? parseInt(age.toString()) : 30;
  const modifications: string[] = [];
  
  if (ageNumber >= 60) {
    modifications.push("Focus on seated or supported exercises when needed");
    modifications.push("Prioritize balance and fall prevention exercises");
    modifications.push("Use chair support for standing exercises");
    modifications.push("Reduce jumping and high-impact movements");
  } else if (ageNumber >= 50) {
    modifications.push("Include extra joint mobility warm-up");
    modifications.push("Consider low-impact alternatives for jumping exercises");
    modifications.push("Focus on maintaining bone density with weight-bearing exercises");
  } else if (ageNumber >= 40) {
    modifications.push("Pay extra attention to proper form and technique");
    modifications.push("Include additional stretching and flexibility work");
  }
  
  return modifications;
};
