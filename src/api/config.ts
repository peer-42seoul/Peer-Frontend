import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'

const useAxiosWithAuth = () => {
  const accessToken = useAuthStore.getState().accessToken
  const router = useRouter()

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CSR_API,
  })

  //무한 요청 방지 flag
  let isRefreshing = false

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
      const currentPageUrl = window.location.pathname
      if (error.response?.status === 401) {
        if (!accessToken || isRefreshing) {
          // 로그아웃 후 리디렉션
          useAuthStore.getState().logout(isRefreshing)
          router.push('/login?redirect=' + currentPageUrl)
        } else {
          isRefreshing = true
          try {
            // accessToken 갱신 요청
            const response = await axiosInstance.get('/api/v1/signin/reissue', {
              withCredentials: true,
            })
            const newAccessToken = response.data.accessToken
            useAuthStore.getState().login(newAccessToken)
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
            // 이전 요청을 재시도
            return axios.request(error.config)
          } catch (refreshError) {
            // 로그아웃 후 리디렉션
            isRefreshing = true
            useAuthStore.getState().logout(isRefreshing)
            router.push('/login?redirect=' + currentPageUrl)
          }
        }
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export default useAxiosWithAuth
