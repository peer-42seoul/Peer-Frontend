'use client'

import useMedia from '@/hook/useMedia'
import useShowTeams from '@/states/useShowTeams'
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useState } from 'react'

const Sidebar = () => {
  const { isPc } = useMedia()
  const [alignment, setAlignment] = useState('모집중')
  const { setShowTeams } = useShowTeams()

  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment)
  }
  const onClickGather = () => setShowTeams('모집중')
  const onClickBefore = () => setShowTeams('시작전')
  const onClickProgress = () => setShowTeams('진행중')
  const onClickComplete = () => setShowTeams('진행완료')

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
            value={'모집중'}
            onClick={onClickGather}
            sx={{ m: 'dense' }}
          >
            모집 중
          </ToggleButton>
          <Typography>▾</Typography>
          <ToggleButton
            value={'시작전'}
            onClick={onClickBefore}
            sx={{ m: 'dense' }}
          >
            시작 전
          </ToggleButton>
          <Typography>▾</Typography>
          <ToggleButton
            value={'진행중'}
            onClick={onClickProgress}
            sx={{ m: 'dense' }}
          >
            진행 중
          </ToggleButton>
          <Typography>▾</Typography>
          <ToggleButton
            value={'진행완료'}
            onClick={onClickComplete}
            sx={{ m: 'dense' }}
          >
            진행 완료
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
            value={'모집중'}
            onClick={onClickGather}
            sx={{ m: 'dense' }}
          >
            모집 중
          </ToggleButton>

          <ToggleButton
            value={'시작전'}
            onClick={onClickBefore}
            sx={{ m: 'dense' }}
          >
            시작 전
          </ToggleButton>

          <ToggleButton
            value={'진행중'}
            onClick={onClickProgress}
            sx={{ m: 'dense' }}
          >
            진행 중
          </ToggleButton>

          <ToggleButton
            value={'진행완료'}
            onClick={onClickComplete}
            sx={{ m: 'dense' }}
          >
            진행 완료
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </>
  )
}

export default Sidebar
