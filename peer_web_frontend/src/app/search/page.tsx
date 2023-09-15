import SearchHeader from './panel/SearchHeader'
import SearchBody from './panel/SearchBody'
import { Stack } from '@mui/material'

export default function Page() {
  return (
    <Stack spacing={1}>
      <SearchHeader />
      <SearchBody />
    </Stack>
  )
}
