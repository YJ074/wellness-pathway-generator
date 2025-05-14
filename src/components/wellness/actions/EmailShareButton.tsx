
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { sendPlanViaEmail } from "@/utils/sharing";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import { trackEvent } from "@/utils/tracking";

interface EmailShareButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;  // Added workoutPlan as optional prop
}

const EmailShareButton = ({ formData, dietPlan, workoutPlan }: EmailShareButtonProps) => {
  const [isEmailSending, setIsEmailSending] = useState(false);

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
    // Track email sharing attempt
    trackEvent('share', 'email_start', formData.dietaryPreference);
    
    try {
      await sendPlanViaEmail(formData, dietPlan);
      toast({
        title: "Success!",
        description: `Your wellness plan has been sent to ${formData.email}`,
      });
      // Track successful email share
      trackEvent('share', 'email_success', formData.email.split('@')[1]);
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Sending Failed",
        description: "Could not send the plan via email. Please try again.",
        variant: "destructive",
      });
      // Track failed email share
      trackEvent('share', 'email_failure', String(error));
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <Button variant="outline" onClick={handleSendEmail} disabled={isEmailSending}>
      <Mail className="mr-2 h-4 w-4" />
      {isEmailSending ? "Sending..." : "Email Plan"}
    </Button>
  );
};

export default EmailShareButton;
