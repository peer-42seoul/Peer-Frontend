import {
  Avatar,
  Box,
  Button,
  Card,
  // FormControl,
  Grid,
  Modal,
  // NativeSelect,
  Stack,
  Switch,
  Theme,
  Typography,
} from '@mui/material'
import { IMember, Job, TeamGrant } from '../../../types/types'
import useModal from '@/hook/useModal'
import { useEffect, useState } from 'react'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'
import OthersProfile from '@/app/panel/OthersProfile'
import { comfirmModalStyle } from './styles'
import { IMyInfo } from '../page'
import CloseButton from '@/components/CloseButton'

interface ISetupMember {
  team: IMember[]
  teamId: string
  jobs: Job[]
  myInfo?: IMyInfo
}

// interface ICurrentJobCard {
//   job: Job
//   deleteJob: () => void
// }

// const CurrentJobCard = ({ job, deleteJob }: ICurrentJobCard) => {
//   return (
//     <Card
//       sx={{
//         p: '0.25rem',
//         width: 'fit-content',
//         backgroundColor: 'background.tertiary',
//         borderRadius: '1rem',
//       }}
//     >
//       <Stack alignItems={'center'} direction={'row'}>
//         <Typography>{job.name}</Typography>
//         <Button onClick={deleteJob}>X</Button>
//       </Stack>
//     </Card>
//   )
// }

const SettingTeamMember = ({ team, teamId, jobs, myInfo }: ISetupMember) => {
  const { isPc } = useMedia()
  const { isOpen, closeModal, openModal } = useModal()
  // const {
  //   isOpen: isChangeOpen,
  //   closeModal: closeChangeModal,
  //   openModal: openChangeModal,
  // } = useModal()
  const [members, setMembers] = useState<IMember[]>(team)
  const [member, setMember] = useState<IMember>()
  const [job, setJob] = useState<Job[]>(jobs)
  // const [selectedJobs, setSelectedJobs] = useState<Job[]>([])
  const axiosWithAuth = useAxiosWithAuth()

  // const changeJob = () => {
  //   axiosWithAuth.put(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/change`,
  //     job,
  //   )
  // }

  useEffect(() => {
    setJob(jobs)
    console.log(job)
    console.log(myInfo)
    console.log(member?.id)
    // if (selectedJobs.length > 0) {
    //   changeJob()
    // }
  }, [setJob, jobs, myInfo])

  const handleGrant = (member: IMember) => {
    console.log('리더 권한 변경')
    if (member.role === TeamGrant.LEADER) {
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

  // const handleChangeModal = (selectedMember: IMember) => {
  //   setMember(selectedMember)
  //   const selectedJobs = job.filter((jobItem) =>
  //     selectedMember.job.includes(jobItem.name),
  //   )
  //   setSelectedJobs(selectedJobs)
  //   openChangeModal()
  // }

  // const handleChangeJob = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   const selectedJobId = e.target.value as string

  //   const selectJob = job.find((job) => job.name === selectedJobId)

  //   if (selectedJobs.includes(selectJob as Job)) {
  //     // TODO: 토스트 알림으로 변경
  //     console.log('이미 선택한 역할입니다.')
  //     return
  //   }

  //   if (selectJob) {
  //     setSelectedJobs([...selectedJobs, selectJob])
  //   } else {
  //     // TODO: 토스트 알림으로 변경
  //     console.log('선택한 역할을 찾을 수 없습니다.')
  //   }
  // }

  // const handleDeleteButton = (job: Job) => {
  //   if (selectedJobs.length === 1) {
  //     //TODO: 토스트 알림으로 변경
  //     console.log('최소 한 개의 역할이 필요합니다.')
  //     return
  //   }
  //   setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job))
  // }

  return (
    <>
      <Stack height={'16rem'} overflow={'auto'}>
        <Grid container spacing={'1rem'} height={'16rem'}>
          {members.map((member, index) => (
            <Grid
              component="div"
              key={index}
              item
              xs={isPc ? 3 : 6}
              textAlign="center"
            >
              <Box
                component="div"
                p={'1rem'}
                sx={{
                  position: 'relative',
                  backgroundColor: (theme: Theme) =>
                    theme.palette.background.tertiary,
                }}
                borderRadius={'0.5rem'}
              >
                {/** TODO: 내가 누구인지를 알게 서버에서 받아야 함**/}
                {myInfo && member.id.toString() !== myInfo.userId && (
                  <CloseButton
                    action={() => handleOpenDelete(member)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: 0,
                      minWidth: 0.2,
                    }}
                  />
                )}
                <OthersProfile name={member.name} userId={member.id}>
                  <Avatar sx={{ margin: 'auto' }}>A</Avatar>
                </OthersProfile>
                <Typography fontWeight="bold">{member.name}</Typography>
                <Stack direction="row" sx={{ justifyContent: 'center' }}>
                  <Typography variant="Body2">리더 권한</Typography>
                  <Switch
                    size="small"
                    onChange={() => handleGrant(member)}
                    checked={member.role === TeamGrant.LEADER ? true : false}
                  />
                </Stack>
                {/* 역할이 있을 때만 버튼이 보이게끔 */}
                {/* {member.job && (
                  <Button
                    variant="contained"
                    onClick={() => handleChangeModal(member)}
                  >
                    <Typography fontSize="small">역할 변경</Typography>
                  </Button>
                )} */}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>

      {/* <Modal open={isChangeOpen} onClose={closeChangeModal}>
        <Box sx={comfirmModalStyle}>
          <Stack>
            <Typography fontWeight={'bold'} fontSize={'large'}>
              역할 변경
            </Typography>
          </Stack>
          <Stack padding={'1rem'}>
            <Typography>팀원이 변경할 역할을 선택해주세요.</Typography>
            <Stack my={'1rem'}>
              <Typography>현재 역할</Typography>

              <Stack direction={'row'} spacing={'0.25rem'} minWidth={'10rem'}>
                {selectedJobs.map((job) => (
                  <CurrentJobCard
                    key={job.name}
                    job={job}
                    deleteJob={() => handleDeleteButton(job)}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack alignItems={'center'} padding={1}>
              <Card sx={{ width: 'fit-content' }}>
                <FormControl>
                  <NativeSelect
                    value={selectedJobs[0]?.name}
                    onChange={handleChangeJob}
                    inputProps={{ 'aria-label': 'role' }}
                  >
                    {job.map((job, index) => (
                      <option key={index} value={job.name}>
                        {job.name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Card>

              <Stack direction={'row'}>
                <Button onClick={closeChangeModal}>취소</Button>
                <Button onClick={closeChangeModal}>확인</Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal> */}

      <Modal open={isOpen} onClose={closeModal}>
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

export default SettingTeamMember
