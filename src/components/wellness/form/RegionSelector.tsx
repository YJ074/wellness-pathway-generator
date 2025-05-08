
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionSelector = ({ selectedRegion, onChange }: RegionSelectorProps) => {
  const regions = [
    { id: 'north', name: 'North Indian' },
    { id: 'south', name: 'South Indian' },
    { id: 'east', name: 'East Indian' },
    { id: 'west', name: 'West Indian' },
    { id: 'central', name: 'Central Indian' },
    { id: 'northeast', name: 'Northeast Indian' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand-blue" />
        <h3 className="font-medium">Regional Preferences</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Select your regional food preference to enhance the cultural essence of your diet plan:
      </p>
      
      <RadioGroup
        value={selectedRegion}
        onValueChange={onChange}
        className="grid grid-cols-2 gap-2 pt-2"
      >
        {regions.map((region) => (
          <div key={region.id} className="flex items-center space-x-2">
            <RadioGroupItem value={region.id} id={`region-${region.id}`} />
            <Label
              htmlFor={`region-${region.id}`}
              className="cursor-pointer text-sm"
            >
              {region.name}
            </Label>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="" id="region-none" />
          <Label htmlFor="region-none" className="cursor-pointer text-sm">
            No Preference
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RegionSelector;
