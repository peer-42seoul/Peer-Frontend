import {
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from '@mui/material'
import React, { forwardRef } from 'react'

interface ITextFieldWithLabelProps extends Omit<TextFieldProps, 'outlined'> {
  label_icon?: React.ReactNode
  labelProps?: TypographyProps
}

const TextFieldWithLabel = forwardRef<
  HTMLInputElement,
  ITextFieldWithLabelProps
>(function TextFieldWithLabel(props, inputRef) {
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <InputLabel htmlFor={props.id}>
        <Stack
          direction={'row'}
          spacing={'0.25rem'}
          alignItems={'center'}
          sx={{ width: '100%', height: '1.5rem' }}
        >
          {props.label_icon}
          <Typography
            variant={'CaptionEmphasis'}
            color={'text.normal'}
            lineHeight={'normal'}
            {...props.labelProps}
          >
            {props.label}
          </Typography>
        </Stack>
      </InputLabel>
      <TextField {...props} label={undefined} inputRef={inputRef} />
    </Stack>
  )
})

export default TextFieldWithLabel
