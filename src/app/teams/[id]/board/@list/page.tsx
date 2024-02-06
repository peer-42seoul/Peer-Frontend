'use client'
import { useState, useEffect } from 'react'
import { AxiosResponse, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Box, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  ListPageContainer,
  ListBoxContainer,
  IconButtonContainer,
  TopPageButton,
  NewPostButton,
} from '@/components/board/ListPanel'
import CuButton from '@/components/CuButton'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamBoard } from '@/types/TeamBoardTypes'
import BoardPostList from './panel/BoardPostList'
import BoardDropdown from './panel/BoardDropdown'
import Tutorial from '@/components/Tutorial'
import TeamBoardTutorial from '@/components/tutorialContent/TeamBoardTutorial'

const TeamBoard = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const { setBoard, boardId } = useTeamPageState()
  const [keyword, setKeyword] = useState<string>('')
  const [boardList, setBoardList] = useState<ITeamBoard[]>([])
  const axiosWithAuth = useAxiosWithAuth()
  const router = useRouter()

  useEffect(() => {
    const getBoardList = async () => {
      try {
        const res: AxiosResponse<ITeamBoard[]> = await axiosWithAuth.get(
          `/api/v1/team-page/simple/${teamId}`,
        )
        setBoardList(res.data)
        if (!res.data) throw new Error('팀 페이지가 존재하지 않습니다.')
        if (res.data.length === 0) setBoard('LIST', undefined)
        else setBoard('LIST', res.data[0].boardId)
      } catch (err: unknown) {
        if (isAxiosError(err) && err.response?.status === 403) {
          alert('팀 페이지에 접근할 권한이 없습니다.')
          router.push('/team-list')
        } else {
          alert('팀 페이지에 접근할 수 없습니다.')
          router.push('/team-list')
        }
      }
    }
    getBoardList()
  }, [teamId])

  return (
    <ListPageContainer>
      {boardList && (
        <>
          <TopPageButton>
            <CuButton
              variant={'text'}
              message={'게시판 관리'}
              TypographyProps={{
                variant: 'CaptionEmphasis',
                color: 'text.alternative',
              }}
              action={() => {
                setBoard('SETTING', boardId)
              }}
            />
          </TopPageButton>
          <ListBoxContainer>
            {boardList.length > 0 && boardId ? (
              <>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Box>
                    <BoardDropdown boardData={boardList} />
                    <Tutorial content={<TeamBoardTutorial />} />
                  </Box>
                  <Stack direction={'row'} spacing={'0.5rem'}>
                    <IconButtonContainer
                      setKeyword={setKeyword}
                      onClickPlus={() => {
                        setBoard('EDIT', boardId)
                      }}
                    />
                    <NewPostButton
                      onClick={() => {
                        setBoard('EDIT', boardId)
                      }}
                    />
                  </Stack>
                </Stack>
                <BoardPostList boardId={boardId} keyword={keyword} />
              </>
            ) : (
              <Typography
                variant="Body1"
                color={'text.alternative'}
                textAlign={'center'}
              >
                게시판이 존재하지 않습니다. 게시판 관리에서 게시판을
                생성해보세요! (PC에서만 가능)
              </Typography>
            )}
          </ListBoxContainer>
        </>
      )}
    </ListPageContainer>
  )
}

export default TeamBoard
