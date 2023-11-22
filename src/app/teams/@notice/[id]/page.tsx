'use client'
import { useRouter } from 'next/navigation'
import { Typography, Button, Stack, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import useMedia from '@/hook/useMedia'
import NoticeList from './panel/NoticeList'

const TeamNotice = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { isPc } = useMedia()
  const router = useRouter()
  return (
    <Stack width={'100%'}>
      {isPc ? (
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <Button
            onClick={() => router.push(`/teams/${id}/notice-edit`)}
            variant="contained"
            startIcon={<AddIcon />}
          >
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
      <NoticeList teamId={parseInt(id)} />
    </Stack>
  )
}

export default TeamNotice
