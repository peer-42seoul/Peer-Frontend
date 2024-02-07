import { TControl } from '@/types/TControl'
import { Select, SelectProps } from '@mui/material'
import React from 'react'
import { FieldValues, useController } from 'react-hook-form'

type TProps<T extends FieldValues> = SelectProps & TControl<T>

const ControlledSelect = <T extends FieldValues>(props: TProps<T>) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  })

  return (
    <Select
      variant="outlined"
      {...field}
      {...(props as SelectProps)}
      onBlur={(e) => {
        props.onBlur && props.onBlur(e)
        field.onBlur()
      }}
    >
      {props.children}
    </Select>
  )
}

export default ControlledSelect
