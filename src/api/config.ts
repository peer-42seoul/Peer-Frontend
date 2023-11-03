import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import useAuthStore from '@/states/useAuthStore'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

const useAxiosWithAuth = () => {
  const accessToken = useAuthStore.getState().accessToken
  const [cookies] = useCookies(['refreshToken'])
  const refreshToken = cookies.refreshToken

  const router = useRouter()

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error) => {
      if (error.response?.status === 401) {
        if (!refreshToken) {
          // 로그아웃 후 리디렉션
          useAuthStore.getState().logout()
          router.push('/login?redirect=401')
        } else {
          try {
            // accessToken 갱신 요청
            const response = await axiosInstance.post(
              '/api/v1/signin/reissue',
              {
                refreshToken: refreshToken,
              },
            )

            const newAccessToken = response.data.accessToken
            useAuthStore.getState().login(newAccessToken)

            // 이전 요청을 재시도
            return axiosInstance(error.config)
          } catch (refreshError) {
            // 로그아웃 후 리디렉션
            useAuthStore.getState().logout()
            alert('다시 로그인 해주세요')
            router.push('/login')
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export default useAxiosWithAuth
