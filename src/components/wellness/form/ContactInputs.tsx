
import React from 'react';
import { Mail, PhoneCall } from 'lucide-react';
import FormField from '@/components/ui/form-field';
import { validateEmail, validateMobileNumber } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';

interface ContactInputsProps {
  email: string;
  mobileNumber: string;
  onInputChange: (field: string, value: string) => void;
}

const ContactInputs = ({ email, mobileNumber, onInputChange }: ContactInputsProps) => {
  const { toast } = useToast();

  const handleEmailChange = (value: string) => {
    onInputChange('email', value);
    if (value.length > 0) {
      const isValid = validateEmail(value);
      if (!isValid) {
        toast({
          title: "Email Format",
          description: "Please enter a valid email address for plan delivery",
          variant: "destructive"
        });
      }
    }
  };

  const handleMobileNumberChange = (value: string) => {
    const formattedValue = validateMobileNumber(value);
    if (formattedValue !== null) {
      onInputChange('mobileNumber', formattedValue);
      
      // Provide feedback about WhatsApp availability
      if (formattedValue.startsWith('+91') && formattedValue.length >= 13) {
        toast({
          title: "WhatsApp Ready",
          description: "Your wellness plan can be sent via WhatsApp to this number",
        });
      }
    } else {
      toast({
        title: "Phone Format",
        description: "Please enter a valid mobile number starting with +91",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        id="mobile"
        label="Mobile Number"
        icon={PhoneCall}
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        placeholder="+91 Enter your mobile number"
        helperText="Mobile number must start with +91 and have 10 digits for WhatsApp delivery"
      />
      
      <FormField
        id="email"
        label="Email"
        icon={Mail}
        value={email}
        type="email"
        onChange={handleEmailChange}
        placeholder="example@domain.com"
        helperText="Please enter a valid email address for plan delivery"
      />
    </div>
  );
};

export default ContactInputs;
