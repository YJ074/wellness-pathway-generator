
import { Toast, toast as sonnerToast } from "sonner";
import { useToast as useToastShadcn } from "@/components/ui/toast";

// Re-exporting the useToast hook from shadcn
export const useToast = useToastShadcn;

// Create an enhanced toast function that logs to console for debugging
export const toast = (props: Toast) => {
  // Log toast events for debugging webhook-related notifications
  if (props.title?.includes("Webhook") || props.description?.includes("webhook")) {
    console.log(`Toast notification: ${props.title} - ${props.description}`);
  }
  
  // Use the original toast function
  return sonnerToast(props);
};
