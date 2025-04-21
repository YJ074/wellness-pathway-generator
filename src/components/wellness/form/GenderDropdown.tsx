
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select";

interface GenderDropdownProps {
  value: string;
  onChange: (gender: string) => void;
}

const GenderDropdown: React.FC<GenderDropdownProps> = ({ value, onChange }) => (
  <div>
    <label className="block mb-1 font-medium">Gender</label>
    <Select
      value={value}
      onValueChange={onChange}
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
);

export default GenderDropdown;
