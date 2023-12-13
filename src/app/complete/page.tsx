import { Stack, Typography } from '@mui/material'

import TeamReviewCard from './panel/TeamReviewCard'
import BackgroundCard from './panel/BackgroundCard'

const CompletePage = () => {
  return (
    <>
      <div className="mobile-layout">
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <Typography>Mobile Complete</Typography>
        </Stack>
      </div>
      <div className="pc-layout">
        <Stack
          sx={{
            width: '100%',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <BackgroundCard />
        </Stack>
      </div>
    </>
  )
}

export default CompletePage
