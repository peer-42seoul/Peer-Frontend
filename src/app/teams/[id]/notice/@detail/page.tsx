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

const TeamNoticeView = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const axiosWithAuth = useAxiosWithAuth()
  const { postId, setNotice } = useTeamPageState()
  const { data, error, isLoading } = useSWR<ITeamNoticeDetail>(
    `/api/v1/team-page/post/${postId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const { isPc } = useMedia()

  const handleDelete = () => {
    const confirm = window.confirm('공지사항을 삭제하시겠습니까?')
    if (!confirm) return
    axiosWithAuth
      .delete(`/api/v1/team/notice/${postId}`)
      .then(() => {
        alert('공지사항을 삭제했습니다.')
        setNotice('LIST')
      })
      .catch(() => {
        alert('공지사항 삭제에 실패했습니다.')
      })
  }

  const handleGoBack = () => {
    setNotice('LIST')
  }

  if (postId === undefined) return null
  if (!data || error)
    return (
      <StatusMessage
        message={'문제가 발생했습니다.'}
        onClickEditButton={() => setNotice('EDIT', postId)}
        author={!!data?.isAuthor}
      />
    )
  if (isLoading)
    return (
      <StatusMessage
        message={'공지사항을 불러오는 중입니다...'}
        onClickEditButton={() => setNotice('EDIT', postId)}
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
        containerTitle={'공지사항'}
        onClickEditButton={() => setNotice('EDIT', postId)}
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
      <CommentList postId={postId} teamId={parseInt(teamId)} />
    </DetailPage>
  )
}

export default TeamNoticeView
