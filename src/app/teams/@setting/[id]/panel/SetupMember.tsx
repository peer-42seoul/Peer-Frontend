import {
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { IMember, TeamGrant } from '../../../types/types'
import useModal from '@/hook/useModal'
import { useState } from 'react'
import useMedia from '@/hook/useMedia'
import useAxiosWithAuth from '@/api/config'
import OthersProfile from '@/app/panel/OthersProfile'

const SetupMember = ({ team, teamId }: { team: IMember[]; teamId: string }) => {
  const { isPc } = useMedia()
  const { isOpen, closeModal, openModal } = useModal()
  const [members, setMembers] = useState<IMember[]>(team)
  const [member, setMember] = useState<IMember | null>(null)
  const axiosWithAuth = useAxiosWithAuth()

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
            </Box>
          </Grid>
        ))}
      </Grid>

      <Modal open={isOpen}>
        <Box sx={{ backgroundColor: 'white' }}>
          정말 팀원을 내보내시겠습니까?
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={handleDelete}>확인</Button>
        </Box>
      </Modal>
    </>
  )
}

export default SetupMember
