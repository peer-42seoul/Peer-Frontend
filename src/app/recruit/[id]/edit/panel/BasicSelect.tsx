import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction } from 'react'
import useMedia from '@/hook/useMedia'

export enum ComponentType {
  Month = 'Month',
  TeamSize = 'TeamSize',
  Place = 'Place',
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
  }

  let options = null
  const { isPc } = useMedia()

  switch (type) {
    case ComponentType.Month:
      options = [
        '1주일',
        '2주일',
        '3주일',
        '4주일',
        '1개월',
        '2개월',
        '3개월',
        '4개월',
        '5개월',
        '6개월',
        '7개월',
        '8개월',
        '9개월',
        '10개월',
        '11개월',
        '12개월 이상',
      ].map((dueTo, idx) => (
        <MenuItem key={'dueTo' + idx} value={dueTo}>
          {dueTo}
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
    case ComponentType.Place:
      options = [
        <MenuItem key={0} value={'ONLINE'}>
          온라인
        </MenuItem>,
        <MenuItem key={1} value={'OFFLINE'}>
          오프라인
        </MenuItem>,
        <MenuItem key={2} value={'MIX'}>
          혼합
        </MenuItem>,
      ]
      break
    default:
      return null
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          sx={
            isPc
              ? { width: '26rem', height: '32px' }
              : { width: '100%', height: '32px' }
          }
          value={value}
          onChange={handleChange}
        >
          {options}
        </Select>
      </FormControl>
    </Box>
  )
}
