
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
  const [isGenerating, setIsGenerating] = useState(true);

  // Show a toast message when PDF generation fails
  const handleGenerationError = () => {
    console.error("PDF generation failed");
    toast({
      title: "PDF Generation Failed",
      description: "We couldn't generate your PDF. Please try again later.",
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
          console.error("PDF error:", error);
          setTimeout(() => handleGenerationError(), 0);
          
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Failed to generate
            </Button>
          );
        }

        // Handle loading state
        if (loading) {
          return (
            <Button variant="outline" disabled>
              <Download className="mr-2 h-4 w-4" />
              Preparing PDF...
            </Button>
          );
        }
        
        // Success state - PDF is ready for download
        if (isGenerating) {
          setIsGenerating(false);
        }
        
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
