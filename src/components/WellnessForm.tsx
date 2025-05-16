
import React, { useState, useCallback, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { generateDietPlan } from '@/utils/diet/dietGenerator';
import { generateWorkoutPlan } from '@/utils/workoutGenerator';
import WellnessFormView from './wellness/WellnessFormView';
import WellnessResults from './wellness/WellnessResults';
import { FormData, DietPlan, WorkoutPlan } from './wellness/types';
import { WellnessGoal } from '@/utils/diet/types';
import { shareWellnessPlan } from '@/utils/sharing';
import { sendPlanToMakeWebhook } from '@/utils/webhookService';
import { trackEvent, trackPageView } from '@/utils/tracking';

const WellnessForm = () => {
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
    includeWorkoutPlan: true, // Default: always include workout plan
    wellnessGoals: ['general-wellness'], // Default wellness goal
    region: '', // Default: no region selected
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);

  // Track page view on component mount
  useEffect(() => {
    trackPageView('wellness_form');
  }, []);

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

    // Track form submission
    trackEvent('generation', 'submit', 'wellness_plan', 1);

    // Use setTimeout to avoid blocking the main thread during generation
    setTimeout(() => {
      try {
        // Generate the diet plan passing the entire formData
        const generatedDietPlan = generateDietPlan(formData);
        
        // Always generate workout plan regardless of checkbox state
        const generatedWorkoutPlan = generateWorkoutPlan(
          formData.exerciseFrequency || 'sedentary', 
          formData.fitnessGoal || 'maintenance'
        );

        setDietPlan(generatedDietPlan);
        setWorkoutPlan(generatedWorkoutPlan);

        // Track successful plan generation
        trackEvent(
          'generation', 
          'success', 
          `${formData.dietaryPreference}_with_workout`
        );

        // Send the wellness plan to Make.com webhook
        sendPlanToMakeWebhook(formData, generatedDietPlan, generatedWorkoutPlan || undefined)
          .then(success => {
            if (success) {
              console.log("Successfully sent wellness plan to Make.com");
              trackEvent('webhook', 'success', 'make_webhook');
            } else {
              console.error("Failed to send wellness plan to Make.com");
              trackEvent('webhook', 'failure', 'make_webhook');
            }
          });

        // Silently trigger the webhook with the generated plan (legacy)
        shareWellnessPlan(
          formData, 
          generatedDietPlan, 
          { email: false, whatsapp: false, make: 'webhook' }
        );

        toast({
          title: "Wellness Plan Generated",
          description: `Your 75-day personalized diet and workout plan has been created.`,
        });
      } catch (error) {
        console.error("Error generating wellness plan:", error);
        trackEvent('generation', 'error', String(error));
        toast({
          title: "Generation Error",
          description: "There was an error generating your wellness plan. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsGenerating(false);
      }
    }, 100); // Small delay to allow UI to update
  }, [formData]);

  const handleReset = useCallback(() => {
    trackEvent('navigation', 'reset', 'back_to_form');
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
