import { ReactNode, useEffect, Fragment } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Box, Stack, Typography } from '@mui/material'
import useAxiosWithAuth from '@/api/config'
import { useInfiniteSWRScroll } from '@/hook/useInfiniteScroll'
import { ITeamNotice } from '@/types/TeamBoardTypes'

interface NoticeItemProps {
  title: string
  author: string
  date: string
  id: number
  teamId: number
}

const NoticeListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack spacing={3} sx={{ height: '300px', overflowY: 'scroll' }}>
      {children}
    </Stack>
  )
}

const NoticeItem = ({ title, author, date, id, teamId }: NoticeItemProps) => {
  return (
    <Link href={`/teams/${teamId}/notice/${id}`}>
      <Stack>
        <Typography variant={'Body1'}>{title}</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant={'Body2'}>{author}</Typography>
        <Typography variant={'Caption'}>{date}</Typography>
      </Stack>
    </Link>
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
  const { data, error, isLoading, size, setSize, targetRef } =
    useInfiniteSWRScroll(
      `/api/v1/team/notice/${teamId}?pageSize=${10}&keyword=${keyword}`,
      (url: string) => axiosWithAuth.get(url).then((res) => res.data),
    )
  useEffect(() => {
    // keyword가 바뀔 때마다 size를 0으로 초기화 (size의 초깃값은 0입니다.)
    if (!isLoading && size !== 0) setSize(0)
  }, [keyword])

  if (error || !data)
    return (
      <NoticeListContainer>
        <Typography>문제가 발생했습니다.</Typography>
      </NoticeListContainer>
    )

  if (!data && isLoading)
    return (
      <NoticeListContainer>
        <Typography>로딩중입니다...</Typography>
      </NoticeListContainer>
    )

  if (data.length === 0 || data[0].content.length === 0)
    return (
      <NoticeListContainer>
        <Typography>공지사항이 없습니다.</Typography>
      </NoticeListContainer>
    )

  return (
    <NoticeListContainer>
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
    </NoticeListContainer>
  )
}

export default NoticeList
