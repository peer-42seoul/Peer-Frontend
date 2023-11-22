import { Box, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface CommunicationToolLinkProps {
  setValue: Dispatch<SetStateAction<string>>
}

const SetCommunicationToolLink = ({ setValue }: CommunicationToolLinkProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as string)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="link to communication tool"
        sx={{ width: '416px'}}
        onChange={handleChange}
      />
    </Box>
  )
}

export default SetCommunicationToolLink
