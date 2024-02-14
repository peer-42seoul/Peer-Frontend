'use client'
import useAxiosWithAuth from '@/api/config'
import { BetaBadge } from '@/components/BetaBadge'
import CuTextModal from '@/components/CuTextModal'
import CuToggle from '@/components/CuToggle'
import TitleBox from '@/components/TitleBox'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import { Box, FormControlLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Notif = ({
  checked,
  handleChange,
  type,
  name,
  contents,
}: {
  checked: boolean
  handleChange: ({ name, checked }: { name: string; checked: boolean }) => void
  type: string
  name: string
  contents: string
}) => {
  const { openModal, closeModal, isOpen } = useModal()

  const onChange = () => {
    openModal()
  }

  return (
    <Box>
      <FormControlLabel
        sx={{ marginLeft: '0', display: 'box' }}
        control={
          <CuToggle
            checked={checked}
            onChange={onChange}
            inputProps={{ 'aria-label': `${type} 설정 토글` }}
          />
        }
        label={
          <Typography
            variant="CaptionEmphasis"
            color={'text.strong'}
            marginRight={'1rem'}
          >
            {type}
          </Typography>
        }
        labelPlacement="start"
        name={name}
      />
      <CuTextModal
        title="알림 설정"
        open={isOpen}
        onClose={closeModal}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
        containedButton={{
          text: checked ? '끄기' : '켜기',
          onClick: () => {
            handleChange({ name, checked: !checked })
            closeModal()
          },
        }}
        content={contents}
      />
    </Box>
  )
}

interface INotif {
  keyword: boolean
  team: boolean
  message: boolean
  nightAlarm: boolean
}

const NotifSetting = () => {
  const [notif, setNotif] = useState<INotif>({
    keyword: true,
    team: true,
    message: true,
    nightAlarm: true,
  })

  const axiosWithAuth = useAxiosWithAuth()

  useEffect(() => {
    const fetchNotif = async () => {
      await axiosWithAuth.get('/api/v1/noti/get-my-alarm').then((res) => {
        setNotif(res.data)
      })
    }
    fetchNotif()
  }, [])

  const { isPc } = useMedia()

  const handleChange = ({
    name,
    checked,
  }: {
    name: string
    checked: boolean
  }) => {
    // axiosWithAuth
    //   .get(
    //     `/api/v1/noti/alarm-setting?alarmType=${name}&value=${checked}`,
    //   )
    //   .then(() => {
    //     setNotif({ ...notif, [name]: checked })
    //   })
    setNotif((prev) => ({ ...prev, [name]: checked }))
  }

  const contentsOnAgree = {
    keyword:
      '이 알림을 켜면, 키워드 알림 설정에서 추가한 키워드에 따라 관심가지는 분야의 스터디, 프로젝트에 대한 정보를 전달해드려요. 알림을 켤까요?',
    team: '이 알림을 켜면, 참여하고 있는 팀에 새로운 일이 일어나면 알려드려요. 알림을 켤까요?',
    message: '이 알림을 켜면, 새로운 쪽지가 왔을 때 알려드려요. 알림을 켤까요?',
    nightAlarm:
      '이 알림을 켜면, 야간에도 알림을 받을 수 있어요. 알림을 켤까요?',
  }

  const contentsOnDisagree = {
    keyword:
      '이 알림을 끄면, 키워드 알림 설정에서 추가한 키워드에 따라 관심가지는 분야의 스터디, 프로젝트에 대한 정보를 받을 수 없어요. 알림을 끌까요?',
    team: '이 알림을 끄면, 참여하고 있는 팀에 새로운 일이 일어나도 알림이 뜨지 않아요. 알림을 끌까요?',
    message:
      '이 알림을 끄면, 새로운 쪽지가 와도 알림을 받을 수 없어요. 알림을 끌까요?',
    nightAlarm:
      '이 알림을 끄면, 야간에는 알림을 받을 수 없어요. 알림을 끌까요?',
  }

  return (
    <TitleBox
      title="알림 설정"
      titleComponent={
        <Stack direction="row" alignItems={'center'} height={'2.5rem'}>
          <Stack
            direction="row"
            spacing={1}
            alignItems={'baseline'}
            height={'fit-content'}
          >
            <Typography
              variant={isPc ? 'Title3Emphasis' : 'Body1Emphasis'}
              component={'h3'}
            >
              알림 설정
            </Typography>
            <BetaBadge sx={{ height: '0.75rem' }} />
            <Typography variant="Caption" color={'text.assistive'}>
              아직 개발 중인 기능입니다.
            </Typography>
          </Stack>
        </Stack>
      }
    >
      <Stack spacing={2}>
        <Notif
          type="키워드 알림"
          checked={notif.keyword}
          handleChange={handleChange}
          name="keyword"
          contents={
            !notif.keyword
              ? contentsOnAgree.keyword
              : contentsOnDisagree.keyword
          }
        />
        <Notif
          type="프로젝트/스터디 알림"
          handleChange={handleChange}
          checked={notif.team}
          name="team"
          contents={
            !notif.team ? contentsOnAgree.team : contentsOnDisagree.team
          }
        />
        <Notif
          type="쪽지 알림"
          checked={notif.message}
          handleChange={handleChange}
          name="message"
          contents={
            !notif.message
              ? contentsOnAgree.message
              : contentsOnDisagree.message
          }
        />
        <Notif
          type="야간 알림(20시~9시)"
          checked={notif.nightAlarm}
          handleChange={handleChange}
          name="nightAlarm"
          contents={
            !notif.nightAlarm
              ? contentsOnAgree.nightAlarm
              : contentsOnDisagree.nightAlarm
          }
        />
      </Stack>
    </TitleBox>
  )
}

export default NotifSetting
