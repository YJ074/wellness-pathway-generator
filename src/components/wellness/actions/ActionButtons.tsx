
import React from "react";
import { Button } from "@/components/ui/button";
import { FormData, DietPlan } from "../types";
import DownloadPDFButton from "./DownloadPDFButton";
import EmailShareButton from "./EmailShareButton";
import WhatsAppShareButton from "./WhatsAppShareButton";
import ShareOptionsDialog from "./ShareOptionsDialog";

interface ActionButtonsProps {
  formData: FormData;
  dietPlan: DietPlan;
  onReset: () => void;
}

const ActionButtons = ({ formData, dietPlan, onReset }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <DownloadPDFButton formData={formData} dietPlan={dietPlan} />
      <EmailShareButton formData={formData} dietPlan={dietPlan} />
      <WhatsAppShareButton formData={formData} dietPlan={dietPlan} />
      <ShareOptionsDialog formData={formData} dietPlan={dietPlan} />
      <Button onClick={onReset} variant="outline">
        Back to Form
      </Button>
    </div>
  );
};

export default ActionButtons;
