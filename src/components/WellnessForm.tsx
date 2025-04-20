import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateWorkoutPlan } from '@/utils/workoutGenerator';
import { generateDietPlan } from '@/utils/diet/dietGenerator';
import WellnessFormView from './wellness/WellnessFormView';
import WellnessResults from './wellness/WellnessResults';
import { FormData, DietPlan, WorkoutPlan } from './wellness/types';

const WellnessForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    mobileNumber: '', // New field
    dietaryPreference: 'lacto-vegetarian',
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

  const handleReset = () => {
    setDietPlan(null);
    setWorkoutPlan(null);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl">
      {!dietPlan ? (
        <WellnessFormView
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isGenerating={isGenerating}
        />
      ) : (
        <WellnessResults
          formData={formData}
          dietPlan={dietPlan}
          workoutPlan={workoutPlan!}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default WellnessForm;
