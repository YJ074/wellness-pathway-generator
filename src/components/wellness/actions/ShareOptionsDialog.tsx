
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
import MakeWebhookInput from "./MakeWebhookInput";

interface ShareOptionsDialogProps {
  formData: FormData;
  dietPlan: DietPlan;
  workoutPlan?: WorkoutPlan;
}

const ShareOptionsDialog = ({ formData, dietPlan, workoutPlan }: ShareOptionsDialogProps) => {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);
  const [isMakeSending, setIsMakeSending] = useState(false);
  
  // For storing the Make.com webhook URL - could persist in localStorage if needed
  const [makeWebhookUrl, setMakeWebhookUrl] = useState("");
  
  const [shareOptions, setShareOptions] = useState({
    email: true,
    whatsapp: true,
    make: false,
  });

  const handleSharePlan = async () => {
    if (
      (!shareOptions.email && !shareOptions.whatsapp && !shareOptions.make) ||
      (shareOptions.email && !formData.email) ||
      (shareOptions.whatsapp && !formData.mobileNumber) ||
      (shareOptions.make && !makeWebhookUrl)
    ) {
      toast({
        title: "Missing Information",
        description: "Please select at least one sharing method and provide the required information.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsEmailSending(shareOptions.email);
      setIsWhatsAppSending(shareOptions.whatsapp);
      setIsMakeSending(shareOptions.make);
      
      const result = await shareWellnessPlan(
        formData, 
        dietPlan, 
        {
          email: shareOptions.email,
          whatsapp: shareOptions.whatsapp,
          make: shareOptions.make ? makeWebhookUrl : "",
        },
        workoutPlan
      );
      
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
      setIsMakeSending(false);
    }
  };

  const handleWebhookChange = (url: string) => {
    setMakeWebhookUrl(url);
    if (url) {
      // Automatically enable the Make option if a URL is provided
      setShareOptions(prev => ({ ...prev, make: true }));
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
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="share-make" 
              checked={shareOptions.make}
              onCheckedChange={(checked) => 
                setShareOptions(prev => ({ ...prev, make: checked === true }))}
              disabled={!makeWebhookUrl}
            />
            <Label htmlFor="share-make" className={!makeWebhookUrl ? "text-gray-400" : ""}>
              Send via Make.com (WhatsApp & Email)
            </Label>
          </div>
          
          <div className="pt-2">
            <MakeWebhookInput onWebhookChange={handleWebhookChange} webhookUrl={makeWebhookUrl} />
            
            {makeWebhookUrl && (
              <p className="text-xs text-gray-500 mt-2 px-2">
                Using webhook: {makeWebhookUrl.substring(0, 25)}...
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSharePlan}
            disabled={isEmailSending || isWhatsAppSending || isMakeSending || 
              (!shareOptions.email && !shareOptions.whatsapp && !shareOptions.make)}
          >
            {(isEmailSending || isWhatsAppSending || isMakeSending) ? "Sending..." : "Share Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareOptionsDialog;
