import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material'
import Options from './Options'
import useMedia from '@/hook/useMedia'

const SearchOption = ({
  openOption,
  setOpenOption,
  setDetailOption,
}: {
  openOption: boolean
  setOpenOption: any
  setDetailOption: any
}) => {
  const { isPc } = useMedia()

  if (isPc)
    return (
      <Stack flex={1}>
        <Stack
          paddingY={'0.5rem'}
          paddingX={'1rem'}
          flexDirection={'row'}
          alignItems={'center'}
          bgcolor={openOption ? undefined : 'purple.strong'}
          borderRadius={'0.75rem'}
        >
          <Typography
            variant="Title3"
            color={openOption ? 'purple.strong' : undefined}
          >
            맞춤 프로젝트를 빠르게 찾아요.
          </Typography>
          <IconButton
            onClick={() => setOpenOption(!openOption)}
            sx={{ color: openOption ? 'purple.strong' : undefined }}
          >
            {openOption ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Stack>
        <Stack>
          {openOption && <Options setDetailOption={setDetailOption} />}
        </Stack>
      </Stack>
    )

  return (
    <Stack flex={1}>
      <Stack
        paddingY={'0.5rem'}
        paddingX={'1rem'}
        flexDirection={'row'}
        alignItems={'center'}
        bgcolor={'purple.strong'}
        borderRadius={'0.75rem'}
      >
        <Typography variant="Body2">맞춤 프로젝트를 빠르게 찾아요.</Typography>
        <IconButton
          onClick={() => setOpenOption(!openOption)}
          sx={{ color: 'text.normal' }}
        >
          {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </IconButton>
      </Stack>
      <SwipeableDrawer
        sx={{ zIndex: 1500 }}
        onOpen={() => setOpenOption(false)}
        open={openOption}
        onClose={() => setOpenOption(false)}
        anchor={'bottom'}
      >
        <Stack padding={2} sx={{ height: '70vh' }}>
          <Stack flexDirection={'row'} alignItems={'center'}>
            <Typography variant="Body1" color={'purple.strong'}>
              맞춤 프로젝트를 빠르게 찾아요.
            </Typography>
            <IconButton
              sx={{ color: 'purple.strong' }}
              onClick={() => setOpenOption(!openOption)}
            >
              {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </Stack>
          <Options setDetailOption={setDetailOption} />
        </Stack>
      </SwipeableDrawer>
    </Stack>
  )
}

export default SearchOption
