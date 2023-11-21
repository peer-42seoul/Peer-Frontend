import { create } from 'zustand'

type DarkModeState = {
  darkMode: 'light' | 'dark'
  toggleDarkMode: () => void
}

export const useDarkMode = create<DarkModeState>((set) => ({
  darkMode: 'dark',
  toggleDarkMode: () =>
    set((state) => ({
      darkMode: state.darkMode === 'dark' ? 'light' : 'dark',
    })),
}))
