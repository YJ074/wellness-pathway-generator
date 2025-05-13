
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

import {
  useToast as useToastOriginal,
  toast as toastOriginal
} from "sonner"

type ToastActionProps = React.ComponentPropsWithoutRef<typeof ToastActionElement>

const useToast = () => {
  return {
    ...useToastOriginal(),
    toast: (props: ToastProps & { action?: ToastActionProps }) => {
      toastOriginal(props.title, {
        description: props.description,
        action: props.action,
        variant: props.variant,
        duration: props.duration
      });
    },
  }
}

export { useToast, toastOriginal as toast }
