import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export const SelectInterviewType = ({
  formType,
  setFormType,
}: {
  formType: string
  setFormType: Dispatch<SetStateAction<string>>
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setFormType(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formType}
          onChange={handleChange}
        >
          {['주관식', '객관식', '체크박스', '선형배율'].map((value) => {
            return <MenuItem key={value} value={value}>{`${value}`}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectInterviewType
