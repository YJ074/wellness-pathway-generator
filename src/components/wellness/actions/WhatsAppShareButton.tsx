
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendPlanViaWhatsApp } from "@/utils/sharing";
import { FormData, DietPlan, WorkoutPlan } from "../types";

interface WhatsAppShareButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan; // Added workoutPlan as optional prop
}

const WhatsAppShareButton = ({
  formData,
  dietPlan,
  workoutPlan
}: WhatsAppShareButtonProps) => {
  const { toast } = useToast();
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);
  
  const handleSendWhatsApp = async () => {
    if (!formData.mobileNumber || !formData.mobileNumber.startsWith("+91")) {
      toast({
        title: "Valid Phone Number Required",
        description: "Please provide a valid Indian mobile number to send the plan via WhatsApp.",
        variant: "destructive"
      });
      return;
    }
    
    setIsWhatsAppSending(true);
    try {
      await sendPlanViaWhatsApp(formData, dietPlan);
      toast({
        title: "WhatsApp Message Prepared",
        description: `WhatsApp should open in a new tab with your wellness plan for ${formData.mobileNumber}`
      });
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via WhatsApp. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsWhatsAppSending(false);
    }
  };
  
  return (
    <Button onClick={handleSendWhatsApp} variant="outline" disabled={isWhatsAppSending}>
      {isWhatsAppSending ? (
        <>Connecting...</>
      ) : (
        <>
          <Share className="mr-2 h-4 w-4" />
          WhatsApp
        </>
      )}
    </Button>
  );
};

export default WhatsAppShareButton;
