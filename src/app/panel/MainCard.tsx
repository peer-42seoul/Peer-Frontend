import { IMainCard, ITag } from '@/types/IPostDetail'
import { Favorite } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import Link from 'next/link'

const MainCard = ({
  title,
  image,
  user_nickname,
  user_thumbnail,
  status,
  tagList,
  favorite,
  recruit_id,
  type,
}: IMainCard) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <Link
        href={`/recruitment/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
          />
          <Chip
            label={status}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              borderRadius: 1,
              backgroundColor: 'black',
              color: 'white',
            }}
            size="medium"
          />
        </Box>
      </Link>
      <CardHeader
        avatar={
          <Link
            href={`/recruitment/${recruit_id}?type=${type ?? 'STUDY'}`}
            style={{ textDecoration: 'none' }}
          >
            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
              <Box
                component="img"
                height="194"
                src={user_thumbnail}
                alt="profile image"
              />
            </Avatar>
          </Link>
        }
        action={
          <IconButton aria-label="add to favorites" onClick={changeFavorite}>
            <Favorite sx={{ color: isFavorite ? 'red' : 'gray' }} />
          </IconButton>
        }
        title={
          <Link
            href={`/recruitment/${recruit_id}?type=${type ?? 'STUDY'}`}
            style={{ textDecoration: 'none' }}
          >
            {user_nickname}
          </Link>
        }
      />
      <Link
        href={`/recruitment/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Box>
            {tagList?.map(({ name, color }: ITag, idx: number) => (
              <Chip
                label={name}
                size="small"
                key={idx}
                style={{ color: color }}
              />
            ))}
          </Box>
        </CardContent>
      </Link>
    </Card>
  )
}

export default MainCard
