
export type DietaryPreference =
  | 'lacto-vegetarian'
  | 'lacto-ovo-vegetarian'
  | 'pure-vegetarian'
  | 'sattvic'
  | 'non-vegetarian'
  | 'jain'
  | 'vegan';

export type WellnessGoal = 
  | 'hair-fall-control'
  | 'glowing-skin'
  | 'fat-loss'
  | 'inch-loss'
  | 'pcos-pcod-friendly'
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
