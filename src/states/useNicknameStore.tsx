import { create } from 'zustand'
import LocalStorage from './localStorage'

interface INicknameStore {
  nickname: string | null
  setNickname: (nickname: string) => void
  unsetNickname: () => void
}

const useNicknameStore = create<INicknameStore>((set) => {
  const nickname = LocalStorage.getItem('nickname')

  return {
    nickname: nickname,
    setNickname: (nickname) => {
      LocalStorage.setItem('nickname', nickname)
      set(() => ({
        nickname,
      }))
    },
    unsetNickname: () => {
      LocalStorage.removeItem('nickname')
      set(() => ({
        nickname: null,
      }))
    },
  }
})

export default useNicknameStore
