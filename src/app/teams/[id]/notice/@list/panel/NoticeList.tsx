import { Fragment, useEffect } from 'react'
import { Box } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import axios from 'axios'
import {
  ListStack,
  StatusMessage,
  ListItem,
} from '@/components/board/ListPanel'
import { useInfiniteSWRScroll } from '@/hook/useInfiniteScroll'
import useTeamPageState from '@/states/useTeamPageState'
import { ITeamNotice } from '@/types/TeamBoardTypes'
import useMedia from '@/hook/useMedia'

const NoticeList = ({
  teamId,
  keyword,
}: {
  teamId: number
  keyword: string
}) => {
  // const axiosWithAuth = useAxiosWithAuth()
  const { setNotice } = useTeamPageState()
  const { data, error, isLoading, size, setSize, targetRef } =
    useInfiniteSWRScroll(
      `/api/v1/team/notice/${teamId}?pageSize=${10}&keyword=${keyword}`,
      (url: string) => axios.get(url).then((res) => res.data),
    )
  useEffect(() => {
    // keyword가 바뀔 때마다 size를 0으로 초기화 (size의 초깃값은 0입니다.)
    if (!isLoading && size !== 0) setSize(0)
  }, [keyword])
  const { isPc } = useMedia()

  if (!data || error) return <StatusMessage message="문제가 발생했습니다." />
  if (!data && isLoading)
    return <StatusMessage message="공지사항을 불러오는 중입니다..." />
  if (data.length === 0 || data[0].content.length === 0)
    return <StatusMessage message="등록된 글이 없습니다." />
  return (
    <ListStack isPc={isPc}>
      {data.map((page, index) => {
        return (
          <Fragment key={index}>
            {page.content.map((notice: ITeamNotice) => {
              return (
                <ListItem
                  key={notice.postId}
                  isPc={isPc}
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
