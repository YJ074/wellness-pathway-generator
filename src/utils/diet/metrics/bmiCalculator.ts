
// BMI and related calculations

// Calculate BMI
export const calculateBMI = (weight: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return weight / (heightM * heightM);
};

// Get BMI category - Updated to consider exercise frequency and fitness goals
export const getBMICategory = (bmi: number, exerciseFrequency: string, fitnessGoal: string): string => {
  // For highly active individuals or those focused on muscle gain, adjust BMI interpretation
  const isHighlyActive = exerciseFrequency === '5+' || exerciseFrequency === '3-4';
  const isFocusedOnMuscle = fitnessGoal === 'muscle-gain';
  
  if (isHighlyActive || isFocusedOnMuscle) {
    // Allow for higher BMI thresholds for athletic individuals
    if (bmi < 18.5) return 'underweight';
    if (bmi < 27) return 'normal'; // Increased upper threshold for "normal" 
    if (bmi < 32) return 'athletic build'; // New category for muscular individuals
    return 'high BMI'; // More neutral term than "obese"
  } else {
    // Standard BMI categories for less active individuals
    if (bmi < 18.5) return 'underweight';
    if (bmi < 25) return 'normal';
    if (bmi < 30) return 'overweight';
    return 'obese';
  }
};

// Calculate BMR using Mifflin-St Jeor equation
export const calculateBMR = (weight: number, heightCm: number, age: number, gender: string): number => {
  // For males: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age + 5
  // For females: BMR = 10 × weight (kg) + 6.25 × height (cm) – 5 × age – 161
  const baseBMR = 10 * weight + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
};

// Adjust calories based on fitness goal, muscular build overrides BMI-based loss logic
export const calculateDailyCalories = (bmr: number, fitnessGoal: string, wellnessGoals: string[] = [], hasMuscularBuild?: boolean): number => {
  // If fat-loss or inch-loss is selected, adjust calories
  const isFatLossGoal = wellnessGoals.includes('fat-loss') || wellnessGoals.includes('inch-loss');
  
  // If muscular build, IGNORE BMI and user is NOT forced into weight loss
  if (isFatLossGoal && !hasMuscularBuild) {
    // For fat loss goals, restrict to 1200-1600 calories
    return Math.max(Math.min(bmr - 500, 1600), 1200);
  }
  
  switch (fitnessGoal) {
    case 'weight-loss':
      // If user has muscular build, don't restrict calories by BMI
      return hasMuscularBuild ? bmr : Math.max(bmr - 500, 1200);
    case 'muscle-gain':
      return bmr + 400;
    case 'endurance':
      return bmr + 150;
    case 'maintenance':
    default:
      return bmr;
  }
};
