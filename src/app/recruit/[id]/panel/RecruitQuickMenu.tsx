import { Stack } from '@mui/material'
import FavoriteButton from '@/components/FavoriteButton'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ShareMenuItem from '@/components/dropdownMenu/ShareMenuItem'
import DropdownMenu from '@/components/DropdownMenu'
import * as style from '@/components/dropdownMenu/dropdownMenu.styles'
import IconMenuItem from '@/components/dropdownMenu/IconMenuItem'
import WriteIcon from '@/icons/Nav/WriteIcon'

const RecruitQuickMenu = ({
  favorite,
  recruit_id,
  title,
  content,
  me,
}: {
  favorite: boolean | undefined
  recruit_id: number
  title: string
  content: string
  me?: boolean
}) => {
  const path = usePathname()
  const type = useSearchParams().get('type')
  const router = useRouter()

  return (
    <Stack flexDirection={'row'} justifyContent={'flex-end'}>
      <FavoriteButton
        favorite={favorite}
        recruit_id={recruit_id}
        redirect_url={`${path}?type=${type}`}
      />
      <DropdownMenu>
        <ShareMenuItem
          title={title}
          url={`${path}?type=${type}`}
          content={content}
          message={`피어에서 동료를 구해보세요! 이런 프로젝트가 있어요!`}
        />
        {me && (
          <IconMenuItem
            action={() => router.push(`/recruit/${recruit_id}/edit`)}
            icon={
              <WriteIcon
                sx={{
                  ...style.menuItemIconStyleBase,
                  padding: '0.125rem',
                  color: 'text.alternative',
                }}
              />
            }
            text={'수정'}
          />
        )}
      </DropdownMenu>
    </Stack>
  )
}

export default RecruitQuickMenu
