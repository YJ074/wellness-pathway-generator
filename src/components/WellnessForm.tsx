
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
    dietaryPreference: 'lacto-vegetarian',
    fitnessGoal: '',
    exerciseFrequency: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

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

    setDietPlan(generatedDietPlan);
    setIsGenerating(false);

    toast({
      title: "Diet Plan Generated",
      description: "Your 75-day diet plan has been created.",
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
