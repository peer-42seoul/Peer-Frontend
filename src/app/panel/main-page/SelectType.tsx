import { Stack, Typography } from '@mui/material'
import { ProjectType } from '@/types/IPostDetail'

const SelectType = ({
  type,
  setType,
}: {
  type: ProjectType | undefined
  setType: (value: ProjectType) => void
}) => {
  {
    /*type이 null일시 (최초값일시) study 활성화*/
  }
  return (
    <Stack flexDirection={'row'} gap={'0.75rem'} alignItems={'center'}>
      <Typography
        color={!type || type === 'STUDY' ? 'text.strong' : 'text.assistive'}
        variant={'Title1'}
        onClick={() => {
          setType('STUDY')
        }}
        sx={{ cursor: 'pointer', transition: 'color 0.5s ease' }}
      >
        스터디
      </Typography>
      <Typography
        color={type === 'PROJECT' ? 'text.strong' : 'text.assistive'}
        variant={'Title1'}
        onClick={() => {
          setType('PROJECT')
        }}
        sx={{ cursor: 'pointer', transition: 'color 0.5s ease' }}
      >
        프로젝트
      </Typography>
    </Stack>
  )
}

export default SelectType
