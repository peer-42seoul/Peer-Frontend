import useAxiosWithAuth from '@/api/config'
import { TeamStatus } from '@/app/teams/types/types'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface ITeamCompleteButton {
  teamStatus: TeamStatus
  teamId: string
}

const TeamCompleteButton = ({ teamId, teamStatus }: ITeamCompleteButton) => {
  const router = useRouter()
  const { openToast } = useToast()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const finishTeam = () => {
    console.log('exit team')
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/complete`, {
        teamId: teamId,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          openToast({
            severity: 'success',
            message: '팀 활동이 완료되었습니다.',
          })
        } else if (res.status === 401) {
          console.log(res)
          router.push('/login')
          openToast({
            severity: 'error',
            message: '로그인이 필요합니다.',
          })
        } else if (res.status === 403) {
          console.log(res)
          openToast({
            severity: 'error',
            message: '권한이 없습니다.',
          })
        } else if (res.status === 404) {
          console.log(res)
          openToast({
            severity: 'error',
            message: '팀이 존재하지 않습니다.',
          })
        } else if (res.status === 409) {
          console.log(res)
          openToast({
            severity: 'error',
            message: '모집을 완료 후 완료할 수 있습니다.',
          })
        } else {
          console.log(res)
          openToast({
            severity: 'error',
            message: '팀 활동 완료에 실패하였습니다.',
          })
        }
      })
      .catch((err) => {
        console.log(err)
        openToast({
          severity: 'error',
          message: '팀 활동 완료에 실패하였습니다.',
        })
      })
    closeModal()
  }

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography>팀 활동을 완료하겠습니까?</Typography>
        <Button
          disabled={
            teamStatus === TeamStatus.RECRUITING ||
            teamStatus === TeamStatus.COMPLETE
              ? true
              : false
          }
          variant="contained"
          onClick={openModal}
        >
          <Typography>완료하기</Typography>
        </Button>
      </Stack>

      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 활동 완료'}
        content={'팀 활동을 완료하겠습니까?'}
        containedButton={{
          text: '완료하기',
          onClick: finishTeam,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default TeamCompleteButton
