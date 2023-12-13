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
          id="answer-type-select"
          value={formType}
          onChange={handleChange}
        >
          {[
            { value: 'open', label: '주관식' },
            { value: 'close', label: '객관식' },
            { value: 'check', label: '체크박스' },
            { value: 'ratio', label: '선형배율' },
          ].map((item) => {
            return (
              <MenuItem
                key={item.value}
                value={item.value}
              >{`${item.label}`}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectInterviewType
