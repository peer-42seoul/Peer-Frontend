import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
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
    <>
      <Grid item xs={8}>
        <Stack justifyContent={'center'}>
          <Typography variant="body2">
            맞춤 프로젝트를 빠르게 찾아요.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack
          direction="row"
          alignItems={'center'}
          justifyContent={'flex-end'}
          onClick={() => {
            setOpenOption(!openOption)
          }}
        >
          <Typography variant="body2">세부 옵션</Typography>
          <IconButton>
            {openOption ? <ArrowDropDown /> : <ArrowDropUp />}
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        {openOption && <Options setDetailOption={setDetailOption} />}
      </Grid>
    </>
  )
}

export default SearchOption
