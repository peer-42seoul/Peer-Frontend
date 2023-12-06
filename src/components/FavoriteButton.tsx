import { useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import { Favorite } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const FavoriteButton = ({
  favorite,
  recruit_id,
}: {
  favorite: boolean | undefined
  recruit_id: number
}) => {
  const [isFavorite, setIsFavorite] = useState(favorite)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const changeFavorite = async () => {
    if (!isLogin) return router.push('/login')
    try {
      await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite/${recruit_id}`,
      )
      setIsFavorite(!isFavorite)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <IconButton aria-label="add to favorites" onClick={changeFavorite}>
      <Favorite
        sx={{ color: isFavorite ? 'purple.strong' : 'purple.tinted' }}
      />
    </IconButton>
  )
}

export default FavoriteButton
