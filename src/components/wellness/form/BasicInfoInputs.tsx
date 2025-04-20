import React from 'react';
import { User, Cake, Ruler, Weight } from 'lucide-react';
import FormField from '@/components/ui/form-field';

interface BasicInfoInputsProps {
  name: string;
  age: string;
  height: string;
  weight: string;
  onInputChange: (field: string, value: string) => void;
}

const BasicInfoInputs = ({ 
  name, 
  age, 
  height, 
  weight, 
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
