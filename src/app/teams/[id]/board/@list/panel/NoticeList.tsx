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
import {
  ITeamBoard,
  ITeamBoardListData,
  ITeamBoardPost,
  ITeamNotice,
} from '@/types/TeamBoardTypes'

const mockData: ITeamBoardListData[] = [
  {
    content: [
      {
        boardId: 3,
        boardName: 'Q&A',
        posts: [
          {
            postId: 1,
            title: '테스트',
            nickname: '테스트',
            hit: 0,
            date: new Date(),
          },
        ],
      },
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 6,
    size: 10,
    number: 0,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    first: true,
    numberOfElements: 6,
    empty: false,
  },
]

const NoticeList = ({
  boardId,
  keyword,
}: {
  boardId: number
  keyword: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
  // const { data, error, isLoading, size, setSize, targetRef } =
  //   useInfiniteSWRScroll(
  //     `/api/v1/team-page/posts/${boardId}?&size=${10}`,
  //     (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  //   )
  const data = mockData
  const error = false
  const isLoading = false
  const size = 0
  const setSize = (i) => {}

  useEffect(() => {
    // keyword가 바뀔 때마다 size를 0으로 초기화 (size의 초깃값은 0입니다.)
    if (!isLoading && size !== 0) setSize(0)
  }, [keyword])

  if (!data || error) return <StatusMessage message="문제가 발생했습니다." />
  if (!data && isLoading)
    return <StatusMessage message="공지사항을 불러오는 중입니다..." />
  if (data.length === 0 || data[0].content.length === 0)
    return <StatusMessage message="등록된 글이 없습니다." />
  return (
    <ListStack>
      {data.map((page) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            {page.content.map((boardData: ITeamBoard) =>
              boardData.posts.map((post: ITeamBoardPost) => {
                return (
                  <ListItem
                    key={post.postId}
                    title={post.title}
                    authorNickname={post.nickname}
                    createdAt={post.date}
                    onClick={() => {
                      setNotice('DETAIL', post.postId)
                    }}
                  />
                )
              }),
            )}
          </Fragment>
        )
      })}
      {/* <Box ref={targetRef}>{isLoading && '로딩중입니다...'}</Box> */}
    </ListStack>
  )
}

export default NoticeList
