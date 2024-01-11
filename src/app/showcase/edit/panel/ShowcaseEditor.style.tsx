import { SxProps } from '@mui/system'

const IconStyle: SxProps = {
  color: 'text.normal',
  width: '1rem',
  height: '1rem',
}

const ShowcaseImageStyle: SxProps = {
  width: '18.5rem',
  height: '12.5rem',
  objectFit: 'cover',
  borderRadius: '0.25rem',
  border: '1px solid',
  borderColor: 'line.alternative',
}

const AutocompleteStyle: SxProps = {
  '.MuiFormControl-root': {
    '.MuiInputBase-root': {
      input: {
        height: '2rem',
        width: '26rem',
        padding: '0rem 0.75rem',
      },
    },
  },
}

export { IconStyle, ShowcaseImageStyle, AutocompleteStyle }
