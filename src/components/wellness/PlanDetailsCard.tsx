
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
  return (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle>Plan Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age} years</p>
        <p><strong>Weight:</strong> {formData.weight} kg</p>
        <p><strong>Dietary Preference:</strong> {formData.dietaryPreference
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}</p>
        <p><strong>Fitness Goal:</strong> {formData.fitnessGoal.replace('-', ' ')}</p>
      </CardContent>
    </Card>
  );
};

export default PlanDetailsCard;
