
import React from "react";
import { Button } from "@/components/ui/button";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import DownloadPDFButton from "./DownloadPDFButton";
import EmailShareButton from "./EmailShareButton";
import WhatsAppShareButton from "./WhatsAppShareButton";
import ShareOptionsDialog from "./ShareOptionsDialog";

interface ActionButtonsProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
  onReset: () => void;
}

const ActionButtons = ({ formData, dietPlan, workoutPlan, onReset }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <DownloadPDFButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <EmailShareButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <WhatsAppShareButton formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <ShareOptionsDialog formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />
      <Button onClick={onReset} variant="outline">
        Back to Form
      </Button>
    </div>
  );
};

export default ActionButtons;
