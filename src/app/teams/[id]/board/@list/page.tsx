'use client'
import { useState, useEffect } from 'react'
import { Typography, Stack } from '@mui/material'
import {
  ListPageContainer,
  ListBoxContainer,
  NewPostButton,
  IconButtonContainer,
} from '@/components/board/ListPanel'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamBoardInfo } from '@/types/TeamBoardTypes'
import NoticeList from './panel/NoticeList'
import { AxiosResponse } from 'axios'
import BoardDropdown from './panel/BoardDropdown'

const mockData = [
  {
    boardId: 1,
    boardName: '공지사항',
  },
  {
    boardId: 2,
    boardName: '자유게시판',
  },
  {
    boardId: 3,
    boardName: 'Q&A',
  },
  {
    boardId: 4,
    boardName: '프로젝트',
  },
]

const TeamBoard = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const { isPc } = useMedia()
  const { setBoard, boardId } = useTeamPageState()
  const [keyword, setKeyword] = useState<string>('')
  const [boardList, setBoardList] = useState<ITeamBoardInfo[]>([])
  const axiosWithAuth = useAxiosWithAuth()

  useEffect(() => {
    const getBoardList = async () => {
      try {
        const res: AxiosResponse<ITeamBoardInfo[]> = await axiosWithAuth.get(
          `/api/v1/team-page/simple/${teamId}`,
        )
        setBoardList(res.data)
        if (!res.data || res.data.length == 0)
          throw new Error('팀 페이지가 존재하지 않습니다.')
        setBoard('LIST', res.data[0].boardId)
      } catch (err) {
        // TODO : 권한에 따른 에러 처리
        console.log(err)
      }
    }
    getBoardList()
  }, [teamId])

  return (
    <ListPageContainer>
      {boardList && boardList.length > 0 && boardId && (
        <>
          <NewPostButton
            onClick={() => {
              setBoard('EDIT', boardId)
            }}
          />
          <ListBoxContainer>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <BoardDropdown boardData={boardList} />
              <IconButtonContainer
                setKeyword={setKeyword}
                onClickPlus={() => {
                  setBoard('EDIT', boardId)
                }}
              />
            </Stack>
            <NoticeList boardId={boardId} keyword={keyword} />
          </ListBoxContainer>
        </>
      )}
    </ListPageContainer>
  )
}

export default TeamBoard
