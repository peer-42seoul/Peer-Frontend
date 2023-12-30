import {
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
} from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import BasicSelectMember from './BasicSelectMember'
import { IRoleWrite } from '@/types/IPostDetail'

const SetTeamRole = ({
  roleData,
  setRoleData,
  disabled,
}: {
  roleData: IRoleWrite[]
  setRoleData: Dispatch<SetStateAction<IRoleWrite[]>>
  disabled?: boolean
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
            sx={{ width: '26rem' }}
            variant="outlined"
            value={role}
            onChange={onHandlerEditRole}
            placeholder="모집하는 역할을 입력해주세요, ex) 프론트엔드 개발자, 디자이너"
            disabled={disabled ? disabled : false}
          />
          <BasicSelectMember
            member={member}
            setMember={setMember}
            disabled={disabled}
          />
          <Button
            sx={{ padding: '0.25rem' }}
            onClick={onHandlerAddRole}
            disabled={disabled ? disabled : false}
          >
            추가
          </Button>
        </Stack>
      </Box>
      <FormControl>
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
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
                gap={2}
              >
                <TextField
                  sx={{ width: '26rem' }}
                  value={data.name}
                  disabled={true}
                ></TextField>
                <TextField
                  sx={{ width: '3rem' }}
                  value={data.number}
                  disabled={true}
                ></TextField>
                <Button onClick={onHandlerRemove(index)}>제거</Button>
              </Stack>
            </Box>
          )
        })}
      </FormControl>
    </Box>
  )
}

export default SetTeamRole
