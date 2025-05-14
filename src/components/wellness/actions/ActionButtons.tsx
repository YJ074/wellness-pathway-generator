
import React from "react";
import { Button } from "@/components/ui/button";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import DownloadPDFButton from "./DownloadPDFButton";
import EmailShareButton from "./EmailShareButton";
import WhatsAppShareButton from "./WhatsAppShareButton";
import ShareOptionsDialog from "./ShareOptionsDialog";
import { trackEvent } from "@/utils/tracking";

interface ActionButtonsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
  onReset: () => void;
}

const ActionButtons = ({ formData, dietPlan, workoutPlan, onReset }: ActionButtonsProps) => {
  const handleReset = () => {
    trackEvent('navigation', 'click', 'back_to_form');
    onReset();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DownloadPDFButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <EmailShareButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <WhatsAppShareButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <ShareOptionsDialog formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <Button onClick={handleReset} variant="outline">
        Back to Form
      </Button>
    </div>
  );
};

export default ActionButtons;
