
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { useToast } from "@/hooks/use-toast";

interface DownloadPDFButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const DownloadPDFButton = ({ formData }: DownloadPDFButtonProps) => {
  const { toast } = useToast();
  
  const handleButtonClick = () => {
    toast({
      title: "PDF Generation Disabled",
      description: "PDF generation is currently disabled in this version.",
      variant: "default"
    });
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={handleButtonClick}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF (Disabled)
      </Button>
    </div>
  );
};

export default DownloadPDFButton;
