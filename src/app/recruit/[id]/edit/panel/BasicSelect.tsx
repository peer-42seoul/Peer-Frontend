import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction } from 'react'

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
    console.log(value)
  }

  let options = null

  switch (type) {
    case ComponentType.Month:
      // options = [
      //   ...Array.from({ length: 3 }, (_, index) => (
      //     <MenuItem key={index} value={index}>
      //       {`${index + 1}주`}
      //     </MenuItem>
      //   )),
      //   ...Array.from({ length: 11 }, (_, index) => (
      //     <MenuItem key={index + 3} value={index + 3}>
      //       {`${index + 1}개월`}
      //     </MenuItem>
      //   )),
      //   <MenuItem key={14} value={14}>
      //     {'12개월 이상'}
      //   </MenuItem>,
      options = 
        [
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
          '12개월',
          '12개월 이상',
        ].map((dueTo, idx) => (
          <MenuItem key={'dueTo' + idx} value={dueTo}>
            {dueTo}
          </MenuItem>
        ))
      ;
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
        <MenuItem key={0} value={'온라인'}>
          온라인
        </MenuItem>,
        <MenuItem key={1} value={'오프라인'}>
          오프라인
        </MenuItem>,
        <MenuItem key={2} value={'혼합'}>
          혼합
        </MenuItem>,
      ]
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
