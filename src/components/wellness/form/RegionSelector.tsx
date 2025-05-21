
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionSelector = ({ selectedRegion, onChange }: RegionSelectorProps) => {
  // Complete list of all Indian states and union territories
  const states = [
    { id: 'andhra', name: 'Andhra Pradesh' },
    { id: 'arunachal', name: 'Arunachal Pradesh' },
    { id: 'arunachalpradesh', name: 'Arunachal Pradesh' },
    { id: 'assam', name: 'Assam' },
    { id: 'bihar', name: 'Bihar' },
    { id: 'chhattisgarh', name: 'Chhattisgarh' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'goa', name: 'Goa' },
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'haryana', name: 'Haryana' },
    { id: 'himachalpradesh', name: 'Himachal Pradesh' },
    { id: 'jharkhand', name: 'Jharkhand' },
    { id: 'jammuandkashmir', name: 'Jammu & Kashmir' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'ladakh', name: 'Ladakh' },
    { id: 'madhyapradesh', name: 'Madhya Pradesh' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'manipur', name: 'Manipur' },
    { id: 'meghalaya', name: 'Meghalaya' },
    { id: 'mizoram', name: 'Mizoram' },
    { id: 'nagaland', name: 'Nagaland' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'punjab', name: 'Punjab' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'sikkim', name: 'Sikkim' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'telangana', name: 'Telangana' },
    { id: 'tripura', name: 'Tripura' },
    { id: 'uttarakhand', name: 'Uttarakhand' },
    { id: 'uttarpradesh', name: 'Uttar Pradesh' },
    { id: 'westbengal', name: 'West Bengal' },
    { id: 'andamanandnicobar', name: 'Andaman & Nicobar Islands' },
    { id: 'chandigarh', name: 'Chandigarh' },
    { id: 'dadraandnagarhaveli', name: 'Dadra & Nagar Haveli and Daman & Diu' },
    { id: 'lakshadweep', name: 'Lakshadweep' },
    { id: 'puducherry', name: 'Puducherry' }
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
