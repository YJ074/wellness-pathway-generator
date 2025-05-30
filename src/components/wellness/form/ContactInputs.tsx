
import React from 'react';
import { Mail, PhoneCall } from 'lucide-react';
import FormField from '@/components/ui/form-field';
import { validateEmail, validateMobileNumber } from '@/utils/validation';

interface ContactInputsProps {
  email: string;
  mobileNumber: string;
  onInputChange: (field: string, value: string) => void;
}

const ContactInputs = ({ email, mobileNumber, onInputChange }: ContactInputsProps) => {
  const handleEmailChange = (value: string) => {
    onInputChange('email', value);
    if (value.length > 0) {
      validateEmail(value);
    }
  };

  const handleMobileNumberChange = (value: string) => {
    const formattedValue = validateMobileNumber(value);
    if (formattedValue !== null) {
      onInputChange('mobileNumber', formattedValue);
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
        helperText="Mobile number must start with +91 and have 10 digits. This will be used to send your plan."
      />
      
      <FormField
        id="email"
        label="Email"
        icon={Mail}
        value={email}
        type="email"
        onChange={handleEmailChange}
        placeholder="example@domain.com"
        helperText="Please enter a valid email address. Your wellness plan will be sent to this email."
      />
      
      <p className="text-xs text-muted-foreground mt-2">
        Your contact information will only be used to deliver your wellness plan and related updates.
      </p>
    </div>
  );
};

export default ContactInputs;
