import { Box, Button, Stack, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import BasicSelectMember from './BasicSelectMember'
import { IRoleData } from '@/types/IPostDetail'

const SetTeamRole = ({
  roleData,
  setRoleData,
}: {
  roleData: IRoleData[]
  setRoleData: Dispatch<SetStateAction<IRoleData[]>>
}) => {
  const [role, setRole] = useState<string>('')
  const [member, setMember] = useState('')

  const onHandlerEditRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as string)
  }

  const onHandlerAddRole = () => {
    if (role === '' || member === '') return
    setRoleData([...roleData, { role: role, member: parseInt(member) }])
    setRole('')
    setMember('')
  }

  const onHandlerRemove = (index: number) => () => {
    setRoleData(roleData.filter((_, i) => i !== index))
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
          gap={2}
        >
          <TextField
            sx={{ width: '416px' }}
            variant="outlined"
            value={role}
            onChange={onHandlerEditRole}
            placeholder='역할을 입력해주세요'
          />
          <BasicSelectMember member={member} setMember={setMember} />
        </Stack>
        <Button onClick={onHandlerAddRole}>추가</Button>
      </Box>
      {roleData.map((data, index) => {
        if (data.role === '' || data.member === 0) {
          console.log('error')
          return
        }
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TextField value={data.role} disabled={true}></TextField>
              <TextField value={data.member} disabled={true}></TextField>
              <Button onClick={onHandlerRemove(index)}>제거</Button>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default SetTeamRole
