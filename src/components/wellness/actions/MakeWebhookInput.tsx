
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Webhook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface MakeWebhookInputProps {
  onWebhookChange: (url: string) => void;
  webhookUrl: string;
}

const MakeWebhookInput = ({ onWebhookChange, webhookUrl }: MakeWebhookInputProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempWebhookUrl, setTempWebhookUrl] = useState(webhookUrl);
  
  const handleSaveWebhook = () => {
    // Simple validation for Make.com webhook URL
    if (tempWebhookUrl && !tempWebhookUrl.includes("hook.make.com") && !tempWebhookUrl.includes("hook.integromat.com")) {
      toast({
        title: "Invalid Webhook URL",
        description: "Please enter a valid Make.com webhook URL (should contain hook.make.com or hook.integromat.com)",
        variant: "destructive",
      });
      return;
    }
    
    onWebhookChange(tempWebhookUrl);
    setIsDialogOpen(false);
    
    toast({
      title: "Webhook URL Saved",
      description: tempWebhookUrl ? "Make.com webhook URL has been saved" : "Webhook URL has been cleared",
    });
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Webhook className="mr-2 h-4 w-4" />
          {webhookUrl ? "Edit Make.com Webhook" : "Add Make.com Webhook"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Make.com Webhook</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Make.com Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://hook.make.com/your-webhook-id"
              value={tempWebhookUrl}
              onChange={(e) => setTempWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Enter the webhook URL from your Make.com scenario. This will be used to send wellness plan data for WhatsApp and email delivery.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveWebhook}>Save Webhook URL</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MakeWebhookInput;
