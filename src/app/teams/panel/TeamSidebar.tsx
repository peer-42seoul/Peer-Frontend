'use client'

import useMedia from '@/hook/useMedia'
import useShowTeamCategory from '@/states/useShowTeamCategory'
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'

const TeamSidebar = () => {
  const { isPc } = useMedia()
  const [alignment, setAlignment] = useState('메인')
  const { setShowTeamPageCategory } = useShowTeamCategory()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment)
  }

  const onClickMain = () => setShowTeamPageCategory('메인')
  const onClickNotice = () => setShowTeamPageCategory('공지사항')
  const onClickBoard = () => setShowTeamPageCategory('게시판')
  const onClickSetting = () => setShowTeamPageCategory('팀 설정')

  return (
    <>
      {isPc ? (
        <ToggleButtonGroup
          orientation="vertical"
          value={alignment}
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
            value={'메인'}
            onClick={onClickMain}
            sx={{ m: 'dense' }}
          >
            <Typography>메인</Typography>
          </ToggleButton>
          <ToggleButton
            value={'공지사항'}
            onClick={onClickNotice}
            sx={{ m: 'dense' }}
          >
            <Typography>공지사항</Typography>
          </ToggleButton>
          <ToggleButton
            value={'게시판'}
            onClick={onClickBoard}
            sx={{ m: 'dense' }}
          >
            <Typography>게시판</Typography>
          </ToggleButton>
          <ToggleButton
            value={'팀 설정'}
            onClick={onClickSetting}
            sx={{ m: 'dense' }}
          >
            <Typography>팀 설정</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      ) : (
        <ToggleButtonGroup
          fullWidth
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value={'메인'}
            onClick={onClickMain}
            sx={{ m: 'dense' }}
          >
            <Typography>메인</Typography>
          </ToggleButton>

          <ToggleButton
            value={'공지사항'}
            onClick={onClickNotice}
            sx={{ m: 'dense' }}
          >
            <Typography>공지사항</Typography>
          </ToggleButton>

          <ToggleButton
            value={'게시판'}
            onClick={onClickBoard}
            sx={{ m: 'dense' }}
          >
            <Typography>게시판</Typography>
          </ToggleButton>

          <ToggleButton
            value={'팀 설정'}
            onClick={onClickSetting}
            sx={{ m: 'dense' }}
          >
            <Typography>팀 설정</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  )
}

export default TeamSidebar
