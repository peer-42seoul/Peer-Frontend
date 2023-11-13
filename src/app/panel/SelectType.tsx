import { Button, ButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ProjectType } from './MainPage'

const SelectType = ({
  type,
  setType,
  pc,
}: {
  type: ProjectType | undefined
  setType: Dispatch<SetStateAction<ProjectType | undefined>>
  pc?: boolean
}) => {
  {
    /*type이 null일시 (최초값일시) study 활성화*/
  }
  if (pc) {
    return (
      <ButtonGroup>
        <Button
          variant="text"
          sx={{ color: !type || type === 'STUDY' ? 'blue' : 'black' }}
          onClick={() => {
            setType('STUDY')
          }}
        >
          스터디
        </Button>
        <Button
          variant="text"
          sx={{ color: type === 'PROJECT' ? 'blue' : 'black' }}
          onClick={() => {
            setType('PROJECT')
          }}
        >
          프로젝트
        </Button>
      </ButtonGroup>
    )
  }

  return (
    <ButtonGroup
      variant="contained"
      aria-label="STUDY or PROJECT button"
      fullWidth
      sx={{
        justifyContent: 'space-evenly',
        border: 'none',
      }}
    >
      <Button
        sx={{
          backgroundColor: !type || type === 'STUDY' ? 'blue' : 'gray',
        }}
        onClick={() => {
          setType('STUDY')
        }}
      >
        스터디
      </Button>
      <Button
        sx={{ backgroundColor: type === 'PROJECT' ? 'blue' : 'gray' }}
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
