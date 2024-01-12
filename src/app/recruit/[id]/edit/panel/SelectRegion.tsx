import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { koreaDistrict } from '@/constant/DistrictData'
import { Stack } from '@mui/material'
import useMedia from '@/hook/useMedia'

interface BasicSelectProps {
  setValue: Dispatch<SetStateAction<string[]>>
  region?: string[]
}

export default function SelectRegion({ setValue, region }: BasicSelectProps) {
  const [largeScaleData, setLargeScaleData] = useState<string>('')
  const [smallScaleData, setSmallScaleData] = useState<string>('')
  const { isPc } = useMedia()

  const handleChangeLargeScaleData = (event: SelectChangeEvent) => {
    setLargeScaleData(event.target.value as string)
    setValue([event.target.value as string, smallScaleData])
  }

  const handleChangeSmallScaleData = (event: SelectChangeEvent) => {
    setSmallScaleData(event.target.value as string)
    setValue([largeScaleData, event.target.value as string])
  }

  useEffect(() => {
    if (region) {
      setLargeScaleData(region[0])
      setSmallScaleData(region[1])
    }
  }, [region])

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
    <Stack
      sx={isPc ? { width: '26rem' } : { width: '100%' }}
      direction={'row'}
      gap={'1rem'}
    >
      <FormControl
        sx={
          isPc
            ? { width: '12.75rem', height: '2rem' }
            : { width: '100%', height: '2rem' }
        }
      >
        <Select
          sx={
            isPc
              ? { width: '12.75rem', height: '2rem' }
              : { width: '100%', height: '2rem' }
          }
          value={largeScaleData}
          onChange={handleChangeLargeScaleData}
        >
          {options1}
        </Select>
      </FormControl>
      <FormControl
        sx={isPc ? { width: '12.75rem' } : { width: '100%' }}
        fullWidth
      >
        <Select
          sx={
            isPc
              ? { width: '12.75rem', height: '2rem' }
              : { width: '100%', height: '2rem' }
          }
          value={smallScaleData}
          onChange={handleChangeSmallScaleData}
        >
          {options2}
        </Select>
      </FormControl>
    </Stack>
  )
}
