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
  Card,
  Drawer,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { SyntheticEvent, useCallback, useState } from 'react'
import { Box } from '@mui/system'
import { CloseIcon } from '@/icons'
import useAuthStore from '@/states/useAuthStore'
import { SystemIcon, TeamIcon, MessageIcon } from './alert-panel/Icons'
import NoDataDolphin from '@/components/NoDataDolphin'
import { useRouter } from 'next/navigation'

enum AlertType {
  MESSAGE = '쪽지',
  TEAM = '팀',
  NOTICE = '공지',
}

interface IAlert {
  id: number
  type: AlertType
  title: string
  content: string
}

const mockData = [
  {
    id: 1,
    type: AlertType.MESSAGE,
    title: '알림1',
    content:
      '알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용',
  },
  {
    id: 2,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 3,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 4,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 5,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 6,
    type: AlertType.NOTICE,
    title: '알림3',
    content: '알림3 내용',
  },
  {
    id: 7,
    type: AlertType.MESSAGE,
    title: '알림1',
    content:
      '알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용알림1 내용',
  },
  {
    id: 8,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 9,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 10,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 11,
    type: AlertType.TEAM,
    title: '알림2',
    content: '알림2 내용',
  },
  {
    id: 12,
    type: AlertType.NOTICE,
    title: '알림3',
    content: '알림3 내용',
  },
]

const AlertIcon = () => {
  // const isAlertComing = false
  const { isPc } = useMedia()
  // const { isOpen, openModal, closeModal } = useModal()

  // 알림 탭 관련
  const [alertData, setAlertData] = useState<IAlert[]>(mockData)
  const [showAlert, setShowAlert] = useState<IAlert[]>(alertData)
  const [tabvalue, setTabValue] = useState(0)
  const [isAlertComing, setIsAlertComing] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { isLogin } = useAuthStore()
  const router = useRouter()

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
      switch (newValue) {
        case 0:
          setShowAlert(alertData)
          break
        case 1: {
          const message = alertData.filter(
            (item) => item.type === AlertType.MESSAGE,
          )
          setShowAlert(message)
          break
        }
        case 2: {
          const team = alertData.filter((item) => item.type === AlertType.TEAM)
          setShowAlert(team)
          break
        }
        case 3: {
          const notice = alertData.filter(
            (item) => item.type === AlertType.NOTICE,
          )
          setShowAlert(notice)
          break
        }
        default:
          break
      }
    },
    [setTabValue, setAlertData, alertData],
  )

  const handleDelete = (id: number) => {
    setAlertData(alertData.filter((item) => item.id !== id))
    setShowAlert(showAlert.filter((item) => item.id !== id))
  }

  const handleDeleteAll = () => {
    setAlertData([])
    setShowAlert([])
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
        <Badge color="secondary" variant="dot" invisible={isAlertComing}>
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
              <NoDataDolphin message="로그인이 필요합니다." />
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
                  onClick={handleDeleteAll}
                >
                  전체 삭제
                </Button>
              </Stack>

              <Stack sx={{ overflowY: 'auto' }}>
                <Stack height={'100%'}>
                  {showAlert.map((item) => (
                    <Card
                      key={item.type + item.id}
                      sx={{
                        m: 2,
                        height: '4rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Stack p={'0.5rem'} flex={1}>
                        {item.type === '쪽지' && (
                          <SystemIcon fontSize="large" />
                        )}
                        {item.type === '팀' && <TeamIcon fontSize="large" />}
                        {item.type === '공지' && (
                          <MessageIcon fontSize="large" />
                        )}
                      </Stack>
                      <Stack
                        direction={'row'}
                        spacing={1}
                        display={'flex'}
                        alignItems={'center'}
                        flex={8}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {item.content}
                        </Typography>
                      </Stack>
                      <Stack flex={1}>
                        <IconButton onClick={() => handleDelete(item.id)}>
                          <CloseIcon />
                        </IconButton>
                      </Stack>
                    </Card>
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
