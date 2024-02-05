import { TextField, TextFieldProps } from '@mui/material'
import { FieldValues, useController } from 'react-hook-form'
import { TControl } from '@/types/TControl'

type TProps<T extends FieldValues> = TextFieldProps & TControl<T>

const ControlledTextfield = <T extends FieldValues>(props: TProps<T>) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  })

  return (
    <TextField
      variant="outlined"
      {...field}
      {...(props as TextFieldProps)}
      onBlur={(e) => {
        props.onBlur && props.onBlur(e)
        field.onBlur()
      }}
    />
  )
}
export default ControlledTextfield
