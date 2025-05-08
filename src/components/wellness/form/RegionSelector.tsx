
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionSelector = ({ selectedRegion, onChange }: RegionSelectorProps) => {
  // Specific states
  const states = [
    { id: 'punjab', name: 'Punjab' },
    { id: 'haryana', name: 'Haryana' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'uttarpradesh', name: 'Uttar Pradesh' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'andhra', name: 'Andhra Pradesh' },
    { id: 'telangana', name: 'Telangana' },
    { id: 'westbengal', name: 'West Bengal' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'bihar', name: 'Bihar' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'goa', name: 'Goa' },
    { id: 'madhyapradesh', name: 'Madhya Pradesh' },
    { id: 'chhattisgarh', name: 'Chhattisgarh' },
    { id: 'assam', name: 'Assam' },
    { id: 'manipur', name: 'Manipur' },
    { id: 'meghalaya', name: 'Meghalaya' }
  ];

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
                <SelectItem value="no-preference">No Preference</SelectItem>
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
