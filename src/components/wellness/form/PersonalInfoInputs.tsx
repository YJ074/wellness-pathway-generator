
import React from 'react';
import { User, Mail, Cake, Ruler, Weight, PhoneCall } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PersonalInfoInputsProps {
  formData: {
    name: string;
    email: string;
    age: string;
    height: string;
    weight: string;
    mobileNumber: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

const PersonalInfoInputs = ({ formData, handleInputChange }: PersonalInfoInputsProps) => {
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleMobileNumberChange = (value: string) => {
    // Remove any non-digit characters except the initial +91
    const cleanedValue = value.replace(/[^\d]/g, '');
    const formattedValue = cleanedValue.length > 0 ? `+91${cleanedValue}` : '+91';
    
    // Validate mobile number (should be 10 digits after +91 and start with 6,7,8,9)
    if (cleanedValue.length > 0) {
      if (cleanedValue.length !== 10) {
        toast({
          title: "Invalid Mobile Number",
          description: "Please enter a valid 10-digit mobile number",
          variant: "destructive"
        });
      } else if (!['6', '7', '8', '9'].includes(cleanedValue[0])) {
        toast({
          title: "Invalid Mobile Number",
          description: "Mobile number must start with 6, 7, 8, or 9",
          variant: "destructive"
        });
      }
    }
    
    handleInputChange('mobileNumber', formattedValue);
  };

  const handleEmailChange = (value: string) => {
    handleInputChange('email', value);
    if (value.length > 0) {
      validateEmail(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" /> Name
        </Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile" className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4" /> Mobile Number
        </Label>
        <Input
          id="mobile"
          type="tel"
          required
          value={formData.mobileNumber}
          onChange={(e) => handleMobileNumberChange(e.target.value)}
          placeholder="+91 Enter your mobile number"
          className="w-full"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Mobile number must start with +91 and have 10 digits
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" /> Email
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="flex items-center gap-2">
          <Cake className="w-4 h-4" /> Age
        </Label>
        <Input
          id="age"
          type="number"
          required
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="height" className="flex items-center gap-2">
          <Ruler className="w-4 h-4" /> Height (cm)
        </Label>
        <Input
          id="height"
          type="number"
          required
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="flex items-center gap-2">
          <Weight className="w-4 h-4" /> Weight (kg)
        </Label>
        <Input
          id="weight"
          type="number"
          required
          value={formData.weight}
          onChange={(e) => handleInputChange('weight', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PersonalInfoInputs;
