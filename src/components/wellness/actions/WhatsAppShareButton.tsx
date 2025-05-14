
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sendPlanViaWhatsApp } from "@/utils/sharing";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { trackEvent } from "@/utils/tracking";

interface WhatsAppShareButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;  // Added workoutPlan as optional prop
}

const WhatsAppShareButton = ({ formData, dietPlan, workoutPlan }: WhatsAppShareButtonProps) => {
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);

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
    // Track WhatsApp sharing attempt
    trackEvent('share', 'whatsapp_start', formData.dietaryPreference);
    
    try {
      await sendPlanViaWhatsApp(formData, dietPlan);
      toast({
        title: "WhatsApp Message Prepared",
        description: `WhatsApp should open in a new tab with your wellness plan for ${formData.mobileNumber}`,
      });
      // Track successful WhatsApp share
      trackEvent('share', 'whatsapp_success', 'whatsapp_web');
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via WhatsApp. Please try again.",
        variant: "destructive",
      });
      // Track failed WhatsApp share
      trackEvent('share', 'whatsapp_failure', String(error));
    } finally {
      setIsWhatsAppSending(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSendWhatsApp} disabled={isWhatsAppSending}>
      <Share className="mr-2 h-4 w-4" />
      {isWhatsAppSending ? "Opening..." : "WhatsApp"}
    </Button>
  );
};

export default WhatsAppShareButton;
