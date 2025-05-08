
import { DietPlan, FormData } from '@/components/wellness/types';
import { DietaryPreference, WellnessGoal } from './types';
import { 
  getProteinSources, 
  getGrainSources, 
  getVegetableSources, 
  getFruitSources, 
  getSnackSources,
  limitSoyaInDietDays,
} from './foodSources';
import {
  generateBreakfast as origGenerateBreakfast,
  generateLunch as origGenerateLunch,
  generateDinner as origGenerateDinner,
  generateSnacks,
  generateMidMorningSnack as origGenerateMidMorningSnack,
  generateEveningSnack as origGenerateEveningSnack
} from './mealGenerators';

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
export const calculateDailyCalories = (bmr: number, fitnessGoal: string, wellnessGoals: WellnessGoal[] = [], hasMuscularBuild?: boolean): number => {
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

// Generate hair nutrients information based on the meal
const generateHairNutrients = (meal: string): string => {
  const hairNutrientOptions = [
    "Rich in biotin and protein for hair strength",
    "Contains zinc and iron to prevent hair fall",
    "Provides B vitamins essential for hair growth",
    "Supplies omega-3 fatty acids for scalp health",
    "Contains silica for hair elasticity and strength",
    "Rich in vitamin E to improve blood circulation to scalp",
    "Provides copper to maintain hair color",
    "Contains selenium to protect hair follicles from oxidative damage",
    "Rich in vitamin A for sebum production to moisturize scalp",
    "Contains magnesium to reduce cortisol and prevent hair loss",
    "Provides keratin-building amino acids for strong hair shaft",
    "Rich in folic acid to promote cell regeneration for hair growth"
  ];
  
  // Seed based on meal content to get consistent but different results
  const seedValue = Array.from(meal).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hairNutrientOptions[seedValue % hairNutrientOptions.length];
};

// Generate skin nutrients information based on the meal
const generateSkinNutrients = (meal: string): string => {
  const skinNutrientOptions = [
    "Contains antioxidants that protect skin from damage",
    "Rich in vitamin C for collagen production",
    "Provides vitamin E for skin repair and moisture",
    "Contains zinc to regulate oil production and reduce acne",
    "Rich in beta-carotene for natural skin glow",
    "Supplies omega-3 fatty acids for skin elasticity",
    "Contains selenium to protect against sun damage",
    "Provides hydration and essential minerals for skin health",
    "Contains vitamin A to boost cell turnover for fresh skin",
    "Rich in polyphenols to reduce inflammation and redness",
    "Supplies biotin for healthy fatty acids in the skin",
    "Contains sulfur compounds to strengthen skin's protective barrier",
    "Rich in lycopene to protect against UV damage"
  ];
  
  // Seed based on meal content to get consistent but different results
  const seedValue = Array.from(meal).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return skinNutrientOptions[seedValue % skinNutrientOptions.length];
};

// Generate fat loss notes based on the meal
const generateFatLossNotes = (meal: string, calories: number): string => {
  const fatLossOptions = [
    "High fiber content increases satiety and reduces cravings",
    "Balanced protein-to-carb ratio for sustained energy and fat burning",
    "Contains thermogenic ingredients to boost metabolism",
    "Low glycemic index foods to prevent insulin spikes",
    "Healthy fats for hormone balance and improved fat metabolism",
    "Rich in nutrients that support the body's fat burning processes",
    "Designed to keep blood sugar stable and reduce fat storage",
    "Contains metabolism-boosting spices to enhance calorie burning",
    "Fiber-rich to promote digestive health and reduce bloating",
    "Incorporates anti-inflammatory foods to reduce water retention",
    "High protein content to preserve muscle while burning fat",
    "Strategic carb timing to support workout recovery without fat gain"
  ];
  
  // Seed based on meal content to get consistent but different results
  const seedValue = Array.from(meal).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `${fatLossOptions[seedValue % fatLossOptions.length]}. Portion controlled at ${calories} calories.`;
};

// Generate herbal recommendations
const generateHerbalRecommendations = (dayIndex: number, wellnessGoals: WellnessGoal[]): string[] => {
  const recommendations: string[] = [];
  
  // Base recommendations for everyone
  const baseOptions = [
    "Warm lemon water before breakfast",
    "Green tea after meals",
    "Tulsi tea in the evening",
    "Cumin-coriander-fennel tea after lunch",
    "Cinnamon water throughout the day",
    "Mint and lemon water before meals",
    "Ginger tea mid-morning",
    "Cardamom infused water throughout the day",
    "Fennel seed water after meals",
    "Holy basil (Tulsi) tea before bedtime"
  ];
  
  // Add base recommendation
  recommendations.push(baseOptions[dayIndex % baseOptions.length]);
  
  // Add goal-specific recommendations
  if (wellnessGoals.includes('hair-fall-control')) {
    const hairOptions = [
      "Brahmi or bhringraj tea in the evening",
      "Amla juice mixed with water before breakfast",
      "Fenugreek seed water in the morning",
      "Hibiscus tea in the afternoon",
      "Curry leaves and coconut oil head massage",
      "Triphala water before bedtime",
      "Ashwagandha tea in the evening"
    ];
    recommendations.push(hairOptions[dayIndex % hairOptions.length]);
  }
  
  if (wellnessGoals.includes('glowing-skin')) {
    const skinOptions = [
      "Aloe vera juice in the morning",
      "Turmeric milk before bedtime",
      "Rose water in your regular water for hydration",
      "Saffron soaked in milk at night",
      "Manjistha tea in the afternoon",
      "Neem and tulsi tea mid-morning",
      "Cucumber and mint detox water"
    ];
    recommendations.push(skinOptions[dayIndex % skinOptions.length]);
  }
  
  if (wellnessGoals.includes('fat-loss') || wellnessGoals.includes('inch-loss')) {
    const weightOptions = [
      "Jeera water before meals",
      "Apple cider vinegar with warm water before breakfast",
      "Triphala water before bedtime",
      "Ginger-lemon tea in the morning",
      "Cinnamon-honey water before breakfast",
      "Fenugreek seed water on empty stomach",
      "Ajwain water before meals",
      "Garcinia cambogia tea mid-morning",
      "Green coffee mid-afternoon",
      "Dandelion root tea for detoxification"
    ];
    recommendations.push(weightOptions[dayIndex % weightOptions.length]);
  }
  
  // Return unique recommendations
  return [...new Set(recommendations)];
};

// Generate regional cultural notes
const generateRegionalNote = (region?: string): string | undefined => {
  if (!region) return undefined;
  
  const notes: Record<string, string[]> = {
    'north': [
      "This North Indian meal uses ghee for authentic flavor while keeping portions controlled.",
      "Incorporates traditional Punjabi spices that aid digestion and boost metabolism.",
      "Features classic North Indian protein sources like rajma and paneer for sustained energy.",
      "Uses traditional cooking techniques from Punjab that preserve nutrients while adding flavor."
    ],
    'south': [
      "Includes fermented foods common in South Indian cuisine that support gut health.",
      "Uses coconut in moderation, a staple in South Indian cooking rich in medium-chain fatty acids.",
      "Features traditional South Indian spices like curry leaves and mustard seeds with medicinal properties.",
      "Incorporates rice varieties native to South India that have lower glycemic index."
    ],
    'east': [
      "Uses mustard oil, rich in monounsaturated fats, common in Eastern Indian cooking.",
      "Features Bengali-style preparation techniques that maximize the nutritional profile.",
      "Incorporates seasonal greens used abundantly in Eastern Indian cuisine.",
      "Balanced with traditional Eastern Indian spice blends beneficial for metabolism."
    ],
    'west': [
      "Uses jaggery instead of sugar, a healthier sweetener common in Western Indian cuisine.",
      "Features traditional Gujarati/Maharashtrian cooking methods that enhance flavors without excessive fat.",
      "Incorporates Western Indian spices known for their digestive benefits.",
      "Balanced with protein sources traditionally used in Western Indian meals."
    ],
    'central': [
      "Features whole grains native to Central India, known for their high fiber content.",
      "Uses traditional spice blends from Madhya Pradesh that aid digestion.",
      "Incorporates cooking methods that preserve nutrients while enhancing flavors.",
      "Balanced with local protein sources traditional to Central Indian cuisine."
    ],
    'northeast': [
      "Includes herbs and spices native to Northeast India with medicinal properties.",
      "Features fermentation methods traditional to Northeast Indian cuisine that enhance probiotic content.",
      "Uses minimal oil cooking techniques common in Northeastern tribal cooking.",
      "Incorporates indigenous grains and vegetables high in micronutrients."
    ]
  };
  
  const regionLower = region.toLowerCase();
  return notes[regionLower] ? notes[regionLower][Math.floor(Math.random() * notes[regionLower].length)] : undefined;
};

// Re-export new allergy-aware wrappers:
export function generateBreakfast(dayIndex: number, dietaryPreference: string, isWeightLoss: boolean, allergies?: string, region?: string) {
  return origGenerateBreakfast(dayIndex, dietaryPreference, isWeightLoss, allergies, region);
}

export function generateMidMorningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string) {
  return origGenerateMidMorningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies);
}

