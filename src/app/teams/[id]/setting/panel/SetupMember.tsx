import {
  Avatar,
  Box,
  Button,
  // FormControl,
  Grid,
  Modal,
  // NativeSelect,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { IMember, Job, TeamGrant } from '../../../types/types'
import useModal from '@/hook/useModal'
import { useState } from 'react'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'
import OthersProfile from '@/app/panel/OthersProfile'

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
  // const [job, setJob] = useState<Job[]>(jobs)
  const axiosWithAuth = useAxiosWithAuth()

  // const changeJob = () => {
  //   axiosWithAuth.put(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/change`,
  //     job,
  //   )
  // }

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

  // const handleChangeJob = (e: React.ChangeEvent<{ value: unknown }>) => {
  //   if (jobs.length === 0) return console.log('역할이 없습니다.')
  //   setJob([...job, e.target.value as Job])
  // }

  return (
    <>
      <Grid container spacing={2} m={1}>
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
              <Button onClick={openChangeModal}>
                <Typography fontSize="small">역할 변경</Typography>
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={isChangeOpen} onClose={closeChangeModal}>
        <Box>
          <Typography>역할 변경</Typography>
          {/* <FormControl>
            <NativeSelect
              value={job}
              onChange={handleChangeJob}
              inputProps={{ 'aria-label': 'role' }}
            >
              {jobs.map((job, index) => (
                <option key={index} value={job.id}>
                  {job.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Stack direction={'row'} justifyContent={'space-evenly'}>
            {job.map((j, index) => (
              <Typography key={index}>{j.name}</Typography>
            ))}
          </Stack> */}

          <Button onClick={closeChangeModal}>취소</Button>
          <Button onClick={closeChangeModal}>확인</Button>
        </Box>
      </Modal>

      <Modal open={isOpen} onClose={closeChangeModal}>
        <Box>
          정말 팀원을 내보내시겠습니까?
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={handleDelete}>확인</Button>
        </Box>
      </Modal>
    </>
  )
}

export default SetupMember
