
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionSelector = ({ selectedRegion, onChange }: RegionSelectorProps) => {
  // Broad regions
  const regions = [
    { id: 'north', name: 'North Indian' },
    { id: 'south', name: 'South Indian' },
    { id: 'east', name: 'East Indian' },
    { id: 'west', name: 'West Indian' },
    { id: 'central', name: 'Central Indian' },
    { id: 'northeast', name: 'Northeast Indian' }
  ];
  
  // Specific states mapped to regions
  const states = [
    // North India
    { id: 'punjab', name: 'Punjab', region: 'north' },
    { id: 'haryana', name: 'Haryana', region: 'north' },
    { id: 'delhi', name: 'Delhi', region: 'north' },
    { id: 'uttarpradesh', name: 'Uttar Pradesh', region: 'north' },
    // South India
    { id: 'kerala', name: 'Kerala', region: 'south' },
    { id: 'tamilnadu', name: 'Tamil Nadu', region: 'south' },
    { id: 'karnataka', name: 'Karnataka', region: 'south' },
    { id: 'andhra', name: 'Andhra Pradesh', region: 'south' },
    { id: 'telangana', name: 'Telangana', region: 'south' },
    // East India
    { id: 'westbengal', name: 'West Bengal', region: 'east' },
    { id: 'odisha', name: 'Odisha', region: 'east' },
    { id: 'bihar', name: 'Bihar', region: 'east' },
    // West India
    { id: 'maharashtra', name: 'Maharashtra', region: 'west' },
    { id: 'gujarat', name: 'Gujarat', region: 'west' },
    { id: 'rajasthan', name: 'Rajasthan', region: 'west' },
    { id: 'goa', name: 'Goa', region: 'west' },
    // Central India
    { id: 'madhyapradesh', name: 'Madhya Pradesh', region: 'central' },
    { id: 'chhattisgarh', name: 'Chhattisgarh', region: 'central' },
    // Northeast India
    { id: 'assam', name: 'Assam', region: 'northeast' },
    { id: 'manipur', name: 'Manipur', region: 'northeast' },
    { id: 'meghalaya', name: 'Meghalaya', region: 'northeast' }
  ];

  // Group states by region
  const statesByRegion: Record<string, {id: string, name: string}[]> = {};
  regions.forEach(region => {
    statesByRegion[region.id] = states.filter(state => state.region === region.id);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-brand-blue" />
        <h3 className="font-medium">Regional Preferences</h3>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Select your regional food preference to enhance the cultural essence of your diet plan:
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="region-select" className="text-sm mb-1 block">Select Region</Label>
            <Select value={selectedRegion} onValueChange={onChange}>
              <SelectTrigger id="region-select" className="w-full">
                <SelectValue placeholder="Choose a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Preference</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                ))}
                <SelectItem value="" disabled className="font-semibold pt-2">States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>{state.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;
