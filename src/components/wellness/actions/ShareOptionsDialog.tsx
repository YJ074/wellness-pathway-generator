
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareWellnessPlan } from "@/utils/sharing";
import { FormData, DietPlan } from "../types";
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
import { Input } from "@/components/ui/input";

interface ShareOptionsDialogProps {
  formData: FormData;
  dietPlan: DietPlan;
}

const ShareOptionsDialog = ({ formData, dietPlan }: ShareOptionsDialogProps) => {
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isWhatsAppSending, setIsWhatsAppSending] = useState(false);
  const [isMakeSending, setIsMakeSending] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem("arogyam75_make_webhook") || "";
  });
  
  const [shareOptions, setShareOptions] = useState({
    email: true,
    whatsapp: true,
    make: false,
  });

  const handleSharePlan = async () => {
    if ((!shareOptions.email && !shareOptions.whatsapp && !shareOptions.make) ||
        (shareOptions.email && !formData.email) ||
        (shareOptions.whatsapp && !formData.mobileNumber) ||
        (shareOptions.make && !webhookUrl)) {
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
      setIsMakeSending(shareOptions.make);
      
      const result = await shareWellnessPlan(formData, dietPlan, {
        email: shareOptions.email,
        whatsapp: shareOptions.whatsapp,
        make: shareOptions.make ? webhookUrl : "",
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
      setIsMakeSending(false);
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
            />
            <Label htmlFor="share-make">
              Send to Make.com
            </Label>
          </div>
          
          {shareOptions.make && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="webhook-url">Make.com Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://hook.eu1.make.com/..."
                value={webhookUrl}
                onChange={(e) => {
                  setWebhookUrl(e.target.value);
                  if (e.target.value) {
                    localStorage.setItem("arogyam75_make_webhook", e.target.value);
                  }
                }}
              />
            </div>
          )}
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
