
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
    >
      {({ loading, error }) => {
        // Handle error state
        if (error) {
          // Use setTimeout to avoid state update during render
          setTimeout(() => handleError(error), 0);
          
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Failed to generate
            </Button>
          );
        }

        // Handle initialization and loading state
        if (loading || isInitializing) {
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Preparing PDF...
            </Button>
          );
        }

        // If we get here, PDF is ready - make sure we're not in initializing state
        if (isInitializing) {
          setTimeout(() => setIsInitializing(false), 0);
        }
        
        // Handle success state
        return (
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
