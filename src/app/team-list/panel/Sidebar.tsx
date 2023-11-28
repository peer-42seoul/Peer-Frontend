'use client'

import { TeamStatus } from '@/app/teams/types/types'
import useMedia from '@/hook/useMedia'
import useShowTeams from '@/states/useShowTeams'
import {
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Stack,
} from '@mui/material'
import { useState } from 'react'

const Sidebar = () => {
  const { isPc } = useMedia()
  const [alignment, setAlignment] = useState(TeamStatus.RECRUITING)
  const { setShowTeams } = useShowTeams()

  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment)
  }
  const onClickGather = () => setShowTeams(TeamStatus.RECRUITING)
  const onClickBefore = () => setShowTeams(TeamStatus.BEFORE)
  const onClickProgress = () => setShowTeams(TeamStatus.ONGOING)
  const onClickComplete = () => setShowTeams(TeamStatus.COMPLETE)

  return (
    <>
      <Stack width={isPc ? 200 : '100%'}>
        <Stack my={2}>
          <Typography fontWeight={'bold'}>나의 팀리스트</Typography>
        </Stack>
        {isPc ? (
          <ToggleButtonGroup
            orientation="vertical"
            value={!alignment ? TeamStatus.RECRUITING : alignment}
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
              value={TeamStatus.RECRUITING}
              onClick={onClickGather}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography>모집 중</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.BEFORE}
              onClick={onClickBefore}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography>모집 완료</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.ONGOING}
              onClick={onClickProgress}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography>진행 중</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.COMPLETE}
              onClick={onClickComplete}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography>진행 완료</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        ) : (
          <ToggleButtonGroup
            fullWidth={true}
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              value={TeamStatus.RECRUITING}
              onClick={onClickGather}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography width={'max-content'}>모집 중</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.BEFORE}
              onClick={onClickBefore}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography width={'max-content'}>시작 전</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.ONGOING}
              onClick={onClickProgress}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography width={'max-content'}>진행 중</Typography>
            </ToggleButton>

            <ToggleButton
              value={TeamStatus.COMPLETE}
              onClick={onClickComplete}
              sx={{
                width: '100%',
                '&.MuiToggleButtonGroup-grouped': {
                  border: 'none',
                },
                m: 'dense',
              }}
            >
              <Typography width={'max-content'}>진행 완료</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Stack>
    </>
  )
}

export default Sidebar
