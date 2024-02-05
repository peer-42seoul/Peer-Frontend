import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material'
import Options from './Options'
import useMedia from '@/hook/useMedia'
import { ProjectType } from '@/types/IPostDetail'

const SearchOption = ({
  openOption,
  setOpenOption,
  setDetailOption,
  type,
}: {
  openOption: boolean
  setOpenOption: any
  setDetailOption: any
  type: ProjectType | undefined
}) => {
  const { isPc } = useMedia()
  const typeTitle = type === 'PROJECT' ? '프로젝트' : '스터디'
  const titleColor = openOption ? 'purple.strong' : 'white'

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
          <Typography variant="Title3" color={titleColor}>
            맞춤 {typeTitle}를 빠르게 찾아요.
          </Typography>
          <IconButton
            onClick={() => setOpenOption(!openOption)}
            sx={{ color: titleColor }}
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
        <Typography variant="Body2" color={'white'}>
          맞춤 {typeTitle}를 빠르게 찾아요.
        </Typography>
        <IconButton
          onClick={() => setOpenOption(!openOption)}
          sx={{ color: 'white' }}
        >
          {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </IconButton>
      </Stack>
      <SwipeableDrawer
        onOpen={() => setOpenOption(false)}
        open={openOption}
        onClose={() => setOpenOption(false)}
        anchor={'bottom'}
      >
        <Stack padding={2} sx={{ height: '70vh' }}>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            onClick={() => setOpenOption(!openOption)}
          >
            <Typography
              variant="Body1"
              color={titleColor}
              sx={{
                cursor: 'pointer',
              }}
            >
              맞춤 프로젝트를 빠르게 찾아요.
            </Typography>
            <IconButton sx={{ color: titleColor }}>
              {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </Stack>
          <Options
            setDetailOption={setDetailOption}
            setOpenOption={setOpenOption}
          />
        </Stack>
      </SwipeableDrawer>
    </Stack>
  )
}

export default SearchOption
