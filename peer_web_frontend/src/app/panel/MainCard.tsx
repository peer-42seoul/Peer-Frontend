import { IProject } from '@/types/IProejct'
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

const MainCard = ({
  nickname,
  imageUrl,
  description,
  tags,
  isFavorite,
  profileImgUrl,
  inProgress,
}: IProject) => {
  const [favorite, setFavorite] = useState(isFavorite)
  const changeFavorite = () => {
    setFavorite(!favorite)
    // favorite 변경시 favorite 변경 api 호출, 다시 get 해오기.
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Paella dish"
        />
        <Chip
          label={inProgress ? '진행중' : '모집중'}
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
      {/* <Link href="detail"> */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Box
              component="img"
              height="194"
              src={profileImgUrl}
              alt="Paella dish"
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="add to favorites" onClick={changeFavorite}>
            <Favorite sx={{ color: favorite ? 'red' : 'gray' }} />
          </IconButton>
        }
        title={nickname}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box>
          {tags?.map((tag: string, idx: number) => (
            <Chip label={tag} size="small" key={idx} />
          ))}
        </Box>
      </CardContent>
      {/* </Link> */}
    </Card>
  )
}

export default MainCard
