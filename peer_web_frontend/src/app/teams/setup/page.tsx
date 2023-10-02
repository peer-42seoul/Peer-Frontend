import { Box, Stack } from '@mui/material'
import Sidebar from './panel/Sidebar'
import SetupPage from './panel/SetupPage'

const TeamsSetupPage = () => {
  return (
    <Stack margin={4} spacing={2} direction="row" display="flex">
      <Box flex={1}>
        <Sidebar />
      </Box>
      <Box flex={4}>
        <SetupPage />
      </Box>
    </Stack>
  )
}

export default TeamsSetupPage
