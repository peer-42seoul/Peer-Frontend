import { IconButton, Stack, Tooltip } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import React from 'react'
import SirenIcon from '@/app/recruit/[id]/panel/SirenIcon'
import { usePathname, useSearchParams } from 'next/navigation'

const RecruitQuickMenu = ({
  favorite,
  recruit_id,
}: {
  favorite: boolean | undefined
  recruit_id: number
}) => {
  const path = usePathname()
  const type = useSearchParams().get('type')

  return (
    <Stack alignItems={'center'}>
      <FavoriteButton
        recruit_id={recruit_id}
        favorite={favorite}
        redirect_url={`${path}?type=${type}`}
      />
      <Tooltip title={'공유'}>
        <IconButton onClick={() => {}}>
          <ShareOutlinedIcon sx={{ color: 'purple.strong' }} />
        </IconButton>
      </Tooltip>
      <Tooltip title={'신고'}>
        <IconButton onClick={() => {}}>
          <SirenIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

export default RecruitQuickMenu
