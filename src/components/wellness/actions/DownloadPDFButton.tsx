
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
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for PDF generation
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Console log to debug
  console.log("DownloadPDFButton rendering:", {
    formData: formData.name,
    hasDietPlan: !!dietPlan,
    hasWorkoutPlan: !!workoutPlan
  });

  const handleDownloadError = (error: Error) => {
    console.error("PDF generation error:", error);
    toast({
      title: "PDF Generation Failed",
      description: "There was a problem generating the PDF. Please try again.",
      variant: "destructive",
    });
  };

  if (!isClient) {
    return (
      <Button variant="outline" disabled>
        <Download className="mr-2 h-4 w-4" />
        Preparing PDF...
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<WellnessPDF formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />}
      fileName={`${formData.name}-75-day-wellness-plan.pdf`}
      className="inline-block"
    >
      {({ loading, error, blob }) => {
        if (error) {
          handleDownloadError(error);
        }
        
        return (
          <Button variant="outline" disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Generating PDF..." : "Download PDF"}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
