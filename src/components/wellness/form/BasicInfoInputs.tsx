
import React from 'react';
import { User, Cake, Weight } from 'lucide-react';
import FormField from '@/components/ui/form-field';
import HeightSelector from './HeightSelector';
import GenderDropdown from './GenderDropdown';

interface BasicInfoInputsProps {
  name: string;
  age: string;
  height: string; // in cm
  weight: string;
  gender: 'male' | 'female' | 'other';
  heightFeet?: string;
  heightInches?: string;
  onInputChange: (field: string, value: string) => void;
}

const BasicInfoInputs = ({
  name,
  age,
  height,
  weight,
  gender,
  heightFeet = '',
  heightInches = '',
  onInputChange
}: BasicInfoInputsProps) => {
  return (
    <div className="space-y-6">
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
      <div className="space-y-4">
        <GenderDropdown value={gender} onChange={(val) => onInputChange('gender', val)} />
        <HeightSelector
          height={height}
          heightFeet={heightFeet}
          heightInches={heightInches}
          onInputChange={onInputChange}
        />
      </div>
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