export function generateLunch(dayIndex: number, proteins: string[], grains: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return origGenerateLunch(dayIndex, proteins, grains, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

export function generateEveningSnack(dayIndex: number, snacks: string[], fruits: string[], isWeightLoss: boolean, allergies?: string, region?: string) {
  return origGenerateEveningSnack(dayIndex, snacks, fruits, isWeightLoss, allergies, region);
}

export function generateDinner(dayIndex: number, proteins: string[], vegetables: string[], isWeightLoss: boolean, isProteinFocus: boolean, allergies?: string, region?: string) {
  return origGenerateDinner(dayIndex, proteins, vegetables, isWeightLoss, isProteinFocus, allergies, region);
}

export const generateDietPlan = (
  formData: FormData
): DietPlan => {
  const days = [];
  
  // Convert string values to numbers
  const age = parseInt(formData.age);
  const weight = parseInt(formData.weight);
  
  // Calculate height in cm (from feet/inches if provided, or use cm value)
  let heightCm = parseInt(formData.height);
  if (formData.heightFeet && formData.heightInches) {
    const feet = parseInt(formData.heightFeet);
    const inches = parseInt(formData.heightInches);
    heightCm = Math.round((feet * 30.48) + (inches * 2.54));
  }
  
  // Calculate BMI
  const bmi = calculateBMI(weight, heightCm);
  const bmiCategory = getBMICategory(bmi, formData.exerciseFrequency, formData.fitnessGoal);
  
  // Calculate BMR
  const bmr = calculateBMR(weight, heightCm, age, formData.gender);
  
  // Get wellness goals (default to general wellness if none selected)
  const wellnessGoals = formData.wellnessGoals || ['general-wellness'];
  
  // Adjust calories based on fitness goal and wellness goals
  const dailyCalories = calculateDailyCalories(bmr, formData.fitnessGoal, wellnessGoals, formData.has_muscular_build);
  
  const dietaryPreference = formData.dietaryPreference;
  const proteinFocus = formData.fitnessGoal === 'muscle-gain';
  const calorieReduction = (formData.fitnessGoal === 'weight-loss' || 
                           wellnessGoals.includes('fat-loss') || 
                           wellnessGoals.includes('inch-loss')) && 
                           !formData.has_muscular_build;
  const { allergies, region } = formData;

  // Use new allergy-aware accessors
  const rawProteins = getProteinSources(dietaryPreference, allergies);
  const proteinsByDay = limitSoyaInDietDays(rawProteins, 75, 30);

  const grains = getGrainSources(dietaryPreference, allergies);
  const vegetables = getVegetableSources(dietaryPreference, allergies);
  const fruits = getFruitSources(dietaryPreference, allergies);
  const snacks = getSnackSources(dietaryPreference, calorieReduction, allergies);
  
  for (let i = 1; i <= 75; i++) {
    const dayIndex = (i - 1) % 15;
    
    const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction, allergies, region);
    const midMorningSnack = generateMidMorningSnack(dayIndex, snacks, fruits, calorieReduction, allergies);

    // Use protein for this day, limited for soya according to our rule
    const proteinForDay = proteinsByDay[i - 1];
    // Lunch and dinner use proteins; pass a single-item protein array so they use correct protein for the day
    const lunch = generateLunch(dayIndex, [proteinForDay], grains, vegetables, calorieReduction, proteinFocus, allergies, region);
    const eveningSnack = generateEveningSnack(dayIndex, snacks, fruits, calorieReduction, allergies, region);
    const dinner = generateDinner(dayIndex, [proteinForDay], vegetables, calorieReduction, proteinFocus, allergies, region);
    
    // Calculate approximate calories for the day
    const totalCalories = Math.round(dailyCalories / 10) * 10;
    
    // Recommended water intake (in liters)
    const waterIntake = formData.gender === 'male' ? 3.0 : 2.7;
    
    // Generate wellness goal specific information
    const hairNutrients = wellnessGoals.includes('hair-fall-control') ? 
      generateHairNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const skinNutrients = wellnessGoals.includes('glowing-skin') ? 
      generateSkinNutrients(`${breakfast} ${lunch} ${dinner}`) : undefined;
      
    const fatLossNotes = (wellnessGoals.includes('fat-loss') || wellnessGoals.includes('inch-loss')) ? 
      generateFatLossNotes(`${breakfast} ${lunch} ${dinner}`, totalCalories) : undefined;
      
    const herbalRecommendations = generateHerbalRecommendations(dayIndex, wellnessGoals);
    
    // Generate regional note if applicable
    const regionalNote = region ? generateRegionalNote(region) : undefined;
    
    days.push({
      day: i,
      breakfast,
      midMorningSnack,
      lunch,
      eveningSnack,
      dinner,
      calories: totalCalories,
      water: waterIntake,
      bmi,
      bmiCategory,
      wellnessGoals,
      hairNutrients,
      skinNutrients,
      fatLossNotes,
      herbalRecommendations,
      regionalNote
    });
  }
  
  return { 
    days,
    bmi,
    bmiCategory,
    bmr: Math.round(bmr),
    dailyCalories: Math.round(dailyCalories)
  };
};
