'use client'
import { create } from 'zustand'
import LocalStorage from './localStorage'
import { EDisplayMode, DarkModeState } from '@/types/DisplayTypes'

/* 
  1. 저장 방식 변경(모드에 따라 theme을 저장하는 방향으로)
  2. localStorage 접근 방식 변경 (useEffect로 감싸도록 처리)
  3. https://velog.io/@ongddree/%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A7%8C%EB%93%A4%EA%B8%B0-%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84
*/

// TODO : 이렇게 하면 서버 컴포넌트는 무조건 다크모드로 처리가 됩니다.
export const useDarkMode = create<DarkModeState>((set, get) => {
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
      }
    })
  }

  return {
    darkMode:
      LocalStorage.getItem('mode') == EDisplayMode.light
        ? EDisplayMode.light
        : EDisplayMode.dark,
    useSystemTheme:
      LocalStorage.getItem('mode') == EDisplayMode.system ? true : false,
    isLightMode,
    toggleDarkMode,
    toggleSystemTheme,
  }
})
