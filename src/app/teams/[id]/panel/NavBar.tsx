'use client'

import { useRouter } from 'next/navigation'
import CuNavBar from '@/components/CuNavBar'
import {
  BoardIcon,
  MainIcon,
  NoticeIcon,
  PeerlogIcon,
  SettingIcon,
  ShowcaseIcon,
} from '@/icons/TeamPage'

const getTabValue = (path: string) => {
  if (path.includes('/notice')) return 'notice'
  else if (path.includes('/board')) return 'board'
  else if (path.includes('/setting')) return 'setting'
  else return 'main'
}

const TeamSidebar = ({ id }: { id: string }) => {
  const router = useRouter()
  return (
    <CuNavBar
      getTabValue={getTabValue}
      title={'나의 팀페이지'}
      tabData={[
        {
          label: '메인',
          onClick: () => router.push(`/teams/${id}`),
          value: 'main',
          icon: <MainIcon />,
        },
        {
          label: '공지사항',
          onClick: () => router.push(`/teams/${id}/notice`),
          value: 'notice',
          icon: <NoticeIcon />,
        },
        {
          label: '게시판',
          onClick: () => router.push(`/teams/${id}/board`),
          value: 'board',
          icon: <BoardIcon />,
        },
        {
          label: '팀설정',
          onClick: () => router.push(`/teams/${id}/setting`),
          value: 'setting',
          icon: <SettingIcon />,
        },
        {
          label: '피어로그',
          onClick: () => router.push(`/teams/${id}/peerlog`),
          value: 'peerlog',
          icon: <PeerlogIcon />,
          new: true,
        },
        {
          label: '쇼케이스',
          onClick: () => router.push(`/teams/${id}/showcase`),
          value: 'showcase',
          icon: <ShowcaseIcon />,
          new: true,
          disabled: true,
        },
      ]}
    />
  )
}

export default TeamSidebar
