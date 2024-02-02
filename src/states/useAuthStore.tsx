import { create } from 'zustand'
import LocalStorage from './localStorage'
import axios from 'axios'
import { setCookie } from 'cookies-next'
import useNicknameStore from './useNicknameStore'

interface IAuthStore {
  isLogin: boolean
  accessToken: string | null
  login: (accessToken: string) => void
  logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => {
  const authDataJSON = LocalStorage.getItem('authData')
  const authData = authDataJSON
    ? JSON.parse(authDataJSON)
    : { accessToken: null }

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  return {
    isLogin: !!authData.accessToken,
    accessToken: authData.accessToken,
    login: (accessToken) => {
      const authDataToSave = { accessToken }
      LocalStorage.setItem('authData', JSON.stringify(authDataToSave))
      console.log('accessToken', accessToken)
      setCookie('accessToken', accessToken)
      axios
        .get(`${API_URL}/api/v1/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const nickname = res.data.nickname
          useNicknameStore.getState().setNickname(nickname)
        })
      // set state
      set(() => ({
        isLogin: true,
        accessToken,
      }))
    },
    logout: () => {
      if (authData.accessToken) {
        axios.get(`${API_URL}/api/v1/logout`, {
          headers: {
            Authorization: `Bearer ${authData.accessToken}`,
          },
        })
      }
      LocalStorage.removeItem('authData')
      set(() => ({
        isLogin: false,
        accessToken: null,
      }))
      useNicknameStore.getState().unsetNickname()
    },
  }
})

export default useAuthStore
