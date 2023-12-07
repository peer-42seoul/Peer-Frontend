'use client'

import useMedia from '@/hook/useMedia'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

type TTabType = 'main' | 'notice' | 'board' | 'setting'
const tabName: Record<TTabType, string> = {
  main: '메인',
  notice: '공지사항',
  board: '게시판',
  setting: '팀 설정',
}

const getTabValue = (path: string) => {
  if (path.includes('/notice')) return 'notice'
  else if (path.includes('/board')) return 'board'
  else if (path.includes('/setting')) return 'setting'
  else return 'main'
}

const TeamSidebar = ({ id }: { id: string }) => {
  const { isPc } = useMedia()
  const [tab, setTab] = useState<TTabType>('main')
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    setTab(getTabValue(pathName))
  }, [pathName])

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string,
  ) => {
    setTab(newTab as TTabType)
  }

  const onClickMain = () => {
    router.push(`/teams/${id}`)
  }
  const onClickNotice = () => {
    router.push(`/teams/${id}/notice`)
  }
  const onClickBoard = () => {
    router.push(`/teams/${id}/board`)
  }
  const onClickSetting = () => {
    router.push(`/teams/${id}/setting`)
  }

  return (
    <>
      {isPc ? (
        <ToggleButtonGroup
          orientation="vertical"
          value={tab}
          exclusive
          onChange={handleChange}
          sx={{
            border: '1px solid',
            borderRadius: 2,
            alignItems: 'center',
            flex: isPc ? 1 : 0,
            height: 'fit-content',
          }}
        >
          <ToggleButton
            value={'main'}
            onClick={onClickMain}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.main}</Typography>
          </ToggleButton>
          <ToggleButton
            value={'notice'}
            onClick={onClickNotice}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.notice}</Typography>
          </ToggleButton>
          <ToggleButton
            value={'board'}
            onClick={onClickBoard}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.board}</Typography>
          </ToggleButton>
          <ToggleButton
            value={'setting'}
            onClick={onClickSetting}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.setting}</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        <ToggleButtonGroup
          fullWidth
          value={tab}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value={'main'}
            onClick={onClickMain}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.main}</Typography>
          </ToggleButton>

          <ToggleButton
            value={'notice'}
            onClick={onClickNotice}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.notice}</Typography>
          </ToggleButton>

          <ToggleButton
            value={'board'}
            onClick={onClickBoard}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.board}</Typography>
          </ToggleButton>
          <ToggleButton
            value={'setting'}
            onClick={onClickSetting}
            sx={{ m: 'dense' }}
          >
            <Typography>{tabName.setting}</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  )
}

export default TeamSidebar
