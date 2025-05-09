
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import WellnessPDF from "../WellnessPDF";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { pdf } from '@react-pdf/renderer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, SendHorizontal } from "lucide-react";

interface DownloadPDFButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const DownloadPDFButton = ({ formData, dietPlan, workoutPlan }: DownloadPDFButtonProps) => {
  const [webhookUrl, setWebhookUrl] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const { toast } = useToast();

  const sendToMakeWebhook = async () => {
    if (!webhookUrl || !webhookUrl.includes("hook.")) {
      toast({
        title: "Invalid Webhook URL",
        description: "Please enter a valid Make.com webhook URL.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    console.log("Sending PDF to Make.com webhook:", webhookUrl);

    try {
      // Generate the PDF as a blob
      const pdfDocument = <WellnessPDF formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />;
      const pdfBlob = await pdf(pdfDocument).toBlob();
      
      // Convert blob to base64
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        
        // Prepare the payload with PDF data and metadata
        const payload = {
          pdfBase64: base64data,
          fileName: `${formData.name}-75-day-wellness-plan.pdf`,
          metadata: {
            name: formData.name,
            email: formData.email,
            generatedAt: new Date().toISOString(),
            dietaryPreference: formData.dietaryPreference,
            fitnessGoal: formData.fitnessGoal,
            includesWorkoutPlan: !!workoutPlan
          }
        };

        // Send to the Make.com webhook
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        console.log("Make.com webhook response:", response);
        
        if (response.ok) {
          toast({
            title: "Success!",
            description: "Your wellness plan has been sent to Make.com successfully.",
          });
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      };
      
      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error("Error sending to Make.com webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send wellness plan to Make.com. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <PDFDownloadLink
          document={<WellnessPDF formData={formData} dietPlan={dietPlan} workoutPlan={workoutPlan} />}
          fileName={`${formData.name}-75-day-wellness-plan.pdf`}
          className="inline-block"
        >
          {({ loading, error }) => {
            if (error) {
              console.error("PDF generation error:", error);
            }
            
            return (
              <Button variant="outline" disabled={loading}>
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Send to Make.com
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send to Make.com</DialogTitle>
              <DialogDescription>
                Enter your Make.com webhook URL to send the wellness plan PDF.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="webhook">Make.com Webhook URL</Label>
                <Input
                  id="webhook"
                  placeholder="https://hook.eu1.make.com/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
              </div>
              <div className="text-xs text-gray-500">
                <p>The PDF will be sent as base64 data along with user information.</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={sendToMakeWebhook} 
                disabled={isSending || !webhookUrl}
              >
                {isSending ? (
                  <>Sending<span className="loading">...</span></>
                ) : (
                  <>
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Send PDF
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DownloadPDFButton;
