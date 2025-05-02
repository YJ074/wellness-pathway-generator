import React from 'react';
import { Ruler } from 'lucide-react';
import FormField from '@/components/ui/form-field';

// Helper functions (for cm/ft-inches conversions)
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

interface HeightSelectorProps {
  height: string; // cm
  heightFeet: string;
  heightInches: string;
  onInputChange: (field: string, value: string) => void;
}

// "Alarm-style" height selector: minimal, focus on simple rotating look
const HeightSelector: React.FC<HeightSelectorProps> = ({
  height,
  heightFeet = '',
  heightInches = '',
  onInputChange
}) => {
  // Keep conversions in sync between fields
  React.useEffect(() => {
    if (height && (heightFeet === '' || heightInches === '')) {
      const { feet, inches } = cmToFeetInches(height);
      onInputChange('heightFeet', feet);
      onInputChange('heightInches', inches);
    } else if ((heightFeet !== '' || heightInches !== '') && height === '') {
      const cm = feetInchesToCm(heightFeet, heightInches);
      onInputChange('height', cm);
    }
    // Only fire on change
    // eslint-disable-next-line
  }, [height, heightFeet, heightInches]);

  // Input handlers
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
    <fieldset className="border border-gray-300 rounded-md p-4 space-y-4">
      <legend className="text-base font-semibold text-gray-700 px-2">Height</legend>
      {/* sm:flex-row */}
      <div className="flex flex-col sm:space-x-4 space-y-4 sm:space-y-0 text-center"
        style={{
          alignItems: "center",
        }}>
        <div className="flex-1" 
          style={{
            width: "100%",
          }}>
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
        <div
          className="flex items-center justify-center gap-0 rounded-2xl bg-gradient-to-b from-white/70 via-neutral-100 to-white/70 border border-gray-200 shadow-inner px-0 py-0 relative"
          style={{
            minWidth: 172,
            // maxWidth: 220,
            width: "100%",
            margin: "0",
            marginTop: "10px",
            height: 70,
            overflow: "hidden",
          }}
        >
          {/* Track border-y*/}
          <div className="absolute ms-0 left-0 right-0 top-1/2 -translate-y-1/2 h-14 bg-white/60 z-10 rounded-xl pointer-events-none border-gray-200"
          style={{
            width: "100%",
          }} />
          {/* Feet */}
          <div className="flex flex-col items-center justify-center px-2 relative z-20"
            style={{
              width: "50%",
            }}>
            <input
              id="heightFeet"
              type="number"
              value={heightFeet}
              onChange={e => handleHeightFeetChange(e.target.value)}
              placeholder="Feet"
              min={0}
              max={9}
              className="w-full text-center text-2xl font-extrabold bg-transparent outline-none focus:ring-2 focus:ring-brand-blue rounded-lg transition-all duration-150 h-14
                [appearance:textfield] scrollbar-hide select-none"
              style={{
                fontVariantNumeric: "tabular-nums",
                fontSize: "medium",
                fontWeight: "400",
              }}
            />
            {/* <span className="block text-xs text-gray-500 mt-1">Feet</span> */}
          </div>
          <div className="w-px h-12 bg-gray-300 mx-0 relative z-20" />
          {/* Inches */}
          <div className="flex flex-col items-center justify-center px-2 relative z-20"
            style={{
              width: "50%",
            }}>
            <input
              id="heightInches"
              type="number"
              value={heightInches}
              onChange={e => handleHeightInchesChange(e.target.value)}
              placeholder="Inches"
              min={0}
              max={11}
              className="w-full text-center text-2xl font-extrabold bg-transparent outline-none focus:ring-2 focus:ring-brand-blue rounded-lg transition-all duration-150 h-14
                [appearance:textfield] scrollbar-hide select-none"
              style={{
                fontVariantNumeric: "tabular-nums",
                fontSize: "medium",
                fontWeight: "400",
              }}
            />
            {/* <span className="block text-xs text-gray-500 mt-1">Inches</span> */}
          </div>
          {/* Fades */}
          <div className="absolute left-0 top-0 w-8 h-full pointer-events-none z-30 bg-gradient-to-r from-white via-white/60 to-transparent" />
          <div className="absolute right-0 top-0 w-8 h-full pointer-events-none z-30 bg-gradient-to-l from-white via-white/60 to-transparent" />
        </div>
      </div>
    </fieldset>
  );
};

export default HeightSelector;
