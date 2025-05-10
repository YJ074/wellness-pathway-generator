
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
      {({ loading, error, url, blob }) => {
        // Handle initialization state
        if (loading && isInitializing) {
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Preparing PDF...
            </Button>
          );
        }
        
        // Handle error state
        if (error) {
          handleError(error);
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Failed to generate
            </Button>
          );
        }
        
        // Handle success state (URL exists)
        if (url && isInitializing) {
          setIsInitializing(false);
        }
        
        return (
          <Button variant="outline" disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Preparing PDF..." : "Download PDF"}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
