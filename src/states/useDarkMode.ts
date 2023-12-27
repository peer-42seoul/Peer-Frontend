'use client'
import { create } from 'zustand'
import LocalStorage from './localStorage'
import { EDisplayMode, DarkModeState } from '@/types/DisplayTypes'
import { darkTheme, lightTheme } from '@/constant/ColorTheme'

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

export const useDarkMode = create<DarkModeState>((set, get) => {
  // NOTE : 유저가 선호하는 테마를 알리지 않았을 경우, 기본 값으로 다크 모드가 제공됩니다.
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
        theme: newMode === EDisplayMode.light ? lightTheme : darkTheme,
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
        theme: getSystemTheme() === EDisplayMode.light ? lightTheme : darkTheme,
      }
    })
  }
  const getModeFromLocalStorage = () => {
    const mode = window.localStorage.getItem('mode')
    if (mode !== null) {
      if (mode === 'light') {
        set(() => ({
          theme: lightTheme,
          darkMode: EDisplayMode.light,
          useSystemTheme: false,
        }))
      } else if (mode === 'system') {
        set(() => ({
          theme:
            getSystemTheme() === EDisplayMode.light ? lightTheme : darkTheme,
          darkMode: getSystemTheme(),
          useSystemTheme: true,
        }))
      } else {
        set(() => ({
          theme: darkTheme,
          darkMode: EDisplayMode.dark,
          useSystemTheme: false,
        }))
      }
    }
  }

  return {
    darkMode: EDisplayMode.dark,
    useSystemTheme: true,
    theme: darkTheme,
    isLightMode,
    toggleDarkMode,
    toggleSystemTheme,
    getModeFromLocalStorage,
  }
})
