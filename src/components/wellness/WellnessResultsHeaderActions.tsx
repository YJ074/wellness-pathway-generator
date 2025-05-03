
import React from 'react';
import { FormData, DietPlan, WorkoutPlan } from './types';
import ActionButtons from './actions/ActionButtons';

interface WellnessResultsHeaderActionsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
  onReset: () => void;
}

const WellnessResultsHeaderActions = ({ 
  formData, 
  dietPlan,
  workoutPlan,
  onReset 
}: WellnessResultsHeaderActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
      <div>
        <h2 className="text-3xl font-bold">Your 75-Day Plan</h2>
        <p className="text-gray-600">Personalized for {formData.name}</p>
      </div>
      <ActionButtons formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} onReset={onReset} />
    </div>
  );
};

export default WellnessResultsHeaderActions;
