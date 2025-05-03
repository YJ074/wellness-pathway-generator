
import React from "react";
import { FormData, DietPlan } from "./types";
import ActionButtons from "./actions/ActionButtons";

interface WellnessResultsHeaderActionsProps {
  formData: FormData;
  dietPlan: DietPlan;
  onReset: () => void;
}

const WellnessResultsHeaderActions = ({
  formData,
  dietPlan,
  onReset,
}: WellnessResultsHeaderActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h2 className="text-2xl font-bold">Your 75-Day Personalized Wellness Plan</h2>
      <ActionButtons formData={formData} dietPlan={dietPlan} onReset={onReset} />
    </div>
  );
};

export default WellnessResultsHeaderActions;
