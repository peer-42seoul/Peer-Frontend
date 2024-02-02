import {
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import React, { forwardRef } from 'react'

const FieldWithLabel = forwardRef<HTMLInputElement, TextFieldProps>(
  function FieldWidthLabel(props, ref) {
    const title = props.title
    return (
      <Stack flexDirection={'column'} spacing={'0.5rem'}>
        <InputLabel htmlFor={props.id}>
          <Typography variant="Caption" color={'text.normal'}>
            {title}
          </Typography>
        </InputLabel>
        <TextField {...props} fullWidth inputRef={ref} />
      </Stack>
    )
  },
)

export default FieldWithLabel
