import useAxiosWithAuth from '@/api/config'
import { TeamStatus } from '@/app/teams/types/types'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface ITeamQuitButton {
  teamStatus: TeamStatus
  teamId: string
}

const TeamQuitButton = ({ teamId, teamStatus }: ITeamQuitButton) => {
  const router = useRouter()
  const { openToast } = useToast()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const quitTeam = () => {
    console.log('exit team')
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/quit`, {
        teamId: teamId,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          openToast({
            severity: 'success',
            message: '팀을 나갔습니다.',
          })
        } else if (res.status === 401) {
          console.log(res)
          router.push('/login')
          openToast({
            severity: 'error',
            message: '잘못된 접근입니다.',
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
            message:
              '혼자 남았을 경우 팀을 나갈 수 없습니다. 해산절차를 진행해주세요.',
          })
        } else {
          console.log(res)
          openToast({
            severity: 'error',
            message: '팀 나가기에 실패하였습니다.',
          })
        }
      })
      .catch((err) => {
        console.log(err)
        openToast({
          severity: 'error',
          message: '팀 나가기에 실패하였습니다.',
        })
      })
  }

  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography>팀을 나가겠습니까?</Typography>
        <Button
          disabled={teamStatus === TeamStatus.RECRUITING ? true : false}
          variant="contained"
          onClick={openModal}
        >
          <Typography>팀 나가기</Typography>
        </Button>
      </Stack>

      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 나가기'}
        content={'팀을 나가겠습니까?'}
        containedButton={{
          text: '나가기',
          onClick: quitTeam,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default TeamQuitButton
