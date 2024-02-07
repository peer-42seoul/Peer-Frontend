'use client'

import { useCallback, useEffect, useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import { Favorite } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const FavoriteButton = ({
  favorite,
  recruit_id,
  redirect_url,
  onFavorite,
}: {
  favorite: boolean | undefined
  recruit_id: number
  redirect_url: string
  onFavorite?: () => void // 기존의 로직과 다른 것을 원할 때 사용
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()

  useEffect(() => {
    if (favorite !== undefined) setIsFavorite(favorite)
  }, [favorite])

  const changeFavorite = useCallback(async () => {
    if (!isLogin) return router.push('/login?redirect=' + redirect_url)
    try {
      setIsFavorite(!isFavorite)
      if (onFavorite) {
        onFavorite()
      } else {
        await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/recruit/favorite/${recruit_id}`,
        )
      }
    } catch (e) {
      console.log('error', e)
      setIsFavorite(!isFavorite)
    }
  }, [
    axiosInstance,
    isFavorite,
    isLogin,
    onFavorite,
    recruit_id,
    redirect_url,
    router,
  ])

  return (
    <Tooltip title="관심">
      <IconButton aria-label="add to favorites" onClick={changeFavorite}>
        <Favorite
          sx={{ color: isFavorite ? 'purple.strong' : 'purple.tinted' }}
        />
      </IconButton>
    </Tooltip>
  )
}

export default FavoriteButton
