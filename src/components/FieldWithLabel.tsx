import {
  FormHelperText,
  InputLabel,
  Stack,
  SxProps,
  Typography,
  TypographyProps,
} from '@mui/material'

interface IFieldWithLabelProps {
  labelIcon?: React.ReactNode
  endIconButton?: React.ReactNode
  label?: string
  id?: string
  labelProps?: TypographyProps
  children: React.ReactNode
  formHelperText?: string
  sx?: SxProps
}

const FieldWithLabel = (props: IFieldWithLabelProps) => {
  return (
    <Stack
      direction={'column'}
      spacing={'0.5rem'}
      sx={{
        width: ['100%', 'fit-content'],
        ...props.sx,
      }}
    >
      <InputLabel htmlFor={props.id}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{ width: '100%', maxWidth: '26rem', height: '1.5rem' }}
        >
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
          {props.endIconButton}
        </Stack>
      </InputLabel>
      {props.children}
      <FormHelperText>
        <Typography variant={'Caption'} color={'error'} height={'1.125rem'}>
          {props?.formHelperText}
        </Typography>
      </FormHelperText>
    </Stack>
  )
}

export default FieldWithLabel
