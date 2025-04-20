
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
  if (value.startsWith('+91')) {
    const numberPart = value.substring(3);
    const cleanedValue = numberPart.replace(/[^\d]/g, '');
    
    if (cleanedValue.length > 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Mobile number cannot exceed 10 digits",
        variant: "destructive"
      });
      return null;
    }

    if (cleanedValue.length > 0 && cleanedValue.length !== 10) {
      toast({
        title: "Incomplete Mobile Number",
        description: "Please enter a complete 10-digit mobile number",
        variant: "destructive"
      });
      return null;
    }

    if (cleanedValue.length === 10 && !['6', '7', '8', '9'].includes(cleanedValue[0])) {
      toast({
        title: "Invalid Mobile Number",
        description: "Mobile number must start with 6, 7, 8, or 9",
        variant: "destructive"
      });
      return null;
    }
    
    return `+91${cleanedValue}`;
  }
  return '+91';
};
