'use client'
import useSWR from 'swr'
import { Stack } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  DetailPage,
  DetailContentCotainer,
  StatusMessage,
  DetailContent,
} from '@/components/board/DetailPanel'
import CuButton from '@/components/CuButton'
import useMedia from '@/hook/useMedia'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamNoticeDetail } from '@/types/TeamBoardTypes'
import CommentList from './panel/CommentList'
import { CommentForm } from './panel/CommentForm'

const TeamBoardPostView = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const axiosWithAuth = useAxiosWithAuth()
  const { boardId, postId, setBoard } = useTeamPageState()
  const { data, error, isLoading } = useSWR<ITeamNoticeDetail>(
    `/api/v1/team-page/post/${postId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const { isPc } = useMedia()

  const handleDelete = () => {
    const confirm = window.confirm('게시글을 삭제할까요??')
    if (!confirm || !boardId) return
    axiosWithAuth
      .delete(`/api/v1/team/notice/${postId}`)
      .then(() => {
        alert('게시글을 삭제했습니다.')
        setBoard('LIST', boardId)
      })
      .catch(() => {
        alert('게시글 삭제에 실패했습니다.')
      })
  }

  const handleGoBack = () => {
    if (boardId) setBoard('LIST', boardId)
  }

  if (!boardId) return null

  if (postId === undefined) return null
  if (!data || error)
    return (
      <StatusMessage
        message={'문제가 발생했습니다.'}
        onClickEditButton={() => setBoard('LIST', boardId, postId)}
        author={!!data?.isAuthor}
      />
    )
  if (isLoading)
    return (
      <StatusMessage
        message={'게시글을 불러오는 중입니다...'}
        onClickEditButton={() => setBoard('LIST', boardId, postId)}
        author={!!data?.isAuthor}
      />
    )
  return (
    <DetailPage handleGoBack={handleGoBack}>
      {isPc && (
        <CuButton
          message={'이전 페이지'}
          action={handleGoBack}
          variant={'text'}
          TypographyProps={{
            color: 'text.strong',
            variant: 'Body2Emphasis',
          }}
          style={{ width: 'fit-content' }}
        />
      )}
      <DetailContentCotainer
        containerTitle={'게시판'}
        onClickEditButton={() => setBoard('EDIT', boardId, postId)}
        author={data.isAuthor}
      >
        <DetailContent
          title={data.title}
          createdAt={data.createdAt}
          authorNickname={data.authorNickname}
          content={data.content}
        />
        {data.isAuthor && (
          <Stack alignItems={'flex-end'}>
            <CuButton
              message={'삭제'}
              action={handleDelete}
              variant={'text'}
              TypographyProps={{
                color: 'red.normal',
                variant: 'Caption',
              }}
              style={{ width: 'fit-content' }}
            />
          </Stack>
        )}
      </DetailContentCotainer>
      <Stack>
        <CommentList postId={postId} />
        <CommentForm postId={postId} teamId={parseInt(teamId)} />
      </Stack>
    </DetailPage>
  )
}

export default TeamBoardPostView
