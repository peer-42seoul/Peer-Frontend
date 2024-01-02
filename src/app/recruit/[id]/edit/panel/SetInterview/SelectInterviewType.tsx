import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
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
    <FormControl sx={{ width: '50.3rem', color: 'grey' }} variant="outlined">
      <Select
        id="answer-type-select"
        value={formType}
        onChange={handleChange}
        sx={{ height: '2.5rem' }}
      >
        {[
          { value: 'OPEN', label: '주관식' },
          { value: 'CLOSE', label: '객관식' },
          { value: 'CHECK', label: '체크박스' },
          { value: 'RATIO', label: '선형배율' },
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
  )
}

export default SelectInterviewType
