'use client'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  DetailPage,
  DetailContentCotainer,
  DetailContent,
} from '@/components/board/DetailPanel'
import CuButton from '@/components/CuButton'
import useTeamPageState from '@/states/useTeamPageState'
import CommentList from './panel/CommentList'

const mockData = {
  title: '제목',
  authorNickname: '작성자',
  createdAt: new Date(),
  content:
    '팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.',
  isAuthor: true,
}

interface IStatusMessageProps {
  message: string
  onClickEditButton?: () => void
  author: boolean
}

const StatusMessage = ({
  message,
  onClickEditButton,
  author,
}: IStatusMessageProps) => {
  return (
    <DetailContentCotainer
      containerTitle={'공지사항'}
      onClickEditButton={onClickEditButton}
      author={author}
    >
      <Typography
        textAlign={'center'}
        variant={'Body2'}
        color={'text.alternative'}
      >
        {message}
      </Typography>
    </DetailContentCotainer>
  )
}

const TeamNoticeView = ({ params }: { params: { id: string } }) => {
  const { id: teamId } = params
  const axiosWithAuth = useAxiosWithAuth()
  const { postId, setNotice } = useTeamPageState()
  const router = useRouter()
  // const { error, isLoading } = useSWR<ITeamNoticeDetail>(
  //   `/api/v1/team/notice/${postId}`,
  //   (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  // )
  const isLoading = false
  const error = false

  const data = mockData

  const handleDelete = () => {
    const confirm = window.confirm('공지사항을 삭제하시겠습니까?')
    if (!confirm) return
    axiosWithAuth
      .delete(`/api/v1/team/notice/${postId}`)
      .then(() => {
        alert('공지사항을 삭제했습니다.')
        router.push(`/teams/${teamId}/notice`)
      })
      .catch(() => {
        alert('공지사항 삭제에 실패했습니다.')
      })
  }

  if (postId === undefined) return null
  if (!data)
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
    <DetailPage>
      <CuButton
        message={'이전 페이지'}
        action={() => setNotice('LIST')}
        variant={'text'}
        TypographyProps={{
          color: 'text.strong',
          variant: 'Body2Emphasis',
        }}
        style={{ width: 'fit-content' }}
      />
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
          <Stack>
            <CuButton
              message={'삭제'}
              action={handleDelete}
              variant={'text'}
              TypographyProps={{
                color: 'red.normal',
                variant: 'Caption',
              }}
            />
          </Stack>
        )}
      </DetailContentCotainer>
      <CommentList postId={postId} teamId={parseInt(teamId)} />
    </DetailPage>
  )
}

export default TeamNoticeView
