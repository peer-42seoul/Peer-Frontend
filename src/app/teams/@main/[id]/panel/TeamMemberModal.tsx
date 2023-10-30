import { Stack, Typography } from '@mui/material'
import CuModal from '@/components/CuModal'
import { ITeamMember } from '@/types/ITeamInfo'

interface ITeamMemberModalProps {
  teamId: number
  open: boolean
  handleClose: () => void
}
const TeamMemberModal = ({
  teamId,
  open,
  handleClose,
}: ITeamMemberModalProps) => {
  // TODO : 팀원 목록 받아오기
  // const { data, error, isLoading } = useSWR<Array<ITeamMember>>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/main/member/${teamId}`,
  //   defaultGetFetcher,
  // )
  void teamId // no unused var error 방지

  // Mock Data
  const {
    data,
    error,
    isLoading,
  }: { data: ITeamMember[]; error: any; isLoading: boolean } = {
    data: [
      {
        id: 1,
        name: 'qwer',
        role: 'LEADER',
      },
      {
        id: 2,
        name: 'asdf',
        role: 'MEMBER',
      },
    ],
    error: false,
    isLoading: false,
  }

  if (isLoading) {
    return <Typography>로딩중...</Typography>
  }

  if (error || !data) {
    // TODO : 에러 종류에 따라 에러 메시지 다르게 표시
    return <Typography>에러!!!</Typography>
  }

  return (
    <CuModal
      open={open}
      handleClose={handleClose}
      ariaTitle={'팀원 목록'}
      ariaDescription={'팀원 목록을 확인할 수 있습니다.'}
    >
      <Stack spacing={1}>
        {data.map((member) => (
          <Stack key={member.id}>
            <Typography>name: {member.name}</Typography>
            <Typography>role: {member.role.toLowerCase()}</Typography>
          </Stack>
        ))}
      </Stack>
    </CuModal>
  )
}

export default TeamMemberModal
