// import useSWR from 'swr'
import { Avatar, Stack, Typography } from '@mui/material'
// import { defaultGetFetcher } from '@/api/fetchers'
import { ITeamInfo } from '@/types/ITeamInfo'
import useModal from '@/hook/useModal'
import {
  StatusIcon,
  IconInfo,
  RegionInfo,
  OperationFormInfo,
  TypeInfo,
} from './TeamInfoComponent'
import TeamMemberModal from './TeamMemberModal'

const defaultLogoPath = '/images/profile.jpeg' // TODO : 기본 로고 path 확인하기

const TeamInfoContainer = ({ id }: { id: number }) => {
  const { isOpen, closeModal, openModal } = useModal()
  // TODO : id를 이용해서 데이터 받아오기
  //   const { data, error, isLoading } = useSWR<ITeamInfo>(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/main/${id}`,
  //     defaultGetFetcher,
  //   )

  // Mock Data
  const {
    data,
    error,
    isLoading,
  }: { data: ITeamInfo; error: any; isLoading: boolean } = {
    data: {
      id: id,
      name: '프로젝트 스페이스도그 🐶🚀',
      teamPicturePath: null,
      status: 'BEFORE',
      memberCount: '1/3',
      leaderName: '야채',
      type: 'STUDY',
      dueTo: 12,
      operationForm: 'ONLINE',
      region: ['서울', '인천'],
    },
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
    <>
      <Stack direction={'row'} spacing={1}>
        <Avatar
          alt="team logo"
          variant="rounded"
          sx={{ width: 89, height: 92, border: 1, borderRadius: 1.2 }}
          src={data.teamPicturePath ? data.teamPicturePath : defaultLogoPath}
        />
        <Stack>
          <Stack direction={'row'}>
            <Typography variant="h5">{data.name}</Typography>
            <StatusIcon status={data.status} />
          </Stack>
          <Stack direction={'row'}>
            <IconInfo
              type="MEMBER"
              text={data.memberCount}
              onClick={() => openModal()}
            />
            <IconInfo type="LEADER" text={data.leaderName} />
            <IconInfo type="DATE" text={data.dueTo.toString()} />
          </Stack>
          <Stack direction={'row'}>
            <TypeInfo type={data.type} />
            <OperationFormInfo operationForm={data.operationForm} />
          </Stack>
          <Stack direction={'row'}>
            {data.region.map((region, idx) => (
              <RegionInfo key={idx} region={region} />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <TeamMemberModal
        teamId={data.id}
        open={isOpen}
        handleClose={closeModal}
      />
    </>
  )
}

export default TeamInfoContainer
