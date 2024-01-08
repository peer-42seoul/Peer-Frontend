import { Fragment, useEffect } from 'react'
import { Box } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import {
  ListStack,
  StatusMessage,
  ListItem,
} from '@/components/board/ListPanel'
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

const NoticeList = ({
  teamId,
  keyword,
}: {
  teamId: number
  keyword: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
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
                <ListItem
                  key={notice.postId}
                  title={notice.title}
                  authorNickname={notice.authorNickname}
                  createdAt={notice.createdAt}
                  onClick={() => {
                    setNotice('DETAIL', notice.postId)
                  }}
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
