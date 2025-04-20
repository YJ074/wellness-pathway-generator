
import React from 'react';
import { Button } from "@/components/ui/button";
import PlanDetailsCard from './PlanDetailsCard';
import DietPlanDisplay from './DietPlanDisplay';
import WorkoutPlanDisplay from './WorkoutPlanDisplay';
import { FormData, DietPlan, WorkoutPlan } from './types';

interface WellnessResultsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan: WorkoutPlan;
  onReset: () => void;
}

const WellnessResults = ({ formData, dietPlan, workoutPlan, onReset }: WellnessResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your 75-Day Wellness Plan</h2>
        <Button onClick={onReset} variant="outline">
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
  );
};

export default WellnessResults;
