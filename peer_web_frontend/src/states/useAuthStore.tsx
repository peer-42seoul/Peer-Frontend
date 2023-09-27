import { create } from 'zustand'
import LocalStorage from './localStorage'

interface IAuthStore {
  isLogin: boolean
  userId: number | null
  accessToken: string | null
  login: (userId: number, accessToken: string) => void
  logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => {
  const authDataJSON = LocalStorage.getItem('authData')
  const authData = authDataJSON
    ? JSON.parse(authDataJSON)
    : { userId: null, accessToken: null }

  return {
    isLogin: !!authData.accessToken,
    userId: authData.userId,
    accessToken: authData.accessToken,
    login: (userId, accessToken) => {
      // save userId, accessToken to LocalStorage
      const authDataToSave = { userId, accessToken }
      LocalStorage.setItem('authData', JSON.stringify(authDataToSave))
      // set state
      set(() => ({
        isLogin: true,
        userId,
        accessToken,
      }))
    },
    logout: () => {
      LocalStorage.removeItem('authData')
      set(() => ({
        isLogin: false,
        userId: null,
        accessToken: null,
        refreshToken: null,
      }))
    },
  }
})

export default useAuthStore
