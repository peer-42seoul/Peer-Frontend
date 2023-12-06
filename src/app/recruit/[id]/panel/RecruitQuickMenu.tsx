import { IconButton, Stack } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import React from 'react'
import SirenIcon from '@/app/recruit/[id]/panel/SirenIcon'

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
        <SirenIcon sx={{ color: 'purple.strong' }} />
      </IconButton>
    </Stack>
  )
}

export default RecruitQuickMenu
