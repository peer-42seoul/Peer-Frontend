'use client'

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
  return (
    <>
      <WidgetCard contentSx={style.widgetContent} onClick={openModal}>
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
