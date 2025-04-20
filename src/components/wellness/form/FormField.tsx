
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

const FormField = ({ 
  id, 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  type = "text",
  required = true,
  placeholder,
  helperText
}: FormFieldProps) => {
  return (
    <motion.div 
      className="space-y-2" 
      whileHover={{ scale: 1.01 }} 
      transition={{ duration: 0.2 }}
    >
      <Label htmlFor={id} className="flex items-center gap-2">
        <Icon className="w-4 h-4" /> {label}
      </Label>
      <Input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full transition-all duration-200 hover:border-brand-blue focus:border-brand-blue"
      />
      {helperText && (
        <p className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </motion.div>
  );
};

export default FormField;
