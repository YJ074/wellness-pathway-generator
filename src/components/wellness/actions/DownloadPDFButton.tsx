
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import WellnessPDF from "../WellnessPDF";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { useToast } from "@/hooks/use-toast";

interface DownloadPDFButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const DownloadPDFButton = ({ formData, dietPlan, workoutPlan }: DownloadPDFButtonProps) => {
  const { toast } = useToast();
  const [isInitializing, setIsInitializing] = useState(true);

  // Handle any PDF generation errors
  const handleError = (error: Error) => {
    console.error("PDF generation error:", error);
    toast({
      title: "Download Error",
      description: "There was a problem generating your PDF. Please try again.",
      variant: "destructive"
    });
  };

  return (
    <PDFDownloadLink
      document={<WellnessPDF formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />}
      fileName={`${formData.name}-75-day-wellness-plan.pdf`}
      onLoadError={handleError}
      onLoadSuccess={() => setIsInitializing(false)}
    >
      {({ loading, error }) => (
        <Button 
          variant="outline" 
          disabled={loading || isInitializing}
          onClick={() => {
            if (error) {
              handleError(error);
            }
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          {loading || isInitializing ? "Preparing PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
