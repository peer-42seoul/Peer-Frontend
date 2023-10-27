// import useSWR from 'swr'
import { Stack, Box, Typography, Chip } from '@mui/material'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
// import { defaultGetFetcher } from '@/api/fetchers'
import {
  ITeamInfo,
  //   TOperationForm,
  //   TTeamType,
  TTeamStatus,
} from '@/types/ITeamInfo'

interface ITeamInfoContainerProps {
  id: number
}

const defaultLogoPath = '/images/profile.jpeg' // TODO : 기본 로고 path 확인하기

interface IStatusIconProps {
  status: TTeamStatus
}

const StatusIcon = ({ status }: IStatusIconProps) => {
  switch (status) {
    case 'RECRUITING':
      return <div>모집중</div>
    default:
      return <div>아아아</div>
  }
}

type TIconType = 'MEMBER' | 'LEADER' | 'DATE'

interface IIconInfoProps {
  type: TIconType
  text: string
  // clickHandler가 필요하면 추가
}

const IconInfo = ({ type, text }: IIconInfoProps) => {
  switch (type) {
    case 'MEMBER':
      return (
        <Box>
          <GroupsOutlinedIcon />
          <Typography>{text}</Typography>
        </Box>
      )
    case 'LEADER':
      return (
        <Box>
          <PermContactCalendarOutlinedIcon />
          <Typography>{text}</Typography>
        </Box>
      )
    case 'DATE':
      return (
        <Box>
          <CalendarMonthOutlinedIcon />
          <Typography>{text}</Typography>
        </Box>
      )
    // default:
    //   return <div>아아아</div>
  }
}

interface IRegionInfoProps {
  region: string
}

const RegionInfo = ({ region }: IRegionInfoProps) => {
  // TODO : 디자인 확정되지 않음
  return <Chip label={region} />
}

const TeamInfoContainer = ({ id }: ITeamInfoContainerProps) => {
  // TODO : id를 이용해서 데이터 받아오기
  //   const { data, error, isLoading } = useSWR<ITeamInfo>(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/main/${id}`,
  //     defaultGetFetcher,
  //   )
  const {
    data,
    error,
    isLoading,
  }: { data: ITeamInfo; error: any; isLoading: boolean } = {
    data: {
      id: id,
      name: '프로젝트 스페이스도그 🐶🚀',
      teamPicturePath: null,
      status: 'RECRUITING',
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
    <Stack>
      <Typography>{data.name}</Typography>
      <Box
        component="img"
        src={data.teamPicturePath ? data.teamPicturePath : defaultLogoPath}
      />
      <StatusIcon status={data.status} />
      <IconInfo type="MEMBER" text={data.memberCount} />
      <IconInfo type="LEADER" text={data.leaderName} />
      <Typography>{data.type}</Typography>
      <IconInfo type="DATE" text={data.dueTo.toString()} />
      <Typography>{data.operationForm}</Typography>
      <Stack direction={'row'}>
        {data.region.map((region, idx) => (
          <RegionInfo key={idx} region={region} />
        ))}
      </Stack>
    </Stack>
  )

  // 모달 컴포넌트도 추가할 것.
}

export default TeamInfoContainer
