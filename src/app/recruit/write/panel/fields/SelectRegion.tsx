import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { koreaDistrict } from '@/constant/DistrictData'
import { Stack, Typography } from '@mui/material'
import * as style from './SelectRegion.style'
import { Control, Controller, useFormState } from 'react-hook-form'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'

interface BasicSelectProps {
  region: { large: string; small: string }
  control: Control<IRecruitWriteField, any>
}

export default function SelectRegion({ region, control }: BasicSelectProps) {
  const { errors } = useFormState<IRecruitWriteField>({ control })

  let options1 = [
    koreaDistrict.largeScaleData.map((value) => {
      return (
        <MenuItem key={value} value={value}>
          <Typography variant="Body2" color={'text.normal'}>
            {value}
          </Typography>
        </MenuItem>
      )
    }),
  ]

  let options2 = koreaDistrict.smallScaleData[region.large ?? '']
    ? koreaDistrict.smallScaleData[region.large ?? ''].map((value) => {
        return (
          <MenuItem key={value} value={value}>
            <Typography variant="Body2" color={'text.normal'}>
              {value}
            </Typography>
          </MenuItem>
        )
      })
    : []

  return (
    <Stack
      sx={{ width: ['100%', '26rem'], height: '2rem' }}
      direction={'row'}
      spacing={'1rem'}
    >
      <Controller
        render={({ field }) => (
          <Select
            {...field}
            sx={style.selectStyle}
            variant="outlined"
            error={errors.region?.large ? true : false}
          >
            {options1}
          </Select>
        )}
        name={'region.large'}
        control={control}
        rules={{ required: '필수 입력 항목 입니다.' }}
      />

      <Controller
        render={({ field }) => (
          <Select
            {...field}
            sx={style.selectStyle}
            variant="outlined"
            error={errors.region?.small ? true : false}
          >
            {options2}
          </Select>
        )}
        name={'region.small'}
        control={control}
        rules={{ required: '필수 입력 항목 입니다.' }}
      />
    </Stack>
  )
}
