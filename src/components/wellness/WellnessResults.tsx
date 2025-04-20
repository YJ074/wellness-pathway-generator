
import React from 'react';
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PlanDetailsCard from './PlanDetailsCard';
import DietPlanDisplay from './DietPlanDisplay';
import WorkoutPlanDisplay from './WorkoutPlanDisplay';
import WellnessPDF from './WellnessPDF';
import { FormData, DietPlan, WorkoutPlan } from './types';
import { Download } from 'lucide-react';

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
        <div className="space-x-2">
          <PDFDownloadLink
            document={
              <WellnessPDF
                formData={formData}
                dietPlan={dietPlan}
                workoutPlan={workoutPlan}
              />
            }
            fileName={`${formData.name}-75-day-wellness-plan.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={onReset} variant="outline">
            Back to Form
          </Button>
        </div>
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
