import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { koreaDistrict } from '@/constant/DistrictData'

interface BasicSelectProps {
  setValue: Dispatch<SetStateAction<string[]>>
}

export default function SelectRegion({ setValue }: BasicSelectProps) {
  const [largeScaleData, setLargeScaleData] = useState<string>('')
  const [smallScaleData, setSmallScaleData] = useState<string>('')

  const handleChangeLargeScaleData = (event: SelectChangeEvent) => {
    setLargeScaleData(event.target.value as string)
  }

  const handleChangeSmallScaleData = (event: SelectChangeEvent) => {
    setSmallScaleData(event.target.value as string)
  }

  useEffect(() => {
    setValue([largeScaleData, smallScaleData])
  }, [largeScaleData, smallScaleData])

  let options1 = [
    koreaDistrict.largeScaleData.map((value) => {
      return (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      )
    }),
  ]

  let options2 = koreaDistrict.smallScaleData[largeScaleData]
    ? koreaDistrict.smallScaleData[largeScaleData].map((value) => {
        return (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        )
      })
    : []

  return (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'row' }}>
      <FormControl fullWidth>
        <Select value={largeScaleData} onChange={handleChangeLargeScaleData}>
          {options1}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select value={smallScaleData} onChange={handleChangeSmallScaleData}>
          {options2}
        </Select>
      </FormControl>
    </Box>
  )
}
