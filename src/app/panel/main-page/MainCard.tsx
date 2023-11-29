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
  Stack,
} from '@mui/material'
import { useState } from 'react'
import useAuthStore from '@/states/useAuthStore'
import { useRouter } from 'next/navigation'
import useAxiosWithAuth from '@/api/config'
import Link from 'next/link'
import { red } from '@mui/material/colors'
import OthersProfile from '../OthersProfile'

const MainCard = ({
  title,
  image,
  user_id,
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
        href={`/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="userImage"
          />
          <Chip
            label={
              status === 'ONGOING'
                ? '모집중'
                : status === 'BEFORE'
                  ? '모집전'
                  : '모집완료'
            }
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
          <OthersProfile userId={user_id} name={user_nickname}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
              <Box
                component="img"
                height="194"
                src={user_thumbnail}
                alt="profile image"
              />
            </Avatar>
          </OthersProfile>
        }
        action={
          <IconButton aria-label="add to favorites" onClick={changeFavorite}>
            <Favorite sx={{ color: isFavorite ? 'red' : 'gray' }} />
          </IconButton>
        }
        title={user_nickname}
      />
      <Link
        href={`/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Stack gap={1} direction={'row'}>
            {tagList?.map(({ name, color }: ITag, idx: number) => {
              const r = parseInt(color.slice(1, 3), 16),
                g = parseInt(color.slice(3, 5), 16),
                b = parseInt(color.slice(5, 7), 16)
              const alpha = '0.3'
              const backgroundColor =
                'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'

              return (
                <Chip
                  label={name}
                  size="small"
                  key={idx}
                  style={{
                    color: color,
                    backgroundColor: backgroundColor,
                    borderRadius: 5,
                  }}
                />
              )
            })}
          </Stack>
        </CardContent>
      </Link>
    </Card>
  )
}

export default MainCard
