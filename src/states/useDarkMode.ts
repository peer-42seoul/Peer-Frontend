import { create } from 'zustand'
import LocalStorage from './localStorage'

enum EDisplayMode {
  dark = 'dark',
  light = 'light',
  system = 'system',
}

type DarkModeState = {
  darkMode: EDisplayMode.dark | EDisplayMode.light
  useSystemTheme: boolean
  toggleDarkMode: () => void
  toggleSystemTheme: () => void
}

export const useDarkMode = create<DarkModeState>((set) => {
  const mode = LocalStorage.getItem('mode')

  // NOTE : 이렇게 할 경우 유저가 선호하는 테마를 알리지 않았을 경우, 기본 값으로 다크 모드가 제공됩니다.
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches
      ? EDisplayMode.light
      : EDisplayMode.dark

  const toggleDarkMode = () => {
    LocalStorage.setItem(
      'mode',
      mode === EDisplayMode.dark ? EDisplayMode.light : EDisplayMode.dark,
    )
    set((state) => ({
      darkMode:
        state.darkMode === EDisplayMode.dark
          ? EDisplayMode.light
          : EDisplayMode.dark,
    }))
  }

  const toggleSystemTheme = () => {
    set((state) => {
      LocalStorage.setItem(
        'mode',
        mode === EDisplayMode.system ? state.darkMode : EDisplayMode.system,
      )
      return {
        ...state,
        darkMode: getSystemTheme(), // 시스템 설정을 건드렸을 때 항상 현재의 시스템 테마를 가져옴
        useSystemTheme: !state.useSystemTheme,
      }
    })
  }

  if (!mode) {
    // 로컬 스토리지에 mode가 없을 때
    LocalStorage.setItem('mode', EDisplayMode.dark)
    return {
      darkMode: EDisplayMode.dark,
      useSystemTheme: false,
      toggleDarkMode,
      toggleSystemTheme,
    }
  } else if (mode === EDisplayMode.system) {
    // 로컬 스토리지에 mode가 system일 때
    return {
      darkMode: getSystemTheme(),
      useSystemTheme: true,
      toggleDarkMode,
      toggleSystemTheme,
    }
  } else if (mode === EDisplayMode.dark) {
    // 로컬 스토리지에 mode가 dark일 때
    return {
      darkMode: EDisplayMode.dark,
      useSystemTheme: false,
      toggleDarkMode,
      toggleSystemTheme,
    }
  } else if (mode === EDisplayMode.light) {
    // 로컬 스토리지에 mode가 light일 때
    return {
      darkMode: EDisplayMode.light,
      useSystemTheme: false,
      toggleDarkMode,
      toggleSystemTheme,
    }
  }
  // 혹시나 모를 에러 방지를 위해
  return {
    darkMode: EDisplayMode.dark,
    useSystemTheme: false,
    toggleDarkMode,
    toggleSystemTheme,
  }
})
