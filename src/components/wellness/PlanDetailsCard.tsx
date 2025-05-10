
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlanDetailsProps {
  formData: {
    name: string;
    age: string;
    weight: string;
    dietaryPreference: string;
    fitnessGoal: string;
  };
}

const PlanDetailsCard = ({ formData }: PlanDetailsProps) => {
  // Format the dietary preference for display
  const formatPreference = (preference: string) => {
    return preference
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get protein requirement based on dietary preference
  const getProteinNote = (preference: string) => {
    const proteinNotes: Record<string, string> = {
      'vegan': 'Plant proteins from legumes, tofu, tempeh, seitan',
      'lacto-vegetarian': 'Dairy and legume based proteins',
      'lacto-ovo-vegetarian': 'Eggs, dairy and legume proteins',
      'pure-vegetarian': 'Dairy and plant-based proteins',
      'sattvic': 'Sattvic protein sources (dairy, legumes)',
      'pure-jain': 'Jain-appropriate protein sources',
      'non-vegetarian': 'Animal and plant proteins'
    };
    
    return proteinNotes[preference] || '';
  };

  // Get variety note to explain how foods are varied
  const getVarietyNote = () => {
    return 'Foods varied using prime number patterns to avoid repetition';
  };

  return (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle>Plan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age} years</p>
        <p><strong>Weight:</strong> {formData.weight} kg</p>
        <p><strong>Dietary Preference:</strong> {formatPreference(formData.dietaryPreference)}</p>
        <p><strong>Fitness Goal:</strong> {formData.fitnessGoal.replace('-', ' ')}</p>
        <p className="mt-2 text-sm italic text-blue-700">{getProteinNote(formData.dietaryPreference)}</p>
        <p className="text-sm italic text-green-700">{getVarietyNote()}</p>
      </CardContent>
    </Card>
  );
};

export default PlanDetailsCard;
