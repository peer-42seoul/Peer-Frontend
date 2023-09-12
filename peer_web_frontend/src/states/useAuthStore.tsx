import { create } from 'zustand'

interface IAuthStore {
  isLogin: boolean
  userId: number | null
  accessToken: string | null
  refreshToken: string | null
  logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  isLogin: false,
  userId: null,
  accessToken: null,
  refreshToken: null,
  logout: () =>
    set(() => ({
      isLogin: false,
      userId: null,
      accessToken: null,
      refreshToken: null,
    })),
}))

export default useAuthStore
