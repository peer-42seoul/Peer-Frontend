import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material'
import useMedia from '@/hook/useMedia'
import { ProjectType } from '@/types/IPostDetail'
import useMainOptionsStore from '@/states/main-page/useMainOptionsStore'
import Options from '@/app/panel/main-page/Options'

const SearchOption = ({ type }: { type: ProjectType }) => {
  const { isPc } = useMedia()
  const { openOption, setOpenOption } = useMainOptionsStore()
  const typeTitles: { [key in ProjectType]: string } = {
    STUDY: '스터디',
    PROJECT: '프로젝트',
    ALL: '전체',
  }
  const typeTitle = typeTitles[type]
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
          onClick={() => setOpenOption(!openOption)}
        >
          <Typography
            variant="Title3"
            color={titleColor}
            sx={{
              cursor: 'pointer',
            }}
          >
            {type === 'ALL'
              ? '스터디와 프로젝트를 빠르게 찾아요.'
              : `맞춤 ${typeTitle}를 빠르게 찾아요.`}
          </Typography>
          <IconButton sx={{ color: titleColor }}>
            {openOption ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Stack>
        <Stack>{openOption && <Options />}</Stack>
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
        onClick={() => setOpenOption(!openOption)}
      >
        <Typography
          variant="Body2"
          color={'white'}
          sx={{
            cursor: 'pointer',
          }}
        >
          {type === 'ALL'
            ? '스터디와 프로젝트를 빠르게 찾아요.'
            : `맞춤 ${typeTitle}를 빠르게 찾아요.`}
        </Typography>
        <IconButton sx={{ color: 'white' }}>
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
              {type === 'ALL'
                ? '스터디와 프로젝트를 빠르게 찾아요.'
                : `맞춤 ${typeTitle}를 빠르게 찾아요.`}
            </Typography>
            <IconButton sx={{ color: titleColor }}>
              {openOption ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
          </Stack>
          <Options setOpenOption={setOpenOption} />
        </Stack>
      </SwipeableDrawer>
    </Stack>
  )
}

export default SearchOption
