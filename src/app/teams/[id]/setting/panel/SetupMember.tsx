import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  // FormControl,
  Grid,
  Modal,
  NativeSelect,
  // NativeSelect,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { IMember, Job, TeamGrant } from '../../../types/types'
import useModal from '@/hook/useModal'
import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'
import OthersProfile from '@/app/panel/OthersProfile'
import { comfirmModalStyle } from './styles'

const mockJobsData: Job[] = [
  {
    id: 1,
    name: '프론트엔드',
    current: 3,
    max: 5,
  },
  {
    id: 2,
    name: '백엔드',
    current: 2,
    max: 5,
  },
  {
    id: 3,
    name: '디자인',
    current: 1,
    max: 5,
  },
  {
    id: 4,
    name: '기획',
    current: 1,
    max: 5,
  },
]

interface ISetupMember {
  team: IMember[]
  teamId: string
  jobs?: Job[]
}

const SetupMember = ({ team, teamId }: ISetupMember) => {
  const { isPc } = useMedia()
  const { isOpen, closeModal, openModal } = useModal()
  const {
    isOpen: isChangeOpen,
    closeModal: closeChangeModal,
    openModal: openChangeModal,
  } = useModal()
  const [members, setMembers] = useState<IMember[]>(team)
  const [member, setMember] = useState<IMember | null>(null)
  const [job, setJob] = useState<Job[]>(mockJobsData)
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([])
  const axiosWithAuth = useAxiosWithAuth()

  // const changeJob = () => {
  //   axiosWithAuth.put(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/change`,
  //     job,
  //   )
  // }

  useEffect(() => {
    setJob(mockJobsData)
    // if (selectedJobs.length > 0) {
    //   changeJob()
    // }
  }, [selectedJobs])

  const handleGrant = (member: IMember) => {
    console.log('리더 권한 변경')
    if (member.grant === TeamGrant.LEADER) {
      axiosWithAuth
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/grant/${teamId}?userId=${member.id}&role=member`,
        )
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setMembers(
              members.map((m) =>
                m.id === member.id ? { ...m, grant: TeamGrant.MEMBER } : m,
              ),
            )
          } else console.log(res.status)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axiosWithAuth
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/grant/${teamId}?userId=${member.id}&role=leader`,
        )
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            setMembers(
              members.map((m) =>
                m.id === member.id ? { ...m, grant: TeamGrant.LEADER } : m,
              ),
            )
          } else console.log(res.status)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleOpenDelete = (member: IMember) => {
    console.log('팀원 삭제 모달 오픈')
    setMember(member)
    openModal()
  }

  const handleDelete = () => {
    console.log('팀원 삭제')
    if (!member) return console.log('팀원이 없습니다.')
    axiosWithAuth
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/delete/${teamId}?userId=${member.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('삭제 완료')
          team = res.data
        } else console.log(res.status)

        closeModal()
      })
      .catch((err) => {
        console.log(err)

        closeModal()
      })
  }

  const handleChangeModal = (selectedMember: IMember) => {
    console.log('팀원 역할 변경 모달 오픈', selectedMember)
    setMember(selectedMember)
    openChangeModal()
  }

  const handleChangeJob = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedJobId = e.target.value as number

    // mockJobsData에서 선택한 직무 ID에 해당하는 직무 객체를 찾습니다.
    const selectedJob = job.find((job) => job.id === selectedJobId)

    if (selectedJob) {
      // 찾은 직무 객체로 상태를 업데이트합니다.
      setSelectedJobs([...selectedJobs, selectedJob])
    } else {
      console.log('선택한 역할을 찾을 수 없습니다.')
    }
  }

  return (
    <>
      <Grid container spacing={'1rem'} m={'0.5rem'} overflow={'hidden'}>
        {members.map((member, index) => (
          <Grid
            component="div"
            key={index}
            item
            xs={isPc ? 2 : 6}
            textAlign="center"
          >
            <Box component="div" p={1} sx={{ position: 'relative' }}>
              <Button
                size="small"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 0,
                  minWidth: 0.2,
                }}
                onClick={() => handleOpenDelete(member)}
              >
                X
              </Button>
              <OthersProfile name={member.name} userId={member.id}>
                <Avatar sx={{ margin: 'auto' }}>A</Avatar>
              </OthersProfile>
              <Typography fontWeight="bold">{member.name}</Typography>
              <Stack direction="row" sx={{ justifyContent: 'center' }}>
                <Typography fontSize="small">리더 권한</Typography>
                <Switch
                  size="small"
                  onChange={() => handleGrant(member)}
                  checked={member.grant === TeamGrant.LEADER ? true : false}
                />
              </Stack>
              {/* 역할이 있을 때만 버튼이 보이게끔 */}
              <Button onClick={() => handleChangeModal(member)}>
                <Typography fontSize="small">역할 변경</Typography>
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={isChangeOpen} onClose={handleChangeModal}>
        <Box sx={comfirmModalStyle}>
          <Stack>
            <Typography>역할 변경</Typography>
          </Stack>
          <Stack padding={'1rem'}>
            <Typography>팀원이 변경할 역할을 선택해주세요.</Typography>
            <Stack direction={'row'} padding={1}>
              <Typography>현재 역할</Typography>
              {/* {member?.job.map((job, index) => (
                <Typography key={index}>{job.name}</Typography>
              ))} */}
            </Stack>
            <Stack alignItems={'center'} padding={1}>
              <Card sx={{ width: 'fit-content' }}>
                <FormControl>
                  <NativeSelect
                    value={member?.job}
                    onChange={handleChangeJob}
                    inputProps={{ 'aria-label': 'role' }}
                  >
                    {job.map((job, index) => (
                      <option key={index} value={job.id}>
                        {job.name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  {selectedJobs.map((job, index) => (
                    <Typography key={index}>{job.name}</Typography>
                  ))}
                </Stack>
              </Card>

              <Stack direction={'row'}>
                <Button onClick={closeChangeModal}>취소</Button>
                <Button onClick={closeChangeModal}>확인</Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Modal open={isOpen} onClose={closeChangeModal}>
        <Box sx={comfirmModalStyle}>
          <Card>
            <Typography>정말 팀원을 내보내시겠습니까?</Typography>
            <Button onClick={closeModal}>취소</Button>
            <Button onClick={handleDelete}>확인</Button>
          </Card>
        </Box>
      </Modal>
    </>
  )
}

export default SetupMember
