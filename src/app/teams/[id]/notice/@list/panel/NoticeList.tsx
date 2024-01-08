import { ReactNode, Fragment, useEffect } from 'react'
import dayjs from 'dayjs'
import { Box, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { ListStack } from '@/components/board/ListPanel'
import { useInfiniteSWRScroll } from '@/hook/useInfiniteScroll'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamNotice } from '@/types/TeamBoardTypes'

const mockData = [
  {
    content: [
      {
        postId: 1,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 2,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 3,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 4,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 5,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 6,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
      {
        postId: 7,
        title: '공지사항 제목',
        authorNickname: '작성자',
        createdAt: '2021-10-10T10:10:10',
      },
    ],
  },
]

interface NoticeItemProps {
  title: string
  author: string
  date: string
  id: number
  teamId: number
}

const NoticeItem = ({ title, author, date, id }: NoticeItemProps) => {
  const { setNotice } = useTeamPageState()
  return (
    <Box
      onClick={() => {
        setNotice('DETAIL', id)
      }}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <Stack>
        <Typography variant={'Body1'}>{title}</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant={'Body2'}>{author}</Typography>
        <Typography variant={'Caption'}>{date}</Typography>
      </Stack>
    </Box>
  )
}

const StatusMessage = ({ message }: { message: string }) => {
  return (
    <ListStack>
      <Typography
        textAlign={'center'}
        variant={'Body2'}
        color={'text.alternative'}
      >
        {message}
      </Typography>
    </ListStack>
  )
}

const NoticeList = ({
  teamId,
  keyword,
}: {
  teamId: number
  keyword: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { error, isLoading, size, setSize, targetRef } = useInfiniteSWRScroll(
    `/api/v1/team/notice/${teamId}?pageSize=${10}&keyword=${keyword}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  useEffect(() => {
    // keyword가 바뀔 때마다 size를 0으로 초기화 (size의 초깃값은 0입니다.)
    if (!isLoading && size !== 0) setSize(0)
  }, [keyword])

  const data = mockData

  if (error || !data) return <StatusMessage message="오류가 발생했습니다." />

  if (!data && isLoading)
    return <StatusMessage message="공지사항을 불러오는 중입니다..." />

  if (data.length === 0 || data[0].content.length === 0)
    return <StatusMessage message="등록된 글이 없습니다." />

  return (
    <ListStack>
      {data.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.content.map((notice: ITeamNotice) => {
              return (
                <NoticeItem
                  key={notice.postId}
                  title={notice.title}
                  author={notice.authorNickname}
                  date={dayjs(notice.createdAt).format('MM[월] DD[일]')}
                  id={notice.postId}
                  teamId={teamId}
                />
              )
            })}
          </Fragment>
        )
      })}
      <Box ref={targetRef}>{isLoading && '로딩중입니다...'}</Box>
    </ListStack>
  )
}

export default NoticeList
