import { Button, ButtonGroup } from '@mui/material'
import { ProjectType } from '../MainPage'

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
        variant="text"
        sx={{
          color: !type || type === 'STUDY' ? 'primary' : 'text.assistive',
        }}
        onClick={() => {
          setType('STUDY')
        }}
      >
        스터디
      </Button>
      <Button
        variant="text"
        sx={{ color: type === 'PROJECT' ? 'primary' : 'text.assistive' }}
        onClick={() => {
          setType('PROJECT')
        }}
      >
        프로젝트
      </Button>
    </ButtonGroup>
  )
}

export default SelectType
