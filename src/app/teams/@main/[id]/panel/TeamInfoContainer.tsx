// import useSWR from 'swr'
import { Avatar, Stack, Typography, Chip } from '@mui/material'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
// import { defaultGetFetcher } from '@/api/fetchers'
import {
  ITeamInfo,
  TOperationForm,
  TTeamType,
  TTeamStatus,
} from '@/types/ITeamInfo'
import CuModal from '@/components/CuModal'
import useModal from '@/hook/useModal'

interface ITeamInfoContainerProps {
  id: number
}

const defaultLogoPath = '/images/profile.jpeg' // TODO : 기본 로고 path 확인하기

interface IStatusIconProps {
  status: TTeamStatus
}

const StatusIcon = ({ status }: IStatusIconProps) => {
  // TODO : 디자인 확정되지 않음
  switch (status) {
    case 'RECRUITING':
      return <Chip label={'모집 중'} sx={{ backgroundColor: '#FFFBDB' }} />
    case 'BEFORE':
      return <Chip label={'시작 전'} sx={{ backgroundColor: '#B5B5B5' }} />
    case 'ONGOING':
      return <Chip label={'진행 중'} sx={{ backgroundColor: '#EADFFF' }} />
    case 'COMPLETE':
      return <Chip label={'진행 완료'} sx={{ backgroundColor: '#F7C5C5' }} />
  }
}

type TIconType = 'MEMBER' | 'LEADER' | 'DATE'

interface IIconInfoProps {
  type: TIconType
  text: string
  onClick?: () => void
}

const IconInfo = ({ type, text, onClick }: IIconInfoProps) => {
  switch (type) {
    case 'MEMBER':
      return (
        <Stack direction={'row'} onClick={onClick} sx={{ cursor: 'pointer' }}>
          <GroupsOutlinedIcon />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'LEADER':
      return (
        <Stack direction={'row'}>
          <PermContactCalendarOutlinedIcon />
          <Typography>{text}</Typography>
        </Stack>
      )
    case 'DATE':
      return (
        <Stack direction={'row'}>
          <CalendarMonthOutlinedIcon />
          <Typography>{text}</Typography>
        </Stack>
      )
  }
}

interface IRegionInfoProps {
  region: string
}

const RegionInfo = ({ region }: IRegionInfoProps) => {
  // TODO : 디자인 확정되지 않음
  return <Chip label={region} />
}

interface IOperationFormInfoProps {
  operationForm: TOperationForm
}

const OperationFormInfo = ({ operationForm }: IOperationFormInfoProps) => {
  // TODO : 디자인 확정되지 않음
  switch (operationForm) {
    case 'ONLINE':
      return <Chip label={'온라인'} />
    case 'OFFLINE':
      return <Chip label={'오프라인'} />
    case 'MIX':
      return <Chip label={'온/오프라인'} />
  }
}

interface ITypeInfoProps {
  type: TTeamType
}

const TypeInfo = ({ type }: ITypeInfoProps) => {
  // TODO : 디자인 확정되지 않음
  switch (type) {
    case 'PROJECT':
      return <Chip label={'project'} />
    case 'STUDY':
      return <Chip label={'study'} />
  }
}

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
  void teamId
  return (
    <CuModal
      open={open}
      handleClose={handleClose}
      ariaTitle={'팀원 목록'}
      ariaDescription={'팀원 목록을 확인할 수 있습니다.'}
    >
      헤이헤이헤이
    </CuModal>
  )
}

const TeamInfoContainer = ({ id }: ITeamInfoContainerProps) => {
  const { isOpen, closeModal, openModal } = useModal()
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

  // 모달 컴포넌트도 추가할 것.
}

export default TeamInfoContainer
