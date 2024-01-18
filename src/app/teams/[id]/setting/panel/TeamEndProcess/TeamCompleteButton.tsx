import useAxiosWithAuth from '@/api/config'
import { TeamStatus } from '@/app/teams/types/types'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import { Button, Stack, Typography } from '@mui/material'

interface ITeamCompleteButton {
  teamStatus: TeamStatus
  teamId: string
}

const TeamCompleteButton = ({ teamId, teamStatus }: ITeamCompleteButton) => {
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const finishTeam = () => {
    console.log('exit team')
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/finish`, {
        teamId: teamId,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
        } else if (res.status === 401) {
          console.log(res)
        } else if (res.status === 403) {
          console.log(res)
        } else if (res.status === 404) {
          console.log(res)
        } else if (res.status === 409) {
          console.log(res)
        } else {
          console.log(res)
        }
      })
      .catch((err) => {
        console.log(err)
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
