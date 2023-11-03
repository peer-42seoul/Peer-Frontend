import { Box, Button, TextField, Typography } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import BasicSelectMember from './BasicSelectMember'
import { IRoleData } from '../../page'

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
    setRoleData([...roleData, { name: role, member: parseInt(member) }])
    setRole('')
    setMember('')
  }

  const onHandlerRemove = (index: number) => () => {
    setRoleData(roleData.filter((_, i) => i !== index))
  }

  return (
    <Box
      sx={{
        p: 2,
        border: '1px dashed grey',
        width: '70%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography>역할</Typography>
        <TextField
          variant="outlined"
          value={role}
          onChange={onHandlerEditRole}
        />
        <Typography>인원</Typography>
        <BasicSelectMember member={member} setMember={setMember} />
        <Button onClick={onHandlerAddRole}>역할 추가</Button>
      </Box>
      {roleData.map((data, index) => {
        if (data.name === '' || data.member === 0) {
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
