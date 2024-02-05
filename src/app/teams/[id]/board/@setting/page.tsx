'use client'
import { useRef } from 'react'
import { isAxiosError } from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { Stack, TextField, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import BackgroundBox from '@/components/BackgroundBox'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useToast from '@/states/useToast'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamBoard } from '@/types/TeamBoardTypes'
import BoardItem from './panel/BoardItem'
import * as style from './page.style'

interface ITitleStackProps {
  title: string
  warning?: string
  children: React.ReactNode
}

const TitleStack = ({ title, warning, children }: ITitleStackProps) => {
  return (
    <Stack spacing={'1rem'}>
      <Stack direction={'row'} spacing={'0.5rem'}>
        <Typography variant="CaptionEmphasis" color="text.strong">
          {title}
        </Typography>
        {warning && (
          <Typography variant="CaptionEmphasis" color="red.normal">
            {warning}
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  )
}

const TeamBoardSetting = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const textFieldRef = useRef<HTMLInputElement>(null)
  const { isPc } = useMedia()
  const axiosWithAuth = useAxiosWithAuth()
  const { openToast } = useToast()
  const { resetState } = useTeamPageState()
  const { mutate } = useSWRConfig()

  const { data, isLoading, error } = useSWR<ITeamBoard[]>(
    `/api/v1/team-page/simple/${teamId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  const handleCreateBoard = () => {
    if (!textFieldRef.current) return
    const name = textFieldRef.current.value
    if (!name) {
      openToast({
        severity: 'error',
        message: '게시판 이름을 입력해주세요.',
      })
      return
    }
    axiosWithAuth
      .post(`/api/v1/team/board/create`, {
        teamId,
        name,
        type: 'NORMAL',
      })
      .then(() => {
        textFieldRef.current!.value = ''
        openToast({
          severity: 'success',
          message: '게시판을 추가했습니다.',
        })
        mutate(`/api/v1/team-page/simple/${teamId}`)
      })
      .catch((e: unknown) => {
        if (isAxiosError(e)) {
          if (e.response?.status === 409) {
            openToast({
              severity: 'error',
              message: '이미 존재하는 게시판 이름입니다.',
            })
            return
          }
        }
        openToast({
          severity: 'error',
          message: '게시판을 추가하지 못했습니다.',
        })
      })
  }

  if (!data || isLoading || error) {
    alert('게시판 목록을 불러오지 못했습니다.')
    resetState()
    return null
  }

  // 모바일에서는 게시판 관리가 불가능합니다.
  if (!isPc)
    return (
      <BackgroundBox mobileSx={style.mobilePage}>
        <Typography variant="Caption" color="text.alternative">
          게시판 관리는 PC에서만 가능해요.
        </Typography>
      </BackgroundBox>
    )

  return (
    <Stack
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        padding: '2rem',
      }}
      spacing={'2rem'}
    >
      <CuButton
        variant={'text'}
        message={'게시판으로 돌아가기'}
        TypographyProps={{
          variant: 'CaptionEmphasis',
          color: 'text.alternative',
        }}
        action={resetState}
        style={{ width: 'fit-content' }}
      />
      <BackgroundBox pcSx={{ padding: '1.5rem' }}>
        <Stack spacing={'2rem'}>
          <TitleStack title="게시판 추가">
            <Stack
              direction={'row'}
              spacing={'0.38rem'}
              sx={style.inputContainer}
            >
              <TextField
                inputRef={textFieldRef}
                name={'new-board-name'}
                sx={{ flexGrow: 1 }}
              />
              <CuButton
                variant={'text'}
                action={handleCreateBoard}
                message="추가"
              />
            </Stack>
          </TitleStack>
          <TitleStack
            title={'게시판 목록'}
            warning={'게시판 삭제시 내부 모든 글이 삭제되고 복구할 수 없어요.'}
          >
            <Stack>
              {data.map((board: ITeamBoard) => (
                <BoardItem
                  key={crypto.randomUUID()}
                  board={board}
                  teamId={teamId}
                />
              ))}
            </Stack>
          </TitleStack>
        </Stack>
      </BackgroundBox>
    </Stack>
  )
}

export default TeamBoardSetting
