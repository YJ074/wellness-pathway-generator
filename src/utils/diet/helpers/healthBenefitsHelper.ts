
// Helper to generate health benefit notes based on meal content

export const getHealthBenefit = (mealContent: string): string => {
  // Look for specific ingredients in the meal content
  // and return appropriate health benefit
  
  if (mealContent.toLowerCase().includes('palak') || 
      mealContent.toLowerCase().includes('spinach')) {
    return 'Rich in iron, supports healthy blood formation';
  }
  
  if (mealContent.toLowerCase().includes('dal') ||
      mealContent.toLowerCase().includes('lentil')) {
    return 'High in plant protein and fiber for muscle health';
  }
  
  if (mealContent.toLowerCase().includes('curd') || 
      mealContent.toLowerCase().includes('dahi') ||
      mealContent.toLowerCase().includes('yogurt')) {
    return 'Contains probiotics for gut health';
  }
  
  if (mealContent.toLowerCase().includes('sprouts')) {
    return 'Excellent source of enzymes and antioxidants';
  }
  
  if (mealContent.toLowerCase().includes('ragi')) {
    return 'Rich in calcium for strong bones and teeth';
  }
  
  if (mealContent.toLowerCase().includes('tomato')) {
    return 'Contains lycopene that supports heart health';
  }
  
  if (mealContent.toLowerCase().includes('carrot')) {
    return 'High in beta-carotene for eye health';
  }
  
  if (mealContent.toLowerCase().includes('amla') || 
      mealContent.toLowerCase().includes('gooseberry')) {
    return 'Natural vitamin C boost for immunity';
  }
  
  if (mealContent.toLowerCase().includes('paneer') || 
      mealContent.toLowerCase().includes('cottage cheese')) {
    return 'Good source of calcium and protein';
  }
  
  if (mealContent.toLowerCase().includes('lauki') || 
      mealContent.toLowerCase().includes('bottle gourd')) {
    return 'Low calorie and helps in digestion';
  }
  
  if (mealContent.toLowerCase().includes('turmeric') || 
      mealContent.toLowerCase().includes('haldi')) {
    return 'Contains curcumin with anti-inflammatory properties';
  }
  
  if (mealContent.toLowerCase().includes('banana')) {
    return 'Rich in potassium and supports heart function';
  }
  
  if (mealContent.toLowerCase().includes('oats')) {
    return 'Contains beta-glucan for heart health';
  }
  
  if (mealContent.toLowerCase().includes('chana') || 
      mealContent.toLowerCase().includes('chickpea')) {
    return 'Good source of plant protein and fiber';
  }
  
  if (mealContent.toLowerCase().includes('masala') || 
      mealContent.toLowerCase().includes('spice')) {
    return 'Indian spices provide antioxidant properties';
  }
  
  if (mealContent.toLowerCase().includes('sabzi') || 
      mealContent.toLowerCase().includes('vegetable')) {
    return 'Mixed vegetables provide essential micronutrients';
  }
  
  if (mealContent.toLowerCase().includes('moong')) {
    return 'Easy to digest protein source';
  }
  
  if (mealContent.toLowerCase().includes('rajma') || 
      mealContent.toLowerCase().includes('kidney bean')) {
    return 'Rich in folate and plant protein';
  }
  
  if (mealContent.toLowerCase().includes('buttermilk') || 
      mealContent.toLowerCase().includes('chaas')) {
    return 'Aids digestion and cools the body';
  }
  
  if (mealContent.toLowerCase().includes('coconut')) {
    return 'Contains medium-chain triglycerides for energy';
  }
  
  if (mealContent.toLowerCase().includes('makhana') || 
      mealContent.toLowerCase().includes('fox nut')) {
    return 'Low in sodium, good for blood pressure management';
  }
  
  if (mealContent.toLowerCase().includes('egg')) {
    return 'Complete protein with all essential amino acids';
  }
  
  if (mealContent.toLowerCase().includes('rice')) {
    return 'Provides energy with complex carbohydrates';
  }
  
  // Default benefits if no specific ingredients matched
  if (mealContent.toLowerCase().includes('breakfast')) {
    return 'Essential nutrients to kickstart your day';
  }
  
  if (mealContent.toLowerCase().includes('snack')) {
    return 'Balanced energy for between meals';
  }
  
  if (mealContent.toLowerCase().includes('lunch')) {
    return 'Complete nutrition for midday energy';
  }
  
  if (mealContent.toLowerCase().includes('dinner')) {
    return 'Balanced nutrition for the evening';
  }
  
  // General fallback - changing color from green to normal text
  return 'Balanced nutrition for overall health';
};
