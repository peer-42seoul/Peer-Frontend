import { Button, ButtonGroup, Typography } from '@mui/material'
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
    <ButtonGroup>
      <Button
        onClick={() => {
          setType('STUDY')
        }}
        variant={'text'}
      >
        <Typography
          color={!type || type === 'STUDY' ? 'primary' : 'text.assistive'}
          variant={'Title1'}
        >
          스터디
        </Typography>
      </Button>
      <Button
        variant="text"
        onClick={() => {
          setType('PROJECT')
        }}
      >
        <Typography
          color={type === 'PROJECT' ? 'primary' : 'text.assistive'}
          variant={'Title1'}
        >
          프로젝트
        </Typography>
      </Button>
    </ButtonGroup>
  )
}

export default SelectType
