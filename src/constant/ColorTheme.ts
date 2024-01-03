import { EDisplayMode } from '@/types/DisplayTypes'
import { alpha, createTheme } from '@mui/material'

export const darkTheme = createTheme({
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
      disable: '#292C32',
      disabled: alpha('#9B9B9B', 0.5), // 기존에 디자이너님의 의도하신 것에 영향이 있을 수 있으나, textfield disabled 상태에서의 텍스트 색상을 위해 고쳤습니다.
    },
  },
})

export const lightTheme = createTheme({
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
  },
})
