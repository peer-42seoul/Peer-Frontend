import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { koreaDistrict } from '@/constant/DistrictData'
import { Stack, Typography } from '@mui/material'
import * as style from '../../../[id]/edit/panel/SelectRegion.style'
import { Control, Controller, useFormState } from 'react-hook-form'
import { IRecruitWriteField } from '@/app/recruit/write/page'

interface BasicSelectProps {
  region: string[]
  control: Control<IRecruitWriteField, any>
}

// 해당 컴포넌트에는 react-hook-form을 제대로 적용하지 않았습니다.

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

  let options2 = koreaDistrict.smallScaleData[region[0] ?? '']
    ? koreaDistrict.smallScaleData[region[0] ?? ''].map((value) => {
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
            error={errors.region?.[0] ? true : false}
          >
            {options1}
          </Select>
        )}
        name={'region.0'}
        control={control}
        rules={{ required: '필수 입력 항목 입니다.' }}
      />

      <Controller
        render={({ field }) => (
          <Select
            {...field}
            sx={style.selectStyle}
            variant="outlined"
            error={errors.region?.[1] ? true : false}
          >
            {options2}
          </Select>
        )}
        name={'region.1'}
        control={control}
        rules={{ required: '필수 입력 항목 입니다.' }}
      />
    </Stack>
  )
}
