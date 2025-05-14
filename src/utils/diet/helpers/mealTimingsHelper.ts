
/**
 * Helper module for meal timing recommendations and cheat meal guidance
 */

// Recommended meal timings based on scientific research for optimal metabolism
export const getMealTimings = (dayIndex: number) => {
  // Base timings that promote regular eating patterns and metabolic health
  const baseTimings = {
    breakfast: "7:00 - 9:00 AM",
    midMorningSnack: "10:30 - 11:00 AM",
    lunch: "12:30 - 2:00 PM",
    eveningSnack: "4:00 - 5:00 PM",
    dinner: "7:00 - 8:30 PM"
  };
  
  // Every fourth day, suggest slightly different timings to prevent metabolic adaptation
  if (dayIndex % 4 === 0) {
    return {
      breakfast: "8:00 - 9:30 AM",
      midMorningSnack: "11:00 - 11:30 AM",
      lunch: "1:00 - 2:30 PM",
      eveningSnack: "4:30 - 5:30 PM",
      dinner: "7:30 - 8:45 PM"
    };
  }
  
  return baseTimings;
};

// Determine if a day should be a cheat meal/refeed day
export const isCheatMealDay = (dayNumber: number, fitnessGoal: string): boolean => {
  // Cheat days are usually once a week (every 7th day)
  // But we don't recommend cheat days for rapid weight loss goals
  if (fitnessGoal === 'weight-loss' && dayNumber <= 21) {
    // No cheat meals in first 3 weeks for weight loss
    return false;
  }
  
  // Every Saturday (day 6 in the week)
  return dayNumber % 7 === 6;
};

// Generate cheat meal guidance based on day and fitness goal
export const getCheatMealGuidance = (dayNumber: number, fitnessGoal: string): string | null => {
  if (!isCheatMealDay(dayNumber, fitnessGoal)) {
    return null;
  }
  
  if (fitnessGoal === 'weight-loss') {
    return "Enjoy one mindful treat meal today. Focus on portion control while satisfying cravings - this helps with diet adherence and prevents feelings of restriction.";
  } else if (fitnessGoal === 'muscle-gain') {
    return "Today is your refeed day. Increase carbohydrate intake by 20-30% to replenish muscle glycogen stores and support your training goals.";
  } else {
    return "Today you can enjoy one relaxed meal of your choice. This supports psychological well-being and long-term adherence to your nutrition plan.";
  }
};

// Generate meal timing tips based on goals
export const getMealTimingTips = (fitnessGoal: string): string => {
  if (fitnessGoal === 'weight-loss') {
    return "Try to finish your dinner at least 3 hours before bedtime to support better digestion and quality sleep.";
  } else if (fitnessGoal === 'muscle-gain') {
    return "Consider consuming your protein-rich meals within 2 hours of your workout to maximize muscle protein synthesis.";
  } else {
    return "Maintain consistent meal timing daily to support stable energy levels and optimal digestion.";
  }
};
