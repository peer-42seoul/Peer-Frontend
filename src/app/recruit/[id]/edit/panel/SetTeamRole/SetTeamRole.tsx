import { Box, Button, Stack, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import BasicSelectMember from './BasicSelectMember'
import { IRoleWrite } from '@/types/IPostDetail'

const SetTeamRole = ({
  roleData,
  setRoleData,
}: {
  roleData: IRoleWrite[]
  setRoleData: Dispatch<SetStateAction<IRoleWrite[]>>
}) => {
  const [role, setRole] = useState<string>('')
  const [member, setMember] = useState('')

  const onHandlerEditRole = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as string)
  }

  const onHandlerAddRole = () => {
    if (role === '' || member === '') return
    setRoleData([...roleData, { name: role, number: parseInt(member) }])
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
            placeholder="역할을 입력해주세요"
          />
          <BasicSelectMember member={member} setMember={setMember} />
        </Stack>
        <Button onClick={onHandlerAddRole}>추가</Button>
      </Box>
      {roleData.map((data, index) => {
        if (data.name === '' || data.number === 0) {
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
              <TextField value={data.name} disabled={true}></TextField>
              <TextField value={data.number} disabled={true}></TextField>
              <Button onClick={onHandlerRemove(index)}>제거</Button>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default SetTeamRole
