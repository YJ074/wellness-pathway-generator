
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Mail, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendPlanViaEmail, sendPlanViaWhatsApp } from "@/utils/sharing";
import WellnessPDF from "./WellnessPDF";
import { FormData, DietPlan } from "./types";

interface WellnessResultsHeaderActionsProps {
  formData: FormData;
  dietPlan: DietPlan;
  onReset: () => void;
}

const WellnessResultsHeaderActions = ({
  formData,
  dietPlan,
  onReset,
}: WellnessResultsHeaderActionsProps) => {
  const { toast } = useToast();
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);

  const handleSendEmail = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please provide an email address to send the plan.",
        variant: "destructive",
      });
      return;
    }

    setIsEmailSending(true);
    try {
      await sendPlanViaEmail(formData, dietPlan);
      toast({
        title: "Success!",
        description: `Your wellness plan has been sent to ${formData.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSendWhatsApp = async () => {
    if (!formData.mobileNumber || !formData.mobileNumber.startsWith("+91")) {
      toast({
        title: "Valid Phone Number Required",
        description:
          "Please provide a valid Indian mobile number to send the plan via WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    setIsWhatsAppSending(true);
    try {
      await sendPlanViaWhatsApp(formData, dietPlan);
      toast({
        title: "WhatsApp Message Sent!",
        description: `Your wellness plan has been shared via WhatsApp to ${formData.mobileNumber}`,
      });
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsWhatsAppSending(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h2 className="text-2xl font-bold">Your 75-Day Personalized Wellness Plan</h2>
      <div className="flex flex-wrap gap-2">
        <PDFDownloadLink
          document={<WellnessPDF formData={formData} dietPlan={dietPlan} />}
          fileName={`${formData.name}-75-day-wellness-plan.pdf`}
        >
          {({ loading }) => (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>

        <Button variant="outline" onClick={handleSendEmail} disabled={isEmailSending}>
          <Mail className="mr-2 h-4 w-4" />
          {isEmailSending ? "Sending..." : "Email Plan"}
        </Button>

        <Button variant="outline" onClick={handleSendWhatsApp} disabled={isWhatsAppSending}>
          <Share className="mr-2 h-4 w-4" />
          {isWhatsAppSending ? "Sending..." : "Share on WhatsApp"}
        </Button>

        <Button onClick={onReset} variant="outline">
          Back to Form
        </Button>
      </div>
    </div>
  );
};

export default WellnessResultsHeaderActions;
