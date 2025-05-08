
import { WellnessGoal } from '../types';

// Generate hair nutrients information based on the meal
export const generateHairNutrients = (meal: string): string => {
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
export const generateSkinNutrients = (meal: string): string => {
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
export const generateFatLossNotes = (meal: string, calories: number): string => {
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
export const generateHerbalRecommendations = (dayIndex: number, wellnessGoals: WellnessGoal[]): string[] => {
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
