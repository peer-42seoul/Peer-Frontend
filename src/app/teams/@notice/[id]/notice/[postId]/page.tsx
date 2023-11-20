import { ReactNode } from 'react'
import { Button, Stack, Typography } from '@mui/material'

interface NoticeContentContainerProps {
  children: ReactNode
  isMine: boolean | null | undefined
}

const NoticeContentContainer = ({
  children,
  isMine,
}: NoticeContentContainerProps) => {
  return (
    <Stack spacing={2} width={'100%'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant="body2">공지사항</Typography>
        {isMine ? <Button variant="text">수정</Button> : null}
      </Stack>
      {children}
    </Stack>
  )
}

const TeamNoticeView = ({ params }: { params: { postId: string } }) => {
  const { postId } = params
  // TODO : postId로 공지사항 정보 받아오기
  const dummy = {
    data: {
      title: '공지사항 제목이 들어오는 자리입니다.',
      description:
        '팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요. 팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.팀이 진행하고자 하는 스터디 혹은 프로젝트에 대해 설명해 주세요.',
      tag: ['중요 공지'], // 필요한건지 확인해보기
      isMine: null,
    },
    loading: false,
    error: null,
  }
  const { data, loading, error } = dummy
  if (error || !data)
    return (
      <NoticeContentContainer isMine={data.isMine}>
        <Typography>문제가 발생했습니다.</Typography>
      </NoticeContentContainer>
    )
  return (
    <>
      <NoticeContentContainer isMine={data.isMine}>
        {loading ? (
          <Typography>로딩중...</Typography>
        ) : (
          <>
            <Stack spacing={1}>
              <Typography>제목</Typography>
              <Typography>{data.title}</Typography>
            </Stack>
            <Stack spacing={1}>
              {/* TODO 🐧 : 에디터 내장 뷰어 사용하는건지 물어봐야 함. */}
              <Typography>설명</Typography>
              <Typography>{data.description}</Typography>
            </Stack>
            <Stack spacing={1}>
              {/* TODO 🐧 : 와이어프레임이 없음. 기능명세 확인하고 와이어프레임에 추가 요청하기 */}
              <Typography>태그</Typography>
              <Typography>{data.tag}</Typography>
            </Stack>
          </>
        )}
      </NoticeContentContainer>
      {/* 댓글 컨테이너.. */}
    </>
  )
}

export default TeamNoticeView
