import { EDisplayMode } from '@/types/DisplayTypes'
import { alpha, createTheme } from '@mui/material'

// 마지막 시도
const pretendardVariable = {
  fontFamily: 'Pretendard Variable',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    url("/fonts/PretendardVariable") format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const customBreakpoints = {
  xs: 0,
  sm: 480,
  md: 900,
  lg: 1200,
  xl: 1536,
}

export const darkTheme = createTheme({
  breakpoints: {
    values: customBreakpoints,
  },
  palette: {
    mode: EDisplayMode.dark,
    background: {
      primary: '#060623',
      secondary: '#18182B',
      tertiary: '#22223A',
      paper: '#060623',
      default: '#060623',
    },
    line: {
      main: '#35373E',
      base: '#35373E',
      alternative: '#2C2E35',
    },
    text: {
      strong: '#FFFFFF',
      primary: '#F6F6F6',
      normal: '#F6F6F6',
      alternative: '#9B9B9B',
      secondary: '#9B9B9B',
      assistive: '#42444C',
      disable: '#1E2024',
      disabled: alpha('#9B9B9B', 0.5), // 기존에 디자이너님의 의도하신 것에 영향이 있을 수 있으나, textfield disabled 상태에서의 텍스트 색상을 위해 고쳤습니다.
    },
    custom: {
      main: '#0F0F27',
      mobileNavTab: '#0F0F27', // 모바일 네비게이션 탭 배경색
    },
  },
  typography: {
    fontFamily: 'var(--main-font), Pretendard Variable, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: pretendardVariable,
    },
  },
})

export const lightTheme = createTheme({
  breakpoints: {
    values: customBreakpoints,
  },
  palette: {
    mode: EDisplayMode.light,
    background: {
      primary: '#FFFFFF',
      secondary: '#F7F8FA',
      tertiary: '#F1F3F8',
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
    line: {
      main: '#35373E',
      base: '#EAEBEE',
      alternative: '#DDDFE3',
    },
    text: {
      strong: '#000000',
      primary: '#1A1A1A',
      normal: '#1A1A1A',
      alternative: '#878B93',
      secondary: '#878B93',
      assistive: '#AEB1B9',
      disable: '#D7D9DE',
      disabled: alpha('#878B93', 0.5), // 기존에 디자이너님의 의도하신 것에 영향이 있을 수 있으나, textfield disabled 상태에서의 텍스트 색상을 위해 고쳤습니다.
    },
    custom: {
      main: '#F7F8FA',
      mobileNavTab: '#F7F8FA', // 모바일 네비게이션 탭 배경색. light 관련 사항은 여기 피그마 코멘트 참고
    },
  },
  typography: {
    fontFamily: 'var(--main-font) Pretendard Variable sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: pretendardVariable,
    },
  },
})
