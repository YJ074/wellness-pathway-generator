
export type DietaryPreference =
  | 'lacto-vegetarian'
  | 'lacto-ovo-vegetarian'
  | 'pure-vegetarian'
  | 'jain'
  | 'sattvic'
  | 'non-vegetarian'
  | 'pure-jain';

export interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }>;
}

