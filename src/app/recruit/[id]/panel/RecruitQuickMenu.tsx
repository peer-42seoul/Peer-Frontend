import { IconButton, Stack } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import React from 'react'
//'purple.strong'
const RecruitQuickMenu = ({
  favorite,
  recruit_id,
}: {
  favorite: boolean | undefined
  recruit_id: number
}) => {
  return (
    <Stack alignItems={'center'}>
      <FavoriteButton recruit_id={recruit_id} favorite={favorite} />
      <IconButton onClick={() => {}}>
        <ShareOutlinedIcon sx={{ color: 'purple.strong' }} />
      </IconButton>
      <IconButton onClick={() => {}}>
        <FlagOutlinedIcon sx={{ color: 'purple.strong' }} />
      </IconButton>
    </Stack>
  )
}

export default RecruitQuickMenu
