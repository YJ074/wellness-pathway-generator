
import React from 'react';
import { User, Mail, Cake, Ruler, Weight, PhoneCall } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const handleMobileNumberChange = (value: string) => {
    // Remove any non-digit characters except the initial +91
    const cleanedValue = value.replace(/[^\d]/g, '');
    const formattedValue = cleanedValue.length > 0 ? `+91${cleanedValue}` : '+91';
    handleInputChange('mobileNumber', formattedValue);
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
          Mobile number must start with +91
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
          onChange={(e) => handleInputChange('email', e.target.value)}
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
