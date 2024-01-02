import { Box, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface CommunicationToolLinkProps {
  setValue: Dispatch<SetStateAction<string>>
  value?: string
}

const SetCommunicationToolLink = ({
  setValue,
  value,
}: CommunicationToolLinkProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder={'팀 커뮤니케이션 툴 링크를 입력해주세요.'}
        sx={{ width: '26rem' }}
        value={value}
        onChange={() => {handleChange}}
      />
    </Box>
  )
}

export default SetCommunicationToolLink
