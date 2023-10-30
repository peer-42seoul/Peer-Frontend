import { Tag } from '@/types/IPostDetail'
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
  Link,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { ProjectType } from '../page'
import axios from 'axios'

interface IMainCard {
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: Tag[]
  isFavorite: boolean
  post_id: string
  type: ProjectType
}
const MainCard = ({
  title,
  image,
  user_nickname,
  user_thumbnail,
  status,
  tagList,
  isFavorite,
  post_id,
  type,
}: IMainCard) => {
  const [favorite, setFavorite] = useState(isFavorite)
  const changeFavorite = async () => {
    try {
      await axios(`/api/v1/recruit/favorite/${post_id}`)
      setFavorite(!favorite)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Link href={`/recruitment/${post_id}?type=${type}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345 }}>
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
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
              <Box
                component="img"
                height="194"
                src={user_thumbnail}
                alt="profile image"
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="add to favorites" onClick={changeFavorite}>
              <Favorite sx={{ color: favorite ? 'red' : 'gray' }} />
            </IconButton>
          }
          title={user_nickname}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Box>
            {tagList?.map(({ tagName, tagColor }: Tag, idx: number) => (
              <Chip
                label={tagName}
                size="small"
                key={idx}
                style={{ color: tagColor }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default MainCard
