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
        {/* Gender dropdown */}
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <Select
            value={gender}
            onValueChange={(value) => onInputChange('gender', value)}
          >
            <SelectTrigger className="w-full" aria-label="Select gender">
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

        {/* Height inputs group rounded and background */}
        <fieldset className="border border-gray-300 rounded-md p-4 space-y-4">
          <legend className="text-base font-semibold text-gray-700 px-2">Height</legend>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
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
            {/* MOBILE-STYLE TIME/ALARM PICKER FOR FEET/INCHES */}
            <div className="flex items-center gap-0 rounded-xl bg-neutral-100 border border-gray-200 shadow-inner px-2 py-1"
                 style={{ minWidth: 172, maxWidth: 220, width: "100%", height: 64 }}>
              {/* Feet */}
              <div className="w-24 flex flex-col items-center justify-center px-2">
                <input
                  id="heightFeet"
                  type="number"
                  value={heightFeet}
                  onChange={e => handleHeightFeetChange(e.target.value)}
                  placeholder="Feet"
                  min={0}
                  max={9}
                  className="w-full text-center text-2xl font-bold bg-transparent outline-none focus:ring-2 focus:ring-brand-blue rounded-md transition-all duration-150 h-12"
                  style={{
                    appearance: "textfield",
                    scrollbarWidth: "none"
                  }}
                />
                <span className="block text-xs text-gray-500 mt-1">Feet</span>
              </div>
              {/* Divider */}
              <div className="w-px h-8 bg-gray-300 mx-1" />
              {/* Inches */}
              <div className="w-24 flex flex-col items-center justify-center px-2">
                <input
                  id="heightInches"
                  type="number"
                  value={heightInches}
                  onChange={e => handleHeightInchesChange(e.target.value)}
                  placeholder="Inches"
                  min={0}
                  max={11}
                  className="w-full text-center text-2xl font-bold bg-transparent outline-none focus:ring-2 focus:ring-brand-blue rounded-md transition-all duration-150 h-12"
                  style={{
                    appearance: "textfield",
                    scrollbarWidth: "none"
                  }}
                />
                <span className="block text-xs text-gray-500 mt-1">Inches</span>
              </div>
            </div>
          </div>
        </fieldset>
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
