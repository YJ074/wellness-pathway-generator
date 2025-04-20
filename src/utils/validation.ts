
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

export const validateMobileNumber = (value: string) => {
  // If empty or just +91, return +91 as base
  if (!value || value === '+91') {
    return '+91';
  }

  // Remove all spaces and special characters after +91
  let numberPart = value.startsWith('+91') ? value.substring(3) : value;
  const cleanedValue = numberPart.replace(/[^\d]/g, '');

  // Validate number length
  if (cleanedValue.length > 10) {
    toast({
      title: "Invalid Mobile Number",
      description: "Mobile number cannot exceed 10 digits",
      variant: "destructive"
    });
    return null;
  }

  // Check if first digit is valid (6,7,8,9) when length is at least 1
  if (cleanedValue.length > 0 && !['6', '7', '8', '9'].includes(cleanedValue[0])) {
    toast({
      title: "Invalid Mobile Number",
      description: "Mobile number must start with 6, 7, 8, or 9",
      variant: "destructive"
    });
    return null;
  }

  // Show incomplete number message only when user has started typing
  if (cleanedValue.length > 0 && cleanedValue.length < 10) {
    toast({
      title: "Incomplete Mobile Number",
      description: "Please enter a complete 10-digit mobile number",
      variant: "destructive"
    });
    return null;
  }

  // Validate complete number
  if (cleanedValue.length === 10) {
    const isValidPattern = /^[6-9]\d{9}$/.test(cleanedValue);
    if (!isValidPattern) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return null;
    }
  }

  return cleanedValue.length === 0 ? '+91' : `+91${cleanedValue}`;
};

