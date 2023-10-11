import { create } from 'zustand'
import LocalStorage from './localStorage'

interface IAuthStore {
  isLogin: boolean
  userId: number | null
  accessToken: string | null
  login: (accessToken: string) => void
  logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => {
  const authDataJSON = LocalStorage.getItem('authData')
  const authData = authDataJSON
    ? JSON.parse(authDataJSON)
    : { accessToken: null }

  return {
    isLogin: !!authData.accessToken,
    userId: authData.userId,
    accessToken: authData.accessToken,
    login: (accessToken) => {
      // save userId, accessToken to LocalStorage
      const authDataToSave = { accessToken }
      LocalStorage.setItem('authData', JSON.stringify(authDataToSave))
      // set state
      set(() => ({
        isLogin: true,
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
