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
  title,
  image,
  // user_id,
  user_nickname,
  user_thumbnail,
  status,
  tagList,
  isFavorite,
}: IPost) => {
  const [favorite, setFavorite] = useState(isFavorite)
  const changeFavorite = async () => {
    try {
      // 추후에 이게 어떤 type인지 api 수정해야.
      // await fetch(`/recruitement/favorite/${study_id}`
      setFavorite(!favorite)
    } catch (e) {
      console.log("error", e);
    }
  }

  return (
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
      {/* <Link href="detail"> */}
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
        {/* title로 바꾸기 */}
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Box>
          {tagList?.map((tag: string, idx: number) => (
            <Chip label={tag} size="small" key={idx} />
          ))}
        </Box>
      </CardContent>
      {/* </Link> */}
    </Card>
  )
}

export default MainCard
