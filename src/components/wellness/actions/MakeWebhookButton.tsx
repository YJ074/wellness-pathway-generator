
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormData, DietPlan, WorkoutPlan } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MakeWebhookButtonProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;  // Added workoutPlan as optional prop
}

const MakeWebhookButton = ({ formData, dietPlan, workoutPlan }: MakeWebhookButtonProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Load webhook from localStorage if it exists
  React.useEffect(() => {
    const savedWebhook = localStorage.getItem("arogyam75_make_webhook");
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  }, []);

  const handleTriggerWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Webhook URL Required",
        description: "Please enter your Make.com webhook URL to trigger the automation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Save webhook URL to localStorage for future use
      localStorage.setItem("arogyam75_make_webhook", webhookUrl);
      
      // Prepare data to send to Make.com
      const payload = {
        user: {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobileNumber,
          age: formData.age,
          weight: formData.weight,
          height: formData.height || `${formData.heightFeet || 0}'${formData.heightInches || 0}"`,
          gender: formData.gender,
        },
        plan: {
          dietType: formData.dietaryPreference,
          fitnessGoal: formData.fitnessGoal,
          bmi: dietPlan.bmi,
          dailyCalories: dietPlan.dailyCalories,
          dayCount: dietPlan.days.length,
          firstDayMeals: {
            breakfast: dietPlan.days[0].breakfast,
            lunch: dietPlan.days[0].lunch,
            dinner: dietPlan.days[0].dinner,
          }
        },
        timestamp: new Date().toISOString(),
        source: window.location.origin
      };

      // Send data to Make.com webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Required for cross-origin requests
        body: JSON.stringify(payload),
      });

      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Your wellness plan has been sent to Make.com for automation.",
      });
    } catch (error) {
      console.error("Error triggering Make.com webhook:", error);
      toast({
        title: "Webhook Failed",
        description: "Could not trigger the Make.com webhook. Please verify the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Webhook className="mr-2 h-4 w-4" />
            Make.com
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to Make.com</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Make.com Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://hook.eu1.make.com/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter your webhook URL from Make.com to trigger an automation with your wellness plan data.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleTriggerWebhook}
              disabled={isLoading || !webhookUrl}
            >
              {isLoading ? "Sending..." : "Send to Make.com"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MakeWebhookButton;
