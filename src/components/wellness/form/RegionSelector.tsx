
import React from 'react';
import { MapPin } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegionSelectorProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const RegionSelector = ({ selectedRegion, onChange }: RegionSelectorProps) => {
  // Regional groups for better organization
  const regionGroups = [
    {
      label: "North India",
      regions: [
        { id: 'punjab', name: 'Punjab' },
        { id: 'haryana', name: 'Haryana' },
        { id: 'himachal', name: 'Himachal Pradesh' },
        { id: 'uttarakhand', name: 'Uttarakhand' },
        { id: 'uttarpradesh', name: 'Uttar Pradesh' },
        { id: 'delhi', name: 'Delhi' },
        { id: 'jammuandkashmir', name: 'Jammu & Kashmir' },
        { id: 'ladakh', name: 'Ladakh' },
      ]
    },
    {
      label: "South India",
      regions: [
        { id: 'kerala', name: 'Kerala' },
        { id: 'tamilnadu', name: 'Tamil Nadu' },
        { id: 'karnataka', name: 'Karnataka' },
        { id: 'andhra', name: 'Andhra Pradesh' },
        { id: 'telangana', name: 'Telangana' },
        { id: 'puducherry', name: 'Puducherry' },
      ]
    },
    {
      label: "East India",
      regions: [
        { id: 'westbengal', name: 'West Bengal' },
        { id: 'odisha', name: 'Odisha' },
        { id: 'bihar', name: 'Bihar' },
        { id: 'jharkhand', name: 'Jharkhand' },
      ]
    },
    {
      label: "West India",
      regions: [
        { id: 'gujarat', name: 'Gujarat' },
        { id: 'maharashtra', name: 'Maharashtra' },
        { id: 'goa', name: 'Goa' },
        { id: 'rajasthan', name: 'Rajasthan' },
      ]
    },
    {
      label: "Central India",
      regions: [
        { id: 'madhyapradesh', name: 'Madhya Pradesh' },
        { id: 'chhattisgarh', name: 'Chhattisgarh' },
      ]
    },
    {
      label: "Northeast India",
      regions: [
        { id: 'assam', name: 'Assam' },
        { id: 'arunachal', name: 'Arunachal Pradesh' },
        { id: 'manipur', name: 'Manipur' },
        { id: 'meghalaya', name: 'Meghalaya' },
        { id: 'mizoram', name: 'Mizoram' },
        { id: 'nagaland', name: 'Nagaland' },
        { id: 'sikkim', name: 'Sikkim' },
        { id: 'tripura', name: 'Tripura' },
      ]
    }
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
                
                {regionGroups.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.regions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                    ))}
                  </SelectGroup>
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
