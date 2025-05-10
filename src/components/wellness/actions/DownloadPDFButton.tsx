
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import WellnessPDF from "../WellnessPDF";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { useToast } from "@/hooks/use-toast";
import { DietaryPreference } from "@/utils/diet/types";

interface DownloadPDFButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const DownloadPDFButton = ({ formData, dietPlan, workoutPlan }: DownloadPDFButtonProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  // Create a properly typed version of formData
  // We ensure dietaryPreference is correctly typed as the union type expected by FormData
  const safeFormData: FormData = {
    ...formData,
    exerciseFrequency: formData.exerciseFrequency || 'sedentary',
    fitnessGoal: formData.fitnessGoal || 'maintenance',
    dietaryPreference: formData.dietaryPreference as DietaryPreference
  };

  // Add automatic retry mechanism
  useEffect(() => {
    if (hasErrored && retryCount < 2) {
      const timer = setTimeout(() => {
        console.log("Retrying PDF generation, attempt:", retryCount + 1);
        setHasErrored(false);
        setIsGenerating(true);
        setRetryCount(prev => prev + 1);
        setRenderKey(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasErrored, retryCount]);

  // Show a toast message when PDF generation fails
  const handleGenerationError = () => {
    console.error("PDF generation failed");
    if (!hasErrored) {
      setHasErrored(true);
      toast({
        title: "PDF Generation Failed",
        description: "We couldn't generate your PDF. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Handle successful generation
  const handleGenerationSuccess = () => {
    if (isGenerating) {
      setIsGenerating(false);
      toast({
        title: "PDF Generated Successfully",
        description: "Your 75-day wellness plan PDF is ready for download.",
        variant: "default"
      });
    }
  };

  return (
    <div className="relative" key={renderKey}>
      {isGenerating && !hasErrored && (
        <Button variant="outline" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Preparing PDF...
        </Button>
      )}
      
      {hasErrored && (
        <Button variant="outline" disabled>
          <Download className="mr-2 h-4 w-4" />
          Failed to generate
        </Button>
      )}
      
      {!hasErrored && (
        <PDFDownloadLink
          document={
            <WellnessPDF 
              formData={safeFormData} 
              dietPlan={dietPlan} 
              workoutPlan={workoutPlan} 
            />
          }
          fileName={`${formData.name || 'wellness'}-75-day-wellness-plan.pdf`}
          className={isGenerating ? "hidden" : "inline-block"}
        >
          {({ loading, error }) => {
            // Handle error state
            if (error) {
              console.error("PDF error:", error);
              setTimeout(() => handleGenerationError(), 0);
              
              return null;
            }

            // Handle loading state
            if (loading) {
              return null;
            }
            
            // Success state - PDF is ready for download
            setTimeout(() => handleGenerationSuccess(), 0);
            
            return (
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF (75 days)
              </Button>
            );
          }}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default DownloadPDFButton;
