import React from 'react'
import LoginForm from './LoginForm'
import { Box } from '@mui/system'

const CenteredLoginForm: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <LoginForm />
    </Box>
  )
}

export default CenteredLoginForm
