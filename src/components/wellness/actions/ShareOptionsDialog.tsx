
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareWellnessPlan } from "@/utils/sharing";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ShareOptionsDialogProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;  // Added workoutPlan as optional prop
}

const ShareOptionsDialog = ({ formData, dietPlan, workoutPlan }: ShareOptionsDialogProps) => {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);
  
  const [shareOptions, setShareOptions] = useState({
    email: true,
    whatsapp: true,
  });

  const handleSharePlan = async () => {
    if ((!shareOptions.email && !shareOptions.whatsapp) ||
        (shareOptions.email && !formData.email) ||
        (shareOptions.whatsapp && !formData.mobileNumber)) {
      toast({
        title: "Missing Information",
        description: "Please select at least one sharing method and provide the required contact information.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsEmailSending(shareOptions.email);
      setIsWhatsAppSending(shareOptions.whatsapp);
      
      const result = await shareWellnessPlan(formData, dietPlan, {
        email: shareOptions.email,
        whatsapp: shareOptions.whatsapp,
        make: "", // Empty string for make, as we've removed this functionality
      });
      
      if (result.success) {
        setIsShareDialogOpen(false);
        toast({
          title: "Success!",
          description: "Your wellness plan has been shared successfully.",
        });
      } else {
        toast({
          title: "Sharing Failed",
          description: result.error || "Could not share the wellness plan. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in sharing plan:", error);
      toast({
        title: "Sharing Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEmailSending(false);
      setIsWhatsAppSending(false);
    }
  };

  return (
    <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Send className="mr-2 h-4 w-4" />
          Share Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Wellness Plan</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="share-email" 
              checked={shareOptions.email}
              onCheckedChange={(checked) => 
                setShareOptions(prev => ({ ...prev, email: checked === true }))}
              disabled={!formData.email}
            />
            <Label htmlFor="share-email" className={!formData.email ? "text-gray-400" : ""}>
              Email to {formData.email || "[Email not provided]"}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="share-whatsapp" 
              checked={shareOptions.whatsapp}
              onCheckedChange={(checked) => 
                setShareOptions(prev => ({ ...prev, whatsapp: checked === true }))}
              disabled={!formData.mobileNumber}
            />
            <Label htmlFor="share-whatsapp" className={!formData.mobileNumber ? "text-gray-400" : ""}>
              WhatsApp to {formData.mobileNumber || "[Mobile not provided]"}
            </Label>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSharePlan}
            disabled={isEmailSending || isWhatsAppSending || 
              (!shareOptions.email && !shareOptions.whatsapp)}
          >
            {(isEmailSending || isWhatsAppSending) ? "Sending..." : "Share Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareOptionsDialog;
