import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import CuTextFieldLabel from '@/components/CuTextFieldLabel';

interface ReportTypeSelectProps {
  field: any;
  label: string;
  options: string[];
}

const ReportTypeSelect = ({ field, label, options } : ReportTypeSelectProps) => {
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <CuTextFieldLabel htmlFor={field.name} style={{ width: '120px' }}>
        {label}
      </CuTextFieldLabel>
      <Select
        labelId={`${field.name}-label`}
        {...field}
        sx={{ width: '200px' }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default ReportTypeSelect;
