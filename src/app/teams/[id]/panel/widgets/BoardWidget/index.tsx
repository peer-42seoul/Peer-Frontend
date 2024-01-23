'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import useModal from '@/hook/useModal'
import useMedia from '@/hook/useMedia'
import { NoticeIcon } from '@/icons/TeamPage'
import { SizeType } from '@/types/ITeamDnDLayout'
import { ITeamNotice } from '@/types/TeamBoardTypes'
import WidgetCard from '../WidgetCard'
import * as style from './index.style'
import { Stack, Typography } from '@mui/material'

interface IBoardWidgetRenderProps {
  isPc?: boolean
  teamId?: string | string[]
  postId?: number
  listData?: ITeamNotice[]
}

interface IBoardWidgetContainerProps {
  openModal: () => void
  isPc: boolean
  children: React.ReactNode
}

const BoardWidget = ({ size }: { size: SizeType }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { isPc } = useMedia()
  const { id } = useParams()

  const axiosWithAuth = useAxiosWithAuth()
  const mockData: ITeamNotice[] = [
    {
      postId: 1,
      title:
        '11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.',
      authorNickname: '김팀장',
      createdAt: new Date(),
    },
  ]
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/${id}?pageSize=${8}page=${1}keyword=`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  if (isLoading)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <CuCircularProgress color={'secondary'} />
      </BoardWidgetContainer>
    )
  if (!data || error)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <StatusMessage message={'글을 불러오는 중 문제가 발생했습니다.'} />
      </BoardWidgetContainer>
    )
  if (data.content.length === 0)
    return (
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        <StatusMessage message={'등록된 글이 없습니다.'} />
      </BoardWidgetContainer>
    )

  return (
    <>
      <BoardWidgetContainer openModal={openModal} isPc={isPc}>
        {size === 'L' ? (
          <BoardWidgetList isPc={isPc} listData={data.content} />
        ) : (
          <BoardWidgetSingle postId={data.content[0].postId} />
        )}
      </BoardWidgetContainer>
      {/* 모달 */}
    </>
  )
}

const BoardWidgetContainer = ({
  openModal,
  isPc,
  children,
}: IBoardWidgetContainerProps) => {
  return (
    <WidgetCard
      onClick={openModal}
      contentSx={isPc ? style.widgetContent : style.mobileWidgetContent}
    >
      <Stack spacing={isPc ? '1.5rem' : '0.5rem'}>
        <Stack direction={'row'} spacing={'0.25rem'}>
          <NoticeIcon sx={style.titleIcon} />
          <Typography variant={'Title3Emphasis'}>공지사항</Typography>
        </Stack>
        {children}
      </Stack>
    </WidgetCard>
  )
}

const BoardWidgetList = ({ isPc, listData }: IBoardWidgetRenderProps) => {
  // size l
  return (
    <Stack spacing={isPc ? '1rem' : '0,5rem'}>
      {listData?.map((item) => <div key={item.postId}>{item.title}</div>)}
    </Stack>
  )
}

const BoardWidgetSingle = ({ postId }: IBoardWidgetRenderProps) => {
  // size m
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/${postId}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  if (isLoading) return <CuCircularProgress color={'secondary'} />
  if (!data || error)
    return <StatusMessage message="글을 불러오는 중 문제가 발생했습니다." />
  return <div>{data?.title}</div>
}

const StatusMessage = ({ message }: { message: string }) => {
  return (
    <Typography variant={'Body2'} color={'text.alternative'}>
      {message}
    </Typography>
  )
}

export default BoardWidget
