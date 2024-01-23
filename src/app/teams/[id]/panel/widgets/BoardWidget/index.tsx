'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import useModal from '@/hook/useModal'
import useMedia from '@/hook/useMedia'
import { NoticeIcon } from '@/icons/TeamPage'
import { SizeType } from '@/types/ITeamDnDLayout'
import { ITeamNotice } from '@/types/TeamBoardTypes'
import WidgetCard from '../WidgetCard'
import * as style from './index.style'
import { Stack, Typography } from '@mui/material'

interface IBoardWidgetRenderProps {
  isPc: boolean
  size: SizeType
  data: ITeamNotice[]
}

const BoardWidget = ({ size }: { size: SizeType }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const { isPc } = useMedia()
  const { id: teamId } = useParams()
  // TODO 데이터 받아서 렌더링
  const mockData: ITeamNotice[] = [
    {
      postId: 1,
      title:
        '11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.',
      authorNickname: '김팀장',
      createdAt: new Date(),
    },
  ]
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR(
    `/api/v1/team/notice/${teamId}?pageSize=${8}page=${1}keyword=`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  // if (isLoading) return <div>로딩중</div>
  // if (!data || error) return <div>에러</div>

  return (
    <>
      const {isPc} = useMedia()
      <WidgetCard
        onClick={openModal}
        contentSx={isPc ? style.widgetContent : style.mobileWidgetContent}
      >
        <Stack spacing={isPc ? '1.5rem' : '0.5rem'}>
          <Stack direction={'row'} spacing={'0.25rem'}>
            <NoticeIcon sx={style.titleIcon} />
            <Typography variant={'Title3Emphasis'}>공지사항</Typography>
          </Stack>
          <BoardWidgetList isPc={isPc} size={size} data={mockData} />
        </Stack>
      </WidgetCard>
      {/* 모달 */}
      {isOpen && <div onClick={closeModal}>Modal</div>}
    </>
  )
}

const BoardWidgetList = ({ isPc, size }: IBoardWidgetRenderProps) => {
  if (size === 'L') {
    return (
      <Stack spacing={isPc ? '1rem' : '0,5rem'}>
        <div>LARGE WIDGET</div>
      </Stack>
    )
  }
  return <div>SMALL WIDGET</div>
}

export default BoardWidget
