import { useState, ReactElement, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ChevronLeft } from '@/icons'
import * as style from './CuNavBar.style'

interface ITabInfo {
  label: string
  mobileLabel?: string
  onClick: () => void
  value: string
  icon: ReactElement
  disabled?: boolean
  new?: boolean
}

interface ICuNavBarProps {
  getTabValue: (path: string) => string
  title: string
  prevButtonAction?: () => void
  tabData: ITabInfo[]
}

/**
 * @description 마이페이지와 개별 팀 페이지에서 사용되는 네비게이션 바 컴포넌트 입니다.
 *
 * @param getTabValue 현재 페이지의 탭 값을 가져오는 함수
 * @param title 타이틀
 * @param prevButtonAction (선택) 이전 버튼 클릭 시 실행되는 함수
 * @param tabData 탭 정보
 * - label 탭 이름
 * - mobileLabel (선택) 탭 이름 (모바일)
 * - onClick 탭 클릭 시 실행되는 함수
 * - value 탭 값
 * - icon 탭 아이콘
 */

const CuNavBar = ({
  getTabValue,
  title,
  prevButtonAction,
  tabData,
}: ICuNavBarProps) => {
  const pathName = usePathname()
  const [value, setValue] = useState<string | undefined>(undefined)
  const { isPc } = useMedia()

  useEffect(() => {
    setValue(getTabValue(pathName))
  }, [pathName])

  return (
    <Box sx={isPc ? style.pcNavBar : style.mobileNavBar}>
      {isPc && (
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          alignItems={'center'}
          height={'2.5rem'}
        >
          {prevButtonAction ? (
            <IconButton onClick={prevButtonAction}>
              <ChevronLeft width={'1.5rem'} height={'1.5rem'} />
            </IconButton>
          ) : null}
          <Typography variant={'Body2Emphasis'}>{title}</Typography>
        </Stack>
      )}
      <ToggleButtonGroup
        orientation={isPc ? 'vertical' : 'horizontal'}
        value={value}
        sx={style.tabs}
        exclusive
        fullWidth
        onChange={(_event, newValue) => {
          setValue(newValue)
        }}
      >
        <>
          {isPc ? (
            <>
              {tabData.map((tab, index) => (
                <PcToggleButton
                  key={index}
                  tab={tab}
                  selected={value === tab.value}
                />
              ))}
            </>
          ) : (
            <Box
              width={'100%'}
              display="grid"
              gridTemplateColumns={`repeat(${tabData.length}, 1fr)`}
              gap={'0.5rem'}
            >
              {tabData.map((tab, index) => (
                <MobileToggleButton
                  key={index}
                  tab={tab}
                  selected={value === tab.value}
                />
              ))}
            </Box>
          )}
        </>
      </ToggleButtonGroup>
    </Box>
  )
}

const PcToggleButton = ({
  tab,
  selected,
}: {
  tab: ITabInfo
  selected: boolean
}) => {
  const isNewTab = tab.new && !tab.disabled
  return (
    <Box gridColumn={'span 1'}>
      <ToggleButton
        value={tab.value}
        onClick={tab.onClick}
        sx={{
          ...style.pcTab,
          ...(isNewTab ? style.newTab : undefined),
        }}
        disabled={tab.disabled}
        selected={selected}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box
            sx={
              selected
                ? style.selectedIconBox
                : tab.disabled
                  ? style.disabledIconBox
                  : style.iconBox
            }
          >
            {tab.icon}
          </Box>
          <Typography
            variant={'Caption'}
            color={
              selected
                ? 'purple.strong'
                : tab.disabled
                  ? 'custom.disabledNavTab'
                  : 'text.assistive'
            }
          >
            {tab.label}
          </Typography>
          {isNewTab && (
            <Typography sx={style.newTextBadge} variant={'Caption'}>
              NEW
            </Typography>
          )}
        </Stack>
      </ToggleButton>
    </Box>
  )
}
const MobileToggleButton = ({
  tab,
  selected,
}: {
  tab: ITabInfo
  selected: boolean
}) => {
  return (
    <ToggleButton
      value={tab.value}
      onClick={tab.onClick}
      sx={style.mobileTab}
      disabled={tab.disabled}
    >
      <Stack direction={'column'} spacing={'0.12rem'}>
        <Box
          sx={
            selected
              ? style.selectedIconBox
              : tab.disabled
                ? style.disabledIconBox
                : style.iconBox
          }
        >
          {tab.icon}
        </Box>
        <Typography variant={'Caption'}>
          {tab.mobileLabel ?? tab.label}
        </Typography>
      </Stack>
    </ToggleButton>
  )
}

export default CuNavBar
