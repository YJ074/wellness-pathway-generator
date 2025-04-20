
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateWorkoutPlan } from '@/utils/workoutGenerator';
import { generateDietPlan } from '@/utils/dietGenerator';
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
