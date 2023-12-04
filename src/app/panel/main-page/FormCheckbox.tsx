import { Checkbox, Stack, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormCheckbox = ({
  name,
  label,
  control,
  value,
}: {
  name: string
  label: string
  control: any
  value?: string
}) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          value ? (
            <Checkbox {...field} checked={!!value} />
          ) : (
            <Checkbox {...field} checked={field.value} />
          )
        }
      />
      <Typography>{label}</Typography>
    </Stack>
  )
}

export default FormCheckbox
