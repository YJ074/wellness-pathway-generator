
import React from 'react';
import { User, Cake, Ruler, Weight } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import FormField from '@/components/ui/form-field';

interface BasicInfoInputsProps {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: 'male' | 'female' | 'other';
  onInputChange: (field: string, value: string) => void;
}

const BasicInfoInputs = ({ 
  name, 
  age, 
  height, 
  weight, 
  gender,
  onInputChange 
}: BasicInfoInputsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        id="name"
        label="Name"
        icon={User}
        value={name}
        onChange={(value) => onInputChange('name', value)}
      />
      
      <FormField
        id="age"
        label="Age"
        icon={Cake}
        value={age}
        type="number"
        onChange={(value) => onInputChange('age', value)}
      />

      {/* Gender dropdown above height */}
      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <Select
          value={gender}
          onValueChange={(value) => onInputChange('gender', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <FormField
        id="height"
        label="Height (cm)"
        icon={Ruler}
        value={height}
        type="number"
        onChange={(value) => onInputChange('height', value)}
      />
      
      <FormField
        id="weight"
        label="Weight (kg)"
        icon={Weight}
        value={weight}
        type="number"
        onChange={(value) => onInputChange('weight', value)}
      />
    </div>
  );
};

export default BasicInfoInputs;
