import { toast } from "@/hooks/use-toast";

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    toast({
      title: "Email Required",
      description: "Please enter your email address",
      variant: "destructive"
    });
    return false;
  }
  
  if (!emailRegex.test(email)) {
    toast({
      title: "Invalid Email",
      description: "Please enter a valid email address (e.g., example@domain.com)",
      variant: "destructive"
    });
    return false;
  }
  
  if (email.includes('..') || email.includes('@@')) {
    toast({
      title: "Invalid Email",
      description: "Email contains consecutive dots or @ symbols",
      variant: "destructive"
    });
    return false;
  }
  
  if (email.split('@')[0].length < 2) {
    toast({
      title: "Invalid Email",
      description: "Username part of email must be at least 2 characters",
      variant: "destructive"
    });
    return false;
  }
  
  return true;
};

export const validateMobileNumber = (
  value: string,
  showIncompleteToast: boolean = false // Only show incomplete toast if explicitly requested
) => {
  // If empty, return +91 as base
  if (!value) {
    return '+91';
  }

  // Make sure we're working with the correct prefix
  let formattedValue = value;
  if (!value.startsWith('+91')) {
    formattedValue = '+91' + value.replace(/[^\d]/g, '');
  }

  // Extract the number part after +91
  const numberPart = formattedValue.substring(3);
  const cleanedValue = numberPart.replace(/[^\d]/g, '');

  // Validate number length
  if (cleanedValue.length > 10) {
    toast({
      title: "Invalid Mobile Number",
      description: "Mobile number cannot exceed 10 digits",
      variant: "destructive"
    });
    return formattedValue.substring(0, 13); // Keep only valid portion
  }

  // Check if first digit is valid (6,7,8,9) when user has entered at least one digit
  if (cleanedValue.length > 0 && !['6', '7', '8', '9'].includes(cleanedValue[0])) {
    toast({
      title: "Invalid Mobile Number",
      description: "Mobile number must start with 6, 7, 8, or 9",
      variant: "destructive"
    });
    return '+91'; // Reset to base value
  }

  // Only show incomplete number message if explicitly requested (e.g., on blur or submit)
  if (
    showIncompleteToast &&
    cleanedValue.length > 0 &&
    cleanedValue.length < 10
  ) {
    toast({
      title: "Incomplete Mobile Number",
      description: "Please enter a complete 10-digit mobile number",
      variant: "destructive"
    });
  }

  // Return the current value as is - allow partial entry
  return formattedValue;
};
