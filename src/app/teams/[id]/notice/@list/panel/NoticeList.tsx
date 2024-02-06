import { Fragment, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

const NoticeList = ({
  teamId,
  keyword,
}: {
  teamId: number
  keyword: string
}) => {
  const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
  const { data, error, isLoading, size, setSize, targetRef } =
    useInfiniteSWRScroll(
      `/api/v1/team-page/notice/${teamId}?keyword=&${keyword}pageSize=${10}`,
      (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    )
  const router = useRouter()
  useEffect(() => {
    // keyword가 바뀔 때마다 size를 1로 초기화 (다시 첫 페이지부터 불러오기)
    if (!isLoading && size !== 1) setSize(1)
  }, [keyword])

  const isEmpty = !data || data.length === 0 || data[0].content.length === 0

  if (error) {
    if (error.status === 403) {
      alert('팀 페이지에 접근할 권한이 없습니다.')
    } else {
      alert('팀 페이지에 접근할 수 없습니다.')
    }
    router.push('/team-list')
    return <StatusMessage message="문제가 발생했습니다." />
  }

  if (!isLoading && !data) {
    alert('팀 페이지에 접근할 수 없습니다.')
    router.push('/team-list')
    return <StatusMessage message="문제가 발생했습니다." />
  }

  if (isLoading) return <StatusMessage message="로딩중입니다..." />

  return (
    <ListStack>
      {isEmpty ? (
        <StatusMessage message="등록된 공지사항이 없습니다. 팀 리더라면 새로운 공지사항을 작성해보세요!" />
      ) : (
        data?.map((page, index) => {
          return (
            <Fragment key={index}>
              {page.content.map((notice: ITeamNotice) => {
                return (
                  <ListItem
                    key={notice.postId}
                    title={notice.title}
                    authorNickname={notice.nickname}
                    createdAt={notice.createdAt}
                    onClick={() => {
                      setNotice('DETAIL', notice.postId)
                    }}
                  />
                )
              })}
            </Fragment>
          )
        })
      )}
      <Box ref={targetRef}>{isLoading && '로딩중입니다...'}</Box>
    </ListStack>
  )
}

export default NoticeList
