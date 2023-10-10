import LinkIcon from '@mui/icons-material/Link'
import { Box, TextField } from '@mui/material'

const CommunicationToolLink = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LinkIcon
        sx={{
          width: '45px',
          height: '45px',
          paddingRight: '6px'
        }}
      />
      <TextField
        variant="outlined"
        placeholder="link to communication tool"
        sx={{ width: '50%' }}
      />
    </Box>
  )
}

export default CommunicationToolLink
