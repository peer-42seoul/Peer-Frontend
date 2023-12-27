import { Theme } from '@mui/material'

export enum EDisplayMode {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

export type DarkModeState = {
  darkMode: EDisplayMode.dark | EDisplayMode.light
  useSystemTheme: boolean
  theme: Theme
  lightTheme: Theme
  darkTheme: Theme
  isLightMode: () => boolean
  toggleDarkMode: () => void
  toggleSystemTheme: () => void
  getModeFromLocalStorage: () => void
}
