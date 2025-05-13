
import {
  type ToastProps,
  type ToastActionElement,
} from "@/components/ui/toast"

import {
  toast as sonnerToast,
  Toaster,
} from "sonner"

// Define the structure for our custom toast function
interface ToastOptions {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
}

// Create a useToast hook that matches the API expectations
const useToast = () => {
  return {
    toast: (options: ToastOptions) => {
      const { title, description, action, variant, duration } = options
      
      // Determine styling based on variant
      const styling = variant === "destructive" ? { style: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" } } : {}
      
      // Call the sonner toast with our configuration
      return sonnerToast(title, {
        description,
        action,
        duration,
        ...styling
      })
    },
    // For compatibility with any code expecting a toast array with title, description, and action properties
    toasts: [] as Array<ToastProps & {
      id: string;
      title?: React.ReactNode;
      description?: React.ReactNode;
      action?: React.ReactNode;
    }>,
  }
}

// Define a standalone toast function with the same signature
const toast = (options: ToastOptions) => {
  const { title, description, action, variant, duration } = options
  
  // Determine styling based on variant
  const styling = variant === "destructive" ? { style: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" } } : {}
  
  // Call the sonner toast with our configuration
  return sonnerToast(title, {
    description,
    action,
    duration,
    ...styling
  })
}

export { useToast, toast }
