export enum EDisplayMode {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

export type DarkModeState = {
  darkMode: EDisplayMode.dark | EDisplayMode.light
  useSystemTheme: boolean
  isLightMode: () => boolean
  toggleDarkMode: () => void
  toggleSystemTheme: () => void
}
