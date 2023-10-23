'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480, // mobile과 pc를 구분하기 위해 테마 설정을 하였습니다.
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MuiThemeProvider
