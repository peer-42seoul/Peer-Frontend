import { Stack, Typography } from '@mui/material'
import BackButton from '../../component/BackButton'
import CloseButton from '../../component/CloseButton'

export default function SearchHeader() {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <BackButton />
      <Typography>검색</Typography>
      <CloseButton />
    </Stack>
  )
}
