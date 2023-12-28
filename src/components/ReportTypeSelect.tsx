import React from 'react'
import { Select, MenuItem, Box, Typography } from '@mui/material'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

interface IReportTypeSelectProps {
  field: any
  label: string
}

const ReportTypeSelect = ({ field, label }: IReportTypeSelectProps) => {
  const options = ['광고', '비방', '선전성', '도배', '기타']
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <CuTextFieldLabel htmlFor={field.name} style={{ width: '120px' }}>
        <Typography variant="Body2">{label}</Typography>
      </CuTextFieldLabel>
      <Select
        labelId={`${field.name}-label`}
        {...field}
        sx={{ width: '200px' }}
        placeholder="신고 유형을 선택해주세요."
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default ReportTypeSelect
