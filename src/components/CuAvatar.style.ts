import { Theme } from '@mui/material'

// docs: https://mui.com/material-ui/react-avatar/

export const CuAvatar = {
  bgcolor: '#FFFFFF',
  border: (theme: Theme) => `1px solid ${theme.palette.line.alternative}`,
}
