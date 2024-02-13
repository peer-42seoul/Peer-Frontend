'use client'

import { IconButton } from '@mui/material'
import NotificationIcon from '@/icons/NotificationIcon'
import useMedia from '@/hook/useMedia'

// 알림 잠그기

// import { Badge } from '@mui/material'
// import ForbiddenDolphin from '@/components/WorkingDolphin'
// import CuModal from '@/components/CuModal'
// import useModal from '@/hook/useModal'

// 알림탭 관련

import {
  Badge,
  Button,
  Drawer,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { CloseIcon } from '@/icons'
import useAuthStore from '@/states/useAuthStore'
import NoDataDolphin from '@/components/NoDataDolphin'
import { useRouter } from 'next/navigation'
import useAlarmStorage, { AlarmType, IAlarm } from '@/states/useAlarmStorage'
import AlertCard from './alert-panel/AlertCard'

const AlertIcon = () => {
  // const isAlertComing = false
  const { isPc } = useMedia()
  // const { isOpen, openModal, closeModal } = useModal()

  // 알림 탭 관련
  const { isNewAlarm, isNew, getAlarms, alarms, deleteAlarm, deleteAllAlarms } =
    useAlarmStorage()
  const [tabvalue, setTabValue] = useState(0)
  const [isAlertComing, setIsAlertComing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { isLogin } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    isNewAlarm(isLogin)
  }, [])

  useEffect(() => {
    if (isDrawerOpen) {
      getAlarms()
      if (isAlertComing) {
        setIsAlertComing(false)
      }
    }
  }, [isDrawerOpen, isAlertComing])

  const openAlertTab = useCallback(() => {
    setIsAlertComing(true)
    setIsDrawerOpen(true)
  }, [setIsAlertComing, setIsDrawerOpen])

  const toggleDrawer = useCallback(
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsDrawerOpen(open)
    },
    [setIsDrawerOpen],
  )

  const handleChange = (e: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleClose = () => {
    setIsDrawerOpen(false)
  }

  const handleLogin = () => {
    setIsDrawerOpen(false)
    router.push('/login')
  }

  return (
    <>
      <IconButton color="inherit" aria-label="alert_tab" onClick={openAlertTab}>
        <Badge color="secondary" variant="dot" invisible={!isNew}>
          <NotificationIcon
            sx={{
              color: isPc ? 'text.alternative' : 'text.normal',
              width: '1.25rem',
              height: '1.25rem',
            }}
          />
        </Badge>
      </IconButton>
      {/* <CuModal open={isOpen} onClose={closeModal} title="잠깐!">
        <ForbiddenDolphin message="알림 기능은 조금만 기다려주세요!!" />
      </CuModal> */}
      <Drawer
        PaperProps={{
          sx: {
            height: '100%',
            backgroundColor: 'background.primary',
            overflowY: 'visible',
          },
        }}
        variant="temporary"
        anchor={isPc ? 'right' : 'left'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Box
          sx={{
            width: isPc ? 400 : '100dvw',
            height: '100svh',
            pt: 7,
            backgroundColor: 'background.primary',
          }}
        >
          <Stack direction={'row'} mb={'0.25rem'}>
            {!isPc && (
              <Stack width={'33%'} mx={'0.5rem'} justifyContent={'center'}>
                <CloseIcon onClick={handleClose} />
              </Stack>
            )}
            <Stack
              width={'33%'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography variant="h6" align="center">
                알림
              </Typography>
            </Stack>
            <Stack width={'33%'} mx={'0.5rem'} />
          </Stack>
          {!isLogin ? (
            <Stack justifyContent={'center'} height={'50svh'}>
              <NoDataDolphin
                message="로그인이 필요합니다."
                backgroundColor="transparent"
              />
              <Stack alignItems={'center'}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: 'fit-content', borderRadius: 0 }}
                  onClick={handleLogin}
                >
                  로그인
                </Button>
              </Stack>
            </Stack>
          ) : (
            <>
              <Tabs
                variant="fullWidth"
                value={tabvalue}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
              >
                <Tab label="전체" />
                <Tab label="쪽지" />
                <Tab label="팀" />
                <Tab label="공지" />
              </Tabs>
              <Stack sx={{ alignItems: 'end', mx: '1rem' }}>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ width: 'fit-content', borderRadius: 0 }}
                  onClick={() => deleteAllAlarms(tabvalue)}
                >
                  전체 삭제
                </Button>
              </Stack>

              <Stack sx={{ overflowY: 'auto' }}>
                <Stack height={'100%'}>
                  {alarms.length === 0 && (
                    <NoDataDolphin
                      backgroundColor="transparent"
                      message="알림이 없습니다."
                    />
                  )}
                  {alarms.length > 0 &&
                    tabvalue === 0 &&
                    alarms.map((item: IAlarm) => (
                      <AlertCard
                        key={'alarm' + item.notificationId}
                        handleDelete={() => deleteAlarm(item.notificationId)}
                        alert={item}
                      />
                    ))}
                  {alarms.length > 0 &&
                    tabvalue === 1 &&
                    alarms
                      .filter((item) => item.type === AlarmType.MESSAGE)
                      .map((item: IAlarm) => (
                        <AlertCard
                          key={'alarm' + item.notificationId}
                          handleDelete={() => deleteAlarm(item.notificationId)}
                          alert={item}
                        />
                      ))}
                  {alarms.length > 0 &&
                    tabvalue === 2 &&
                    alarms
                      .filter((item) => item.type === AlarmType.TEAM)
                      .map((item: IAlarm) => (
                        <AlertCard
                          key={'alarm' + item.notificationId}
                          handleDelete={() => deleteAlarm(item.notificationId)}
                          alert={item}
                        />
                      ))}
                  {alarms.length > 0 &&
                    tabvalue === 3 &&
                    alarms
                      .filter((item) => item.type === AlarmType.SYSTEM)
                      .map((item: IAlarm) => (
                        <AlertCard
                          key={'alarm' + item.notificationId}
                          handleDelete={() => deleteAlarm(item.notificationId)}
                          alert={item}
                        />
                      ))}
                </Stack>
              </Stack>
            </>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default AlertIcon
