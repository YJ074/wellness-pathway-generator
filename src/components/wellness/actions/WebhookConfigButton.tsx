
import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getMakeWebhookUrl, setMakeWebhookUrl } from '@/utils/webhookService';
import { toast } from '@/hooks/use-toast';

const WebhookConfigButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(getMakeWebhookUrl());
  
  const handleSave = () => {
    if (!webhookUrl || !webhookUrl.includes('hook.eu1.make.com/')) {
      toast({
        title: "Invalid Webhook URL",
        description: "Please enter a valid Make.com webhook URL (should include hook.eu1.make.com/).",
        variant: "destructive",
      });
      return;
    }
    
    setMakeWebhookUrl(webhookUrl);
    toast({
      title: "Webhook URL Saved",
      description: "Your Make.com webhook URL has been saved successfully.",
    });
    setIsDialogOpen(false);
  };
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Configure Webhook
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
              value={webhookUrl} 
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hook.eu1.make.com/your-webhook-id"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              This URL will be used to send user data (name, email, mobile) to Make.com.
              Get your webhook URL by creating a scenario with a webhook trigger in Make.com.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Save Webhook URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookConfigButton;
