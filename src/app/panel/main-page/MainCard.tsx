import { IMainCard, ITag } from '@/types/IPostDetail'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Stack,
} from '@mui/material'
import Link from 'next/link'
import OthersProfile from '../OthersProfile'
import TagChip from '@/components/TagChip'
import FavoriteButton from '@/components/FavoriteButton'

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
  href,
  onFavorite,
  sx,
  titleMaxLine = 2,
  tagMaxLine = 2,
}: IMainCard) => {
  return (
    <Card sx={{ maxWidth: 345, ...sx }}>
      <Link
        href={href ?? `/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="194"
            image={image}
            alt="userImage"
          />
          {status && (
            <Chip
              label={
                <Typography variant="Tag">
                  {status === 'ONGOING'
                    ? '모집중'
                    : status === 'BEFORE'
                      ? '모집전'
                      : '모집완료'}
                </Typography>
              }
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                borderRadius: 1,
                backgroundColor: 'background.tertiary',
                color: 'white',
                height: '1.25rem',
                '.MuiChip-label': {
                  paddingX: '0.375rem',
                },
              }}
              size="medium"
            />
          )}
        </Box>
      </Link>
      <CardHeader
        avatar={
          <OthersProfile userId={user_id} name={user_nickname}>
            <Avatar aria-label="profile">
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
          <FavoriteButton
            recruit_id={recruit_id}
            favorite={favorite}
            redirect_url={`/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
            onFavorite={onFavorite}
          />
        }
        title={user_nickname}
      />
      <Link
        href={href ?? `/recruit/${recruit_id}?type=${type ?? 'STUDY'}`}
        style={{ textDecoration: 'none' }}
      >
        <CardContent
          sx={{
            '&:last-child': {
              paddingBottom: '1rem !important',
            },
          }}
        >
          <Typography
            variant="Body1"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: 22.5 * titleMaxLine,
              WebkitLineClamp: titleMaxLine,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Stack
            gap={'0.25rem'}
            mt={1}
            direction={'row'}
            sx={{
              height: `${1.5 * tagMaxLine + 0.5}rem`,
              overflow: 'auto',
              flexWrap: 'wrap',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            flexWrap={'wrap'}
          >
            {tagList?.map(({ name, color }: ITag, idx: number) => (
              <TagChip name={name} color={color} key={idx} />
            ))}
          </Stack>
        </CardContent>
      </Link>
    </Card>
  )
}

export default MainCard
