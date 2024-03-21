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
import { ITeamPost } from '@/types/TeamBoardTypes'

const BoardPostList = ({
  boardId,
  keyword,
}: {
  boardId: number
  keyword: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setBoard } = useTeamPageState()
  const { data, error, isLoading, size, setSize, targetRef } =
    useInfiniteSWRScroll(
      `/api/v1/team-page/posts/${boardId}?&size=${10}&keyword=${keyword}`,
      (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    )

  useEffect(() => {
    // keyword가 바뀔 때마다 size를 1로 초기화 (다시 첫 페이지부터 불러오기)
    if (!isLoading && size !== 1) setSize(1)
  }, [keyword])

  if (!data && isLoading)
    return <StatusMessage message="게시글을 불러오는 중입니다..." />

  if (!data || error) return <StatusMessage message="문제가 발생했습니다." />

  if (data.length === 0 || data[0].content.length === 0)
    return <StatusMessage message="등록된 글이 없습니다." />
  return (
    <ListStack>
      {data.map((page) => {
        return (
          <Fragment key={crypto.randomUUID()}>
            {page.content.map((post: ITeamPost) => (
              <ListItem
                key={post.postId}
                title={post.title}
                authorNickname={post.nickname}
                createdAt={post.date}
                onClick={() => {
                  setBoard('DETAIL', boardId, post.postId)
                }}
                hit={post.hit}
              />
            ))}
          </Fragment>
        )
      })}
      <Box ref={targetRef}>{isLoading && '로딩중입니다...'}</Box>
    </ListStack>
  )
}

export default BoardPostList
