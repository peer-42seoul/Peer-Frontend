import { InputLabel, Stack, Typography, TypographyProps } from '@mui/material'

interface IFieldWithLabelProps {
  labelIcon?: React.ReactNode
  label?: string
  id?: string
  labelProps?: TypographyProps
  children: React.ReactNode
}

const FieldWithLabel = (props: IFieldWithLabelProps) => {
  return (
    <Stack direction={'column'} spacing={'0.5rem'}>
      <InputLabel htmlFor={props.id}>
        <Stack
          direction={'row'}
          spacing={'0.25rem'}
          alignItems={'center'}
          sx={{ width: '100%', height: '1.5rem' }}
        >
          {props.labelIcon}
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
      {props.children}
    </Stack>
  )
}

export default FieldWithLabel
