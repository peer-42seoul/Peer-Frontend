'use client'

import { CircularProgress, IconButton } from '@mui/material'
import NotificationIcon from '@/icons/NotificationIcon'
import useMedia from '@/hook/useMedia'
import { usePathname, useSearchParams } from 'next/navigation'

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
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Box } from '@mui/system'
import { CloseIcon } from '@/icons'
import useAuthStore from '@/states/useAuthStore'
import NoDataDolphin from '@/components/NoDataDolphin'
import { useRouter } from 'next/navigation'
import useAlarmStorage, { IAlarm } from '@/states/useAlarmStorage'
import AlertCard from './alert-panel/AlertCard'
import { debounce } from 'lodash'

const useInfiniteScroll = ({
  setPage,
  mutate,
  isEnd,
  page,
  isDrawerOpen,
  tabvalue,
}: {
  setPage: Dispatch<SetStateAction<number>>
  mutate: any
  isEnd: boolean
  page: number
  isDrawerOpen: boolean
  tabvalue: number
}) => {
  const [spinner, setSpinner] = useState(false)
  const target = useRef(null)

  const debouncedFetchData = debounce(async () => {
    // 데이터 업데이트. setSpinner을 언제 true할지 정해야.
    setSpinner(true)
    await mutate(page, tabvalue)
    setPage(page + 1)
    setSpinner(false)
  }, 1000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!spinner && isEnd === false && isDrawerOpen) {
            // 스피너를 표시하고 페이지 번호를 증가시킨 후 디바운스된 데이터 가져오기 함수 호출
            // 가능한 페이지 양을 도달했다면 더이상 로딩하지 않는다.
            debouncedFetchData()
          }
        }
      },
      { threshold: 0.8 },
    )

    const currentTarget = target.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    // 컴포넌트가 언마운트되면 IntersectionObserver 해제
    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [target, spinner, debouncedFetchData, page, isEnd, isDrawerOpen, tabvalue])

  return { target, spinner }
}

const AlertIcon = () => {
  // const isAlertComing = false
  const { isPc } = useMedia()
  // const { isOpen, openModal, closeModal } = useModal()

  // 알림 탭 관련
  const {
    isNewAlarm,
    isNew,
    getAlarms,
    alarms,
    deleteAlarm,
    deleteAllAlarms,
    checkNewAlarm,
    resetAlarms,
  } = useAlarmStorage()
  const [tabvalue, setTabValue] = useState(0)
  const [page, setPage] = useState(1)
  const [isAlertComing, setIsAlertComing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate: getAlarms,
    isEnd: alarms[alarms.length - 1]?.isEnd || false,
    page,
    isDrawerOpen,
    tabvalue,
  })

  useEffect(() => {
    isNewAlarm(isLogin)
  }, [pathname, searchParams, isLogin, isNewAlarm])

  useEffect(() => {
    if (isDrawerOpen) {
      checkNewAlarm()
      if (page === 1) {
        getAlarms(page, tabvalue)
        setPage(page + 1)
      }
      if (isAlertComing) {
        setIsAlertComing(false)
      }
    } else {
      resetAlarms()
      setPage(1)
    }
  }, [isDrawerOpen, setIsAlertComing, tabvalue])

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

  const handleChange = useCallback(
    (e: SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
      setPage(1)
      resetAlarms()
    },
    [tabvalue, setPage, resetAlarms],
  )

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
            height: '100dvh',
            pt: 7,
            backgroundColor: 'background.primary',
            // overflowY: 'auto',
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
            <Stack height={'fit-content'}>
              <Tabs
                variant="fullWidth"
                value={tabvalue}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { display: 'none' },
                }}
              >
                <Tab value={0} label="전체" />
                <Tab value={1} label="쪽지" />
                <Tab value={2} label="팀" />
                <Tab value={3} label="공지" />
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

              <Box sx={{ overflowY: 'auto', height: '75svh' }}>
                <Stack height={'fit-content'}>
                  {alarms.length === 0 ? (
                    <NoDataDolphin
                      backgroundColor="transparent"
                      message="알림이 없습니다."
                    />
                  ) : (
                    <>
                      {alarms.map((item: IAlarm) => (
                        <AlertCard
                          key={'alarm' + item.notificationId}
                          handleDelete={() => deleteAlarm(item.notificationId)}
                          alert={item}
                        />
                      ))}
                      <Box position={'relative'} ref={target} height={1}>
                        {spinner && <CircularProgress />}
                      </Box>
                    </>
                  )}
                </Stack>
              </Box>
            </Stack>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default AlertIcon
