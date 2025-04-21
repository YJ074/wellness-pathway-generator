import React from 'react';
import { User, Cake, Ruler, Weight } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";
import FormField from '@/components/ui/form-field';

// Helper functions for conversion
function cmToFeetInches(cmStr: string) {
  const cm = parseFloat(cmStr || '0');
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet: feet.toString(), inches: inches.toString() };
}

function feetInchesToCm(feetStr: string, inchesStr: string) {
  const feet = parseFloat(feetStr || '0');
  const inches = parseFloat(inchesStr || '0');
  const cm = (feet * 12 + inches) * 2.54;
  return Math.round(cm).toString();
}

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
  // Keep local conversions from cm <-> ft/in for UI sync
  React.useEffect(() => {
    // Sync feet/inch with cm
    if (height && (heightFeet === '' || heightInches === '')) {
      const { feet, inches } = cmToFeetInches(height);
      onInputChange('heightFeet', feet);
      onInputChange('heightInches', inches);
    }
    // Sync cm with feet/inches
    else if ((heightFeet !== '' || heightInches !== '') && height === '') {
      const cm = feetInchesToCm(heightFeet, heightInches);
      onInputChange('height', cm);
    }
  }, [height, heightFeet, heightInches, onInputChange]);
  
  // Change handlers for synced state
  const handleHeightCmChange = (value: string) => {
    onInputChange('height', value);
    const { feet, inches } = cmToFeetInches(value);
    onInputChange('heightFeet', feet);
    onInputChange('heightInches', inches);
  };
  const handleHeightFeetChange = (value: string) => {
    onInputChange('heightFeet', value);
    const cm = feetInchesToCm(value, heightInches || '0');
    onInputChange('height', cm);
  };
  const handleHeightInchesChange = (value: string) => {
    onInputChange('heightInches', value);
    const cm = feetInchesToCm(heightFeet || '0', value);
    onInputChange('height', cm);
  };

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
      
      <div className="flex gap-2">
        {/* Height in cm */}
        <div className="w-1/2">
          <FormField
            id="height"
            label="Height (cm)"
            icon={Ruler}
            value={height}
            type="number"
            onChange={handleHeightCmChange}
            helperText="Auto-syncs with ft/in"
          />
        </div>
        {/* Height in ft/in */}
        <div className="w-1/2 flex items-end gap-2">
          <FormField
            id="heightFeet"
            label="Height (ft)"
            icon={Ruler}
            value={heightFeet || ''}
            type="number"
            onChange={handleHeightFeetChange}
            required={false}
          />
          <FormField
            id="heightInches"
            label="Height (in)"
            icon={Ruler}
            value={heightInches || ''}
            type="number"
            onChange={handleHeightInchesChange}
            required={false}
          />
        </div>
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
