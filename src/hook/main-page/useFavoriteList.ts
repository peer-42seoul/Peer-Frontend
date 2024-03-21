import useSWR from 'swr'
import { IFavorite } from '@/types/IPostDetail'
import useAuthStore from '@/states/useAuthStore'
import { AxiosInstance } from 'axios'
import useAxiosWithAuth from '@/api/config'
import useMainOptions from '@/hook/main-page/useMainOptions'

const useFavoriteList = () => {
  //option, isInit 받아오기
  const { isLogin } = useAuthStore()
  const axiosInstance: AxiosInstance = useAxiosWithAuth()
  const { isInit, optionsQuery } = useMainOptions()

  const { data: favoriteData } = useSWR<IFavorite[]>(
    isInit && isLogin
      ? `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit/favorites` +
          optionsQuery
      : null,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  const getFavoriteData = (recruit_id: number) => {
    const res = favoriteData?.find((data) => data?.recruit_id === recruit_id)
    return res?.favorite
  }

  return { getFavoriteData }
}

export default useFavoriteList
