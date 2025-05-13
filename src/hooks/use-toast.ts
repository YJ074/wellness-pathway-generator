
import {
  type ToastProps,
  type ToastActionElement,
} from "@/components/ui/toast"

import {
  toast as toastOriginal,
  Toaster,
  type Toast as SonnerToast,
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
      return toastOriginal(title, {
        description,
        action,
        duration,
        ...styling
      })
    },
    // For compatibility with any code expecting a toast array
    toasts: [] as ToastProps[],
  }
}

// Export both the hook and the direct toast function
export { useToast, toastOriginal as toast }
