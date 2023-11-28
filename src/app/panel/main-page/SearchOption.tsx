import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import Options from './Options'

const SearchOption = ({
  openOption,
  setOpenOption,
  setDetailOption,
}: {
  openOption: boolean
  setOpenOption: any
  setDetailOption: any
}) => {
  return (
    <Stack flex={1} padding={1}>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        bgcolor={'purple.strong'}
      >
        <Typography variant="body2">맞춤 프로젝트를 빠르게 찾아요.</Typography>
        <IconButton onClick={() => setOpenOption(!openOption)}>
          {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </IconButton>
      </Stack>
      <Stack>
        {openOption && <Options setDetailOption={setDetailOption} />}
      </Stack>
    </Stack>
  )
}

export default SearchOption
