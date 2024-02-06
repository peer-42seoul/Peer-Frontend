'use client'
import { create } from 'zustand'
import LocalStorage from './localStorage'
import { EDisplayMode, DarkModeState } from '@/types/DisplayTypes'
import { darkTheme, lightTheme } from '@/constant/ColorTheme'

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
    if (mode === 'light') {
      set(() => ({
        theme: lightTheme,
        darkMode: EDisplayMode.light,
        useSystemTheme: false,
      }))
    } else if (mode === 'system') {
      set(() => ({
        theme: getSystemTheme() === EDisplayMode.light ? lightTheme : darkTheme,
        darkMode: getSystemTheme(),
        useSystemTheme: true,
      }))
    } else {
      set(() => ({
        theme: darkTheme,
        darkMode: EDisplayMode.dark,
        useSystemTheme: false,
      }))
      if (mode === null) {
        LocalStorage.setItem('mode', EDisplayMode.dark)
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
