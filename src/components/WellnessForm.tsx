
import React, { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateDietPlan } from '@/utils/diet/dietGenerator';
import { generateWorkoutPlan } from '@/utils/workoutGenerator';
import WellnessFormView from './wellness/WellnessFormView';
import WellnessResults from './wellness/WellnessResults';
import { FormData, DietPlan, WorkoutPlan } from './wellness/types';
import { WellnessGoal } from '@/utils/diet/types';

const WellnessForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    mobileNumber: '+91',
    gender: 'male', // Default gender
    dietaryPreference: 'lacto-vegetarian',
    fitnessGoal: '',
    exerciseFrequency: '',
    has_muscular_build: false, // Default: not selected
    includeWorkoutPlan: false, // Default: don't include workout plan
    wellnessGoals: ['general-wellness'], // Default wellness goal
    region: '', // Default: no region selected
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean | WellnessGoal[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.email || !formData.mobileNumber || 
        !formData.dietaryPreference || !formData.fitnessGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your wellness plan.",
        variant: "destructive"
      });
      return;
    }
    
    // Height validation - ensure either cm or feet/inches is provided
    if (!formData.height && (!formData.heightFeet || !formData.heightInches)) {
      toast({
        title: "Height Required",
        description: "Please provide your height in either centimeters or feet/inches.",
        variant: "destructive"
      });
      return;
    }
    
    // Weight validation
    if (!formData.weight) {
      toast({
        title: "Weight Required",
        description: "Please provide your weight in kilograms.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);

    // Use setTimeout to avoid blocking the main thread during generation
    setTimeout(() => {
      try {
        // Generate the diet plan passing the entire formData
        const generatedDietPlan = generateDietPlan(formData);
        
        // Only generate workout plan if user opted in
        let generatedWorkoutPlan = null;
        if (formData.includeWorkoutPlan) {
          generatedWorkoutPlan = generateWorkoutPlan(
            formData.exerciseFrequency || 'sedentary', 
            formData.fitnessGoal || 'maintenance'
          );
        }

        setDietPlan(generatedDietPlan);
        setWorkoutPlan(generatedWorkoutPlan);

        toast({
          title: "Wellness Plan Generated",
          description: `Your 75-day personalized ${formData.includeWorkoutPlan ? 'diet and workout' : 'diet'} plan has been created.`,
        });
      } catch (error) {
        console.error("Error generating wellness plan:", error);
        toast({
          title: "Generation Error",
          description: "There was an error generating your wellness plan. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 100); // Small delay to allow UI to update
  }, [formData, toast]);

  const handleReset = useCallback(() => {
    setDietPlan(null);
    setWorkoutPlan(null);
  }, []);

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
          workoutPlan={workoutPlan}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default WellnessForm;
