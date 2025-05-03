
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Mail, Share, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendPlanViaEmail, sendPlanViaWhatsApp, shareWellnessPlan } from "@/utils/sharing";
import WellnessPDF from "./WellnessPDF";
import { FormData, DietPlan } from "./types";
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
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareOptions, setShareOptions] = useState({
    email: true,
    whatsapp: true,
  });

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
      
      const result = await shareWellnessPlan(formData, dietPlan, shareOptions);
      
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
          {isWhatsAppSending ? "Sending..." : "WhatsApp"}
        </Button>

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

        <Button onClick={onReset} variant="outline">
          Back to Form
        </Button>
      </div>
    </div>
  );
};

export default WellnessResultsHeaderActions;
