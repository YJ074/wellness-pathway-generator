
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { generateDietPlan } from '@/utils/diet/dietGenerator';
import WellnessFormView from './wellness/WellnessFormView';
import WellnessResults from './wellness/WellnessResults';
import { FormData, DietPlan } from './wellness/types';

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
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Generate the diet plan passing the entire formData
    const generatedDietPlan = generateDietPlan(formData);

    setDietPlan(generatedDietPlan);
    setIsGenerating(false);

    toast({
      title: "Wellness Plan Generated",
      description: "Your 75-day personalized plan has been created. You can download, email, or share it via WhatsApp.",
    });
  };

  const handleReset = () => {
    setDietPlan(null);
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
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default WellnessForm;
