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
        placeholder="link to communication tool"
        sx={{ width: '416px' }}
        value={value}
        onChange={handleChange}
      />
    </Box>
  )
}

export default SetCommunicationToolLink
