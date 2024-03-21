'use client'

import { Button, Card, Popover, Stack, Typography } from '@mui/material'
import { ITeamMemberInfo } from './TeamInfoContainer'
import CuCircularProgress from '@/components/CuCircularProgress'
import { AccountBox } from '@/icons'
import { MouseEvent, useState } from 'react'
import useNicknameStore from '@/states/useNicknameStore'
import { useRouter } from 'next/navigation'
import ReportModal from '@/components/ReportModal'
import ExternalMessageModal from '@/app/panel/ExternalMessageModal'
import CuModal from '@/components/CuModal'

// 팀원 리스트를 보여주는 컴포넌트의 props interface
interface ITeamMemberListProps {
  members: Array<ITeamMemberInfo>
}

// 공통으로 사용되는 컴포넌트
// 1. 프로필 보기 버튼, 쪽지 보내기 버튼, 신고하기 버튼을 보여주는 컴포넌트
const MemberButtonGroup = ({
  userId,
  name,
}: {
  userId: string
  name: string
}) => {
  const router = useRouter()
  const myNickname = useNicknameStore.getState().nickname

  // 쪽지와 신고를 보내기 위한 모달
  const [modalType, setModalType] = useState<string>('' as string)
  const messageOpen = () => {
    setModalType('message')
  }
  const reportOpen = () => {
    setModalType('report')
  }
  const handleModalClose = () => {
    setModalType('')
  }

  // 남의 프로필 보기
  const goOthersProfile = () => {
    router.push(`/profile/${userId}`)
  }
  // 자기 자신의 프로필 보기
  const goMypage = () => {
    router.push('/my-page')
  }

  // 유령 회원 처리
  if (Number(userId) === -1) return <></>

  return (
    <>
      {myNickname !== name ? (
        <>
          <Button onClick={goOthersProfile}>프로필 보기</Button>
          <Button onClick={messageOpen}>쪽지 보내기</Button>
          <Button onClick={reportOpen}>신고하기</Button>
        </>
      ) : (
        <Button onClick={goMypage}>마이페이지</Button>
      )}
      <ReportModal
        isModalOpen={modalType === 'report'}
        handleClose={handleModalClose}
        targetId={userId}
      />
      <ExternalMessageModal
        targetId={Number(userId)}
        targetNickname={name}
        isOpen={modalType === 'message'}
        handleClose={handleModalClose}
      />
    </>
  )
}

// 2. 팀원의 이름과 역할, 프로필 보기 버튼을 보여주는 컴포넌트
const MemberInfo = ({ member }: { member: ITeamMemberInfo }) => {
  return (
    <Stack key={member.id} direction={'row'}>
      <Stack
        display={'flex'}
        justifyContent={'space-between'}
        direction={'row'}
        width={'100%'}
      >
        <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
          <Typography
            sx={{
              width: '5rem',
              WebkitLineClamp: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            variant="Caption"
          >
            {member.name}
          </Typography>
          {member.role === 'LEADER' && (
            <AccountBox
              spacing={'0.25rem'}
              sx={{
                width: '1rem',
                color: 'text.alternative',
              }}
            />
          )}
        </Stack>
        <Stack direction={'row'}>
          <MemberButtonGroup userId={member.id.toString()} name={member.name} />
        </Stack>
      </Stack>
    </Stack>
  )
}

// 모바일에선 버튼을 클릭하여 모달을 통해 멤버 리스트를 보여준다.
const TeamMemberListMobile = ({ members }: ITeamMemberListProps) => {
  const [open, setOpen] = useState(false)

  // 모달 관련 함수
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button onClick={handleOpen}>
        <Typography variant="Caption">멤버 보기</Typography>
      </Button>
      <CuModal open={open} onClose={handleClose} title={'멤버 리스트'}>
        <Stack
          sx={{
            maxHeight: '10rem',
            overflowY: 'auto',
          }}
        >
          {!members ? (
            <CuCircularProgress color={'primary'} />
          ) : (
            members.map((member) => (
              <MemberInfo key={member.name} member={member} />
            ))
          )}
        </Stack>
      </CuModal>
    </>
  )
}

// PC에선 popover를 사용하여 멤버 리스트를 보여준다.
const TeamMemberListPc = ({ members }: ITeamMemberListProps) => {
  // 멤버 리스트를 보여주기 위한 popover 관련 객체
  // mui의 기본 예제 참고
  const [popOverAnchorEl, setPopOverAnchorEl] =
    useState<null | HTMLButtonElement>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setPopOverAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setPopOverAnchorEl(null)
  }

  const open = Boolean(popOverAnchorEl)

  return (
    <>
      <Button onClick={handlePopoverOpen}>
        <Typography variant="Caption">멤버 보기</Typography>
      </Button>
      <Popover
        open={open}
        onClose={handlePopoverClose}
        anchorEl={popOverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Card
          sx={{
            padding: '1rem',
          }}
        >
          <Stack alignItems={'center'}>
            <Typography variant="Body1Emphasis">멤버 리스트</Typography>
          </Stack>
          <Stack
            sx={{
              maxHeight: '10rem',
              overflowY: 'auto',
            }}
          >
            {!members ? (
              <CuCircularProgress color={'primary'} />
            ) : (
              members.map((member) => (
                <MemberInfo key={member.name} member={member} />
              ))
            )}
          </Stack>
        </Card>
      </Popover>
    </>
  )
}

export { TeamMemberListPc, TeamMemberListMobile }
