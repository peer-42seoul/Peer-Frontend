import useAxiosWithAuth from '@/api/config'
import { TeamStatus } from '@/app/teams/types/types'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

interface ITeamDisperseButton {
  teamStatus: TeamStatus
  teamId: string
}

const TeamDisperseButton = ({ teamId, teamStatus }: ITeamDisperseButton) => {
  const router = useRouter()
  const { openToast } = useToast()
  const { isOpen, openModal, closeModal } = useModal()
  const axiosWithAuth = useAxiosWithAuth()

  const disperseTeam = () => {
    axiosWithAuth
      .post(`${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/setting/disperse`, {
        teamId: teamId,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push('/team-list')
          openToast({
            severity: 'success',
            message: '팀이 해산되었습니다.',
          })
          router.push('/team-list')
        } else if (res.status === 401) {
          router.push('/login')
          openToast({
            severity: 'error',
            message: '잘못된 접근입니다.',
          })
        } else if (res.status === 403) {
          router.push('/login')
          openToast({
            severity: 'error',
            message: '권한이 없습니다.',
          })
        } else if (res.status === 404) {
          openToast({
            severity: 'error',
            message: '팀이 존재하지 않습니다.',
          })
        } else if (res.status === 409) {
          openToast({
            severity: 'error',
            message: '모집을 완료 후 팀을 해산하셔야 합니다.',
          })
        } else {
          openToast({
            severity: 'error',
            message: '팀 해산에 실패하였습니다.',
          })
        }
      })
      .catch(() => {
        openToast({
          severity: 'error',
          message: '팀 해산에 실패하였습니다.',
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
        <Typography variant="Body2">팀을 해산시겠습니까?</Typography>
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
          <Typography variant="Body2" color="#ffffff">해산하기</Typography>
        </Button>
      </Stack>

      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 해산'}
        content={'팀을 해산하시겠습니까?'}
        containedButton={{
          text: '해산하기',
          onClick: disperseTeam,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />
    </>
  )
}

export default TeamDisperseButton
