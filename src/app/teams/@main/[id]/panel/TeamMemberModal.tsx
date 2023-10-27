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
  //   `/api/v1/team/main/member/${teamId}`,
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

  // render 1 : 로딩중
  if (isLoading) {
    // 로딩 컴포넌트 구체화
    return <div>로딩중</div>
  }

  // render 2 : 에러
  if (error || !data) {
    // 에러 컴포넌트 구체화
    // 에러 알림?!
    return <div>에러!</div>
  }

  // render 3 : 정상
  return (
    // TODO: 디자인 확정되지 않음
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
