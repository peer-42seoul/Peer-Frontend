'use client'

import { usePathname, useRouter } from 'next/navigation'
import CuNavBar from '@/components/CuNavBar'
import {
  BoardIcon,
  MainIcon,
  NoticeIcon,
  PeerlogIcon,
  SettingIcon,
  ShowcaseIcon,
} from '@/icons/TeamPage'
import * as style from './NavBar.style'
import {
  Badge,
  Box,
  Stack,
  ToggleButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { ToggleButtonGroup } from '@mui/material'
import * as CuStyle from '../../../../components/CuNavBar.style'
import useMedia from '@/hook/useMedia'

const getTabValue = (path: string) => {
  if (path.includes('/notice')) return 'notice'
  else if (path.includes('/board')) return 'board'
  else if (path.includes('/setting')) return 'setting'
  else if (path.includes('/peerlog')) return 'peerlog'
  else if (path.includes('/showcase')) return 'showcase'
  else return 'main'
}

interface ITabInfo {
  label: string
  mobileLabel?: string
  onClick: () => void
  value: string
  icon: ReactElement
  disabled?: boolean
  new?: boolean
  isBeta?: boolean
}

interface ICuNavBarProps {
  getTabValue: (path: string) => string
  tabData: ITabInfo[]
}

const MobileSidebar = ({ getTabValue, tabData }: ICuNavBarProps) => {
  const pathName = usePathname()
  const [value, setValue] = useState<string | undefined>(undefined)

  const setTabValue = useCallback(() => {
    setValue(getTabValue(pathName))
  }, [pathName, getTabValue])

  useEffect(() => {
    setTabValue()
  }, [setTabValue])

  return (
    <Box sx={{ marginBottom: '2rem', width: '70%' }}>
      <ToggleButtonGroup
        orientation={'horizontal'}
        fullWidth={false}
        value={value}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: 0,
          '& .MuiToggleButtonGroup-grouped': {
            borderRadius: '0.5rem',
          },
        }}
        exclusive
        onChange={(_event, newValue) => {
          if (newValue) setValue(newValue)
        }}
      >
        {[
          tabData.map((tab) => (
            <MobileToggleButton
              key={crypto.randomUUID()}
              tab={tab}
              selected={value === tab.value}
              width={180 / tabData.length}
            />
          )),
        ]}
      </ToggleButtonGroup>
    </Box>
  )
}

const MobileToggleButton = ({
  tab,
  selected,
  width,
}: {
  tab: ITabInfo
  selected: boolean
  width: number
}) => {
  const isNewTab = tab.new && !tab.disabled
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={{ ...CuStyle.mobileTab, width: `${width}%` }}
      disabled={tab.disabled}
      selected={selected}
    >
      <Stack direction={'column'} spacing={'0.12rem'} alignItems={'center'}>
        <Badge
          sx={isNewTab ? CuStyle.newBadge : CuStyle.betaBadge}
          variant={'dot'}
          invisible={!isNewTab && !tab.isBeta}
        >
          <Box sx={CuStyle.iconBoxBase}>{tab.icon}</Box>
        </Badge>
        <Typography variant={'Tag'}>{tab.mobileLabel ?? tab.label}</Typography>
      </Stack>
    </ToggleButton>
  )
}

const TeamSidebar = ({ id }: { id: string }) => {
  const router = useRouter()
  const isTablet = useMediaQuery('(min-width: 997px)')
  const { isPc } = useMedia()
  if (!isTablet && isPc) {
    return (
      <MobileSidebar
        getTabValue={getTabValue}
        tabData={[
          {
            label: '메인',
            onClick: () => router.push(`/teams/${id}`),
            value: 'main',
            icon: <MainIcon sx={style.main} />,
          },
          {
            label: '공지사항',
            onClick: () => router.push(`/teams/${id}/notice`),
            value: 'notice',
            icon: <NoticeIcon sx={style.notice} />,
          },
          {
            label: '게시판',
            onClick: () => router.push(`/teams/${id}/board`),
            value: 'board',
            icon: <BoardIcon sx={style.board} />,
          },
          {
            label: '팀설정',
            onClick: () => router.push(`/teams/${id}/setting`),
            value: 'setting',
            icon: <SettingIcon sx={style.setting} />,
          },
          {
            label: '피어로그',
            onClick: () => router.push(`/teams/${id}/peerlog`),
            value: 'peerlog',
            icon: <PeerlogIcon sx={style.peerlog} />,
            isBeta: true,
            disabled: true,
          },
          {
            label: '쇼케이스',
            onClick: () => router.push(`/teams/${id}/showcase`),
            value: 'showcase',
            icon: <ShowcaseIcon sx={style.showcase} />,
            new: true,
          },
        ]}
      />
    )
  }

  return (
    <CuNavBar
      getTabValue={getTabValue}
      title={'나의 팀페이지'}
      tabData={[
        {
          label: '메인',
          onClick: () => router.push(`/teams/${id}`),
          value: 'main',
          icon: <MainIcon sx={style.main} />,
        },
        {
          label: '공지사항',
          onClick: () => router.push(`/teams/${id}/notice`),
          value: 'notice',
          icon: <NoticeIcon sx={style.notice} />,
        },
        {
          label: '게시판',
          onClick: () => router.push(`/teams/${id}/board`),
          value: 'board',
          icon: <BoardIcon sx={style.board} />,
        },
        {
          label: '팀설정',
          onClick: () => router.push(`/teams/${id}/setting`),
          value: 'setting',
          icon: <SettingIcon sx={style.setting} />,
        },
        {
          label: '피어로그',
          onClick: () => router.push(`/teams/${id}/peerlog`),
          value: 'peerlog',
          icon: <PeerlogIcon sx={style.peerlog} />,
          isBeta: true,
          disabled: true,
        },
        {
          label: '쇼케이스',
          onClick: () => router.push(`/teams/${id}/showcase`),
          value: 'showcase',
          icon: <ShowcaseIcon sx={style.showcase} />,
          new: true,
        },
      ]}
    />
  )
}

export default TeamSidebar
