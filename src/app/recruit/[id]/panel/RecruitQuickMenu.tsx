import { IconButton, Stack, Tooltip } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import React from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { handleShare } from '@/components/dropdownMenu/ShareMenuItem'

const RecruitQuickMenu = ({
  favorite,
  recruit_id,
  title,
  content,
}: {
  favorite: boolean | undefined
  recruit_id: number
  title: string
  content: string
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
        <IconButton
          onClick={() => {
            handleShare(
              title,
              `${path}?type=${type}`,
              content,
              `피어에서 동료를 구해보세요! 이런 프로젝트가 있어요!`,
            )
          }}
        >
          <ShareOutlinedIcon sx={{ color: 'purple.strong' }} />
        </IconButton>
      </Tooltip>
      {/*<Tooltip title={'신고'}>*/}
      {/*  <IconButton onClick={() => {}}>*/}
      {/*    <SirenIcon />*/}
      {/*  </IconButton>*/}
      {/*</Tooltip>*/}
    </Stack>
  )
}

export default RecruitQuickMenu
