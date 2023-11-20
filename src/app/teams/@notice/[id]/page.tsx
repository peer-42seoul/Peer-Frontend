'use client'
import { Typography, Button, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useMedia from '@/hook/useMedia'

const TeamNotice = () => {
  const { isPc } = useMedia()
  return (
    <Stack width={'100%'}>
      {isPc ? (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button variant="contained" startIcon={<AddIcon />}>
            새 글쓰기
          </Button>
        </Stack>
      ) : null}
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>공지사항</Typography>
        {isPc ? null : (
          <IconButton>
            <AddIcon />
          </IconButton>
        )}
      </Stack>
      {/* <NoticeList /> */}
    </Stack>
  )
}

export default TeamNotice
