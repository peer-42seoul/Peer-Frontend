import { create } from 'zustand'

type DarkModeState = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useDarkMode = create<DarkModeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}))
