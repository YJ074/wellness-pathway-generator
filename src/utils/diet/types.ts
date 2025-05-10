
export type DietaryPreference =
  | 'lacto-vegetarian'
  | 'lacto-ovo-vegetarian'
  | 'pure-vegetarian'
  | 'sattvic'
  | 'non-vegetarian'
  | 'pure-jain'
  | 'vegan';

export type WellnessGoal = 
  | 'hair-fall-control'
  | 'glowing-skin'
  | 'fat-loss'
  | 'inch-loss'
  | 'general-wellness';

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
    wellnessGoals?: WellnessGoal[];
    hairNutrients?: string;
    skinNutrients?: string;
    fatLossNotes?: string;
    herbalRecommendations?: string[];
  }>;
}
