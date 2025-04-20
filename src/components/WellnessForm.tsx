import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateWorkoutPlan } from '@/utils/workoutGenerator';
import WellnessFormInputs from './wellness/WellnessFormInputs';
import PlanDetailsCard from './wellness/PlanDetailsCard';
import DietPlanDisplay from './wellness/DietPlanDisplay';
import WorkoutPlanDisplay from './wellness/WorkoutPlanDisplay';

interface FormData {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  dietaryPreference: 'vegetarian' | 'eggitarian' | 'vegan';
  fitnessGoal: string;
  exerciseFrequency: string;
}

interface DietPlan {
  days: Array<{
    day: number;
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  }>;
}

interface WorkoutPlan {
  days: Array<{
    day: number;
    isRestDay: boolean;
    warmup: string[];
    exercises: Array<{
      name: string;
      reps: string;
      description: string;
    }>;
    cooldown: string[];
  }>;
}

const WellnessForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    dietaryPreference: 'vegetarian',
    fitnessGoal: '',
    exerciseFrequency: ''
  });
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Function to generate a personalized diet plan
  const generateDietPlan = (
    dietaryPreference: string,
    fitnessGoal: string,
    age: number,
    weight: number
  ): DietPlan => {
    const days = [];
    const proteinFocus = fitnessGoal === 'muscle-gain';
    const calorieReduction = fitnessGoal === 'weight-loss';
    
    // Get appropriate food items based on dietary preference
    const proteins = getProteinSources(dietaryPreference);
    const grains = getGrainSources();
    const vegetables = getVegetableSources();
    const fruits = getFruitSources();
    const snacks = getSnackSources(dietaryPreference, calorieReduction);
    
    // Generate a 75-day plan
    for (let i = 1; i <= 75; i++) {
      // Create slightly different meals for variety
      const dayIndex = (i - 1) % 15; // Rotate through 15 different base meal patterns
      
      const breakfast = generateBreakfast(dayIndex, dietaryPreference, calorieReduction);
      const lunch = generateLunch(dayIndex, proteins, grains, vegetables, calorieReduction, proteinFocus);
      const dinner = generateDinner(dayIndex, proteins, vegetables, calorieReduction, proteinFocus);
      const daySnacks = generateSnacks(dayIndex, snacks, fruits, calorieReduction);
      
      days.push({
        day: i,
        breakfast,
        lunch,
        dinner,
        snacks: daySnacks
      });
    }
    
    return { days };
  };

  // Helper functions for diet plan generation
  const getProteinSources = (dietaryPreference: string) => {
    const proteins = {
      'vegetarian': [
        'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
        'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
      ],
      'eggitarian': [
        'Eggs', 'Paneer', 'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Greek Yogurt',
        'Cottage Cheese', 'Soy Chunks', 'Masoor Dal', 'Urad Dal'
      ],
      'vegan': [
        'Tofu', 'Chana (Chickpeas)', 'Rajma (Kidney Beans)', 
        'Moong Dal', 'Toor Dal', 'Sprouts', 'Soy Yogurt',
        'Soy Chunks', 'Masoor Dal', 'Urad Dal', 'Soy Milk', 'Peanut Butter'
      ]
    };
    
    return proteins[dietaryPreference as keyof typeof proteins] || proteins['vegetarian'];
  };

  const getGrainSources = () => {
    return [
      'Brown Rice', 'Quinoa', 'Bajra Roti', 'Jowar Roti', 'Ragi Roti',
      'Whole Wheat Roti', 'Oats', 'Millet', 'Brown Rice Poha',
      'Whole Wheat Bread', 'Multigrain Dosa', 'Red Rice'
    ];
  };

  const getVegetableSources = () => {
    return [
      'Spinach', 'Methi (Fenugreek Leaves)', 'Palak (Spinach)', 'Broccoli',
      'Lauki (Bottle Gourd)', 'Bhindi (Okra)', 'Baingan (Eggplant)',
      'Capsicum (Bell Pepper)', 'Carrots', 'Tomatoes', 'Cabbage',
      'Cauliflower', 'Green Beans', 'Peas', 'Beetroot', 'Pumpkin'
    ];
  };

  const getFruitSources = () => {
    return [
      'Apple', 'Banana', 'Papaya', 'Watermelon', 'Muskmelon',
      'Orange', 'Guava', 'Pomegranate', 'Pineapple', 'Strawberry',
      'Kiwi', 'Mango (in moderation)', 'Jamun', 'Chikoo'
    ];
  };

  const getSnackSources = (dietaryPreference: string, isWeightLoss: boolean) => {
    const baseSnacks = [
      'Roasted Chana', 'Makhana (Fox Nuts)', 'Murmura (Puffed Rice)',
      'Sprouts Chaat', 'Cucumber Slices', 'Carrot Sticks',
      'Homemade Hummus', 'Buttermilk', 'Vegetable Soup'
    ];
    
    if (dietaryPreference === 'eggitarian' && !isWeightLoss) {
      baseSnacks.push('Boiled Egg');
    }
    
    return baseSnacks;
  };

  const generateBreakfast = (dayIndex: number, dietaryPreference: string, isWeightLoss: boolean) => {
    const breakfastOptions = [
      'Vegetable Poha with curd',
      'Oats Idli with sambhar',
      'Vegetable Upma with a side of sprouts',
      'Besan Chilla with mint chutney',
      'Multigrain Dosa with coconut chutney',
      'Masala Daliya (Broken Wheat) with vegetables',
      'Ragi Dosa with tomato chutney',
      'Vegetable Uttapam with sambar',
      'Moong Dal Cheela with curd',
      'Steamed Sprouts Dhokla',
      'Vegetable Daliya Khichdi',
      'Jowar Upma with vegetables',
      'Quinoa Poha with vegetables',
      'Brown Rice Idli with tomato chutney',
      'Bajra Roti with vegetable curry'
    ];
    
    if (dietaryPreference === 'eggitarian') {
      const eggBreakfasts = [
        'Egg Bhurji with multigrain roti',
        'Masala Omelette with vegetable stuffing',
        'Boiled Eggs with vegetable sandwich',
        'Egg and Vegetable Wrap'
      ];
      
      // Substitute some vegetarian options with egg options
      if (dayIndex % 4 === 0) {
        return eggBreakfasts[dayIndex % eggBreakfasts.length];
      }
    }
    
    return breakfastOptions[dayIndex];
  };

  const generateLunch = (
    dayIndex: number, 
    proteins: string[], 
    grains: string[], 
    vegetables: string[], 
    isWeightLoss: boolean,
    isProteinFocus: boolean
  ) => {
    const protein = proteins[dayIndex % proteins.length];
    const grain = grains[dayIndex % grains.length];
    const veggie1 = vegetables[dayIndex % vegetables.length];
    const veggie2 = vegetables[(dayIndex + 5) % vegetables.length];
    
    let lunch = '';
    
    if (isWeightLoss) {
      lunch = `${grain} (small portion), ${protein} curry, ${veggie1} and ${veggie2} stir-fry, small bowl of curd`;
    } else if (isProteinFocus) {
      lunch = `${grain}, double portion of ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
    } else {
      lunch = `${grain}, ${protein} curry, ${veggie1} and ${veggie2} stir-fry, bowl of curd`;
    }
    
    return lunch;
  };

  const generateDinner = (
    dayIndex: number, 
    proteins: string[], 
    vegetables: string[], 
    isWeightLoss: boolean,
    isProteinFocus: boolean
  ) => {
    const protein = proteins[(dayIndex + 3) % proteins.length];
    const veggie1 = vegetables[(dayIndex + 2) % vegetables.length];
    const veggie2 = vegetables[(dayIndex + 8) % vegetables.length];
    
    let dinner = '';
    
    if (isWeightLoss) {
      dinner = `${protein} curry (light), ${veggie1} and ${veggie2} sabzi, small bowl of buttermilk`;
    } else if (isProteinFocus) {
      dinner = `${protein} curry (generous portion), ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
    } else {
      dinner = `${protein} curry, ${veggie1} and ${veggie2} sabzi, bowl of buttermilk`;
    }
    
    return dinner;
  };

  const generateSnacks = (
    dayIndex: number, 
    snacks: string[], 
    fruits: string[], 
    isWeightLoss: boolean
  ) => {
    const snack = snacks[dayIndex % snacks.length];
    const fruit = fruits[dayIndex % fruits.length];
    
    if (isWeightLoss) {
      return `${fruit} OR ${snack} (choose one per day)`;
    } else {
      return `${fruit} AND ${snack}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const generatedDietPlan = generateDietPlan(
      formData.dietaryPreference,
      formData.fitnessGoal,
      parseInt(formData.age),
      parseInt(formData.weight)
    );
    
    const generatedWorkoutPlan = {
      days: generateWorkoutPlan(formData.exerciseFrequency, formData.fitnessGoal)
    };
    
    setDietPlan(generatedDietPlan);
    setWorkoutPlan(generatedWorkoutPlan);
    setIsGenerating(false);
    
    toast({
      title: "Plans Generated",
      description: "Your 75-day wellness and workout plans have been created.",
    });
  };

  return (
    <div className="space-y-6 w-full max-w-4xl">
      {!dietPlan ? (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <WellnessFormInputs formData={formData} handleInputChange={handleInputChange} />
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-blue/90" 
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : <><Send className="w-4 h-4 mr-2" /> Generate Wellness Plan</>}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your 75-Day Wellness Plan</h2>
            <Button 
              onClick={() => {
                setDietPlan(null);
                setWorkoutPlan(null);
              }} 
              variant="outline"
            >
              Back to Form
            </Button>
          </div>
          
          <div className="space-y-4">
            <PlanDetailsCard formData={formData} />
            
            <div className="grid gap-4">
              {dietPlan && <DietPlanDisplay days={dietPlan.days} />}
              {workoutPlan && <WorkoutPlanDisplay days={workoutPlan.days} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessForm;
