import { Button, ButtonGroup } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ProjectType } from '../page'

const SelectType = ({
  setType,
}: {
  setType: Dispatch<SetStateAction<ProjectType>>
}) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="study or project button"
      fullWidth
      sx={{
        justifyContent: 'space-evenly',
        border: 'none',
      }}
    >
      <Button
        onClick={() => {
          setType('studies')
        }}
      >
        스터디
      </Button>
      <Button
        onClick={() => {
          setType('projects')
        }}
      >
        프로젝트
      </Button>
    </ButtonGroup>
  )
}

export default SelectType
