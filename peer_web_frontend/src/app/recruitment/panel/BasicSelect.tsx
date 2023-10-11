import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction } from 'react'

export enum ComponentType {
  Area = 'Area',
  Month = 'Month',
  TeamSize = 'TeamSize',
}

interface BasicSelectProps {
  type: ComponentType
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function BasicSelect({
  type,
  value,
  setValue,
}: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
    console.log(value)
  }

  let options = null

  switch (type) {
    case ComponentType.Area:
      options = [
        <MenuItem key={0} value={0}>
          구로구
        </MenuItem>,
        <MenuItem key={1} value={1}>
          API 땡겨와서 작업예정
        </MenuItem>,
      ]
      break
    case ComponentType.Month:
      options = Array.from({ length: 13 }, (_, index) => (
        <MenuItem key={index} value={index}>
          {index === 12
            ? '12개월 이상'
            : index === 0
            ? '1개월 미만'
            : `${index}개월`}
        </MenuItem>
      ))
      break
    case ComponentType.TeamSize:
      options = Array.from({ length: 9 }, (_, index) => (
        <MenuItem key={index + 2} value={index + 2}>
          {index + 2}
        </MenuItem>
      ))
      break
    default:
      return null
  }

  return (
    <Box sx={{ width: 150 }}>
      <FormControl fullWidth>
        <Select value={value} onChange={handleChange}>
          {options}
        </Select>
      </FormControl>
    </Box>
  )
}
