'use client'
import { create } from 'zustand'
import LocalStorage from './localStorage'
import { EDisplayMode, DarkModeState } from '@/types/DisplayTypes'
import { alpha, createTheme } from '@mui/material'

/* 
  1. 저장 방식 변경(모드에 따라 theme을 저장하는 방향으로)
  2. localStorage 접근 방식 변경 (useEffect로 감싸도록 처리)
  3. https://velog.io/@ongddree/%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84
*/
declare module '@mui/material/styles' {
  interface PaletteColor {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
    disable?: string
  }

  interface SimplePaletteColorOptions {
    strong?: string
    normal?: string
    alternative?: string
    tinted?: string
    base?: string
    assistive?: string
  }

  interface TypeBackground {
    primary: string
    secondary: string
    tertiary: string
  }

  interface LineColors {
    base?: string
    alternative?: string
  }

  interface Palette {
    // common: CommonColors
    red: Palette['primary']
    blue: Palette['primary']
    purple: Palette['primary']
    green: Palette['primary']
    yellow: Palette['primary']
    pink: Palette['primary']
    line: Palette['primary']
  }

  interface PaletteOptions {
    // common?: CommonColorsOptions
    red?: PaletteOptions['primary']
    blue?: PaletteOptions['primary']
    purple?: PaletteOptions['primary']
    green?: PaletteOptions['primary']
    yellow?: PaletteOptions['primary']
    pink?: PaletteOptions['primary']
    line?: PaletteOptions['primary']
  }

  interface TypeText {
    strong: string
    normal: string
    alternative: string
    assistive: string
    disable: string
  }

  interface TypeTextOptions {
    strong?: string
    normal?: string
    alternative?: string
    assistive?: string
    disable?: string
  }
}

// TODO : 이렇게 하면 서버 컴포넌트는 무조건 다크모드로 처리가 됩니다.
export const useDarkMode = create<DarkModeState>((set, get) => {
  set(() => {
    const darkTheme = createTheme({
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
    const lightTheme = createTheme({
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
    return { lightTheme, darkTheme }
  })

  // NOTE : 이렇게 할 경우 유저가 선호하는 테마를 알리지 않았을 경우, 기본 값으로 다크 모드가 제공됩니다.
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? EDisplayMode.light
      : EDisplayMode.dark

  const isLightMode = () => {
    if (get().darkMode === EDisplayMode.light) {
      return true
    }
    return false
  }

  const toggleDarkMode = () => {
    set((state) => {
      const newMode =
        state.darkMode === EDisplayMode.dark
          ? EDisplayMode.light
          : EDisplayMode.dark

      LocalStorage.setItem('mode', newMode)
      return {
        darkMode: newMode,
        theme:
          newMode === EDisplayMode.light ? get().lightTheme : get().darkTheme,
      }
    })
  }

  const toggleSystemTheme = () => {
    set((state) => {
      const newMode = state.useSystemTheme
        ? getSystemTheme()
        : EDisplayMode.system
      LocalStorage.setItem('mode', newMode)
      return {
        useSystemTheme: !state.useSystemTheme,
        darkMode: getSystemTheme(), // 시스템 설정을 건드렸을 때 항상 현재의 시스템 테마를 가져옴
        theme:
          getSystemTheme() === EDisplayMode.light
            ? get().lightTheme
            : get().darkTheme,
      }
    })
  }
  const getModeFromLocalStorage = () => {
    const mode = window.localStorage.getItem('theme')
    if (mode !== null) {
      if (mode === 'light') {
        set((state) => ({
          theme: state.lightTheme,
          darkMode: EDisplayMode.light,
          useSystemTheme: false,
        }))
      } else if (mode === 'system') {
        set((state) => ({
          theme:
            getSystemTheme() === EDisplayMode.light
              ? state.lightTheme
              : state.darkTheme,
          darkMode: getSystemTheme(),
          useSystemTheme: true,
        }))
      } else {
        set((state) => ({
          theme: state.darkTheme,
          darkMode: EDisplayMode.dark,
          useSystemTheme: false,
        }))
      }
    }
  }

  return {
    darkMode: EDisplayMode.dark,
    useSystemTheme: true,
    lightTheme: get().lightTheme,
    darkTheme: get().darkTheme,
    theme: get().darkTheme,
    isLightMode,
    toggleDarkMode,
    toggleSystemTheme,
    getModeFromLocalStorage,
  }
})
