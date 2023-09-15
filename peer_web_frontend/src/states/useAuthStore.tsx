import { create } from 'zustand'

interface IAuthStore {
  isLogin: boolean
  userId: number | null
  accessToken: string | null
  login: (userId: number, accessToken: string) => void
  logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => {
  const authDataJSON = localStorage.getItem('authData')
  const authData = authDataJSON
    ? JSON.parse(authDataJSON)
    : { userId: null, accessToken: null }

  return {
    isLogin: !!authData.accessToken,
    userId: authData.userId,
    accessToken: authData.accessToken,
    login: (userId, accessToken) => {
      // save userId, accessToken to localStorage
      const authDataToSave = { userId, accessToken }
      localStorage.setItem('authData', JSON.stringify(authDataToSave))
      // set state
      set(() => ({
        isLogin: true,
        userId,
        accessToken,
      }))
    },
    logout: () => {
      localStorage.removeItem('authData')
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
