import React from 'react'
import { Select, MenuItem, Box, Typography } from '@mui/material'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import { UseFormTrigger } from 'react-hook-form'

interface IReportTypeSelectProps {
  field: any
  label: string
  trigger: UseFormTrigger<any>
}

const ReportTypeSelect = ({
  field,
  label,
  trigger,
}: IReportTypeSelectProps) => {
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
        onChange={async (e) => {
          field.onChange(e.target.value)
          await trigger(field.name)
        }}
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
