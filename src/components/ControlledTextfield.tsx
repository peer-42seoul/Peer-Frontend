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
      autoComplete="off"
      variant="outlined"
      {...field}
      {...(props as TextFieldProps)}
      onChange={(e) => {
        field.onChange(e)
        props.onChange && props.onChange(e)
      }}
      onBlur={(e) => {
        field.onBlur()
        props.onBlur && props.onBlur(e)
      }}
    />
  )
}
export default ControlledTextfield
