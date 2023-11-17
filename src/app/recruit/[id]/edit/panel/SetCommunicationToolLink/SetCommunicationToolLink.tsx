import LinkIcon from '@mui/icons-material/Link'
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
      <LinkIcon
        sx={{
          width: '45px',
          height: '45px',
          paddingRight: '6px',
        }}
      />
      <TextField
        variant="outlined"
        placeholder="link to communication tool"
        sx={{ width: '50%' }}
        onChange={handleChange}
      />
    </Box>
  )
}

export default SetCommunicationToolLink
