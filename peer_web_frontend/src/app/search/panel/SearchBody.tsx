'use client'

import { Button, ButtonGroup } from '@mui/material'
import { useState } from 'react'
import SearchStudy from './SearchStudy'
import SearchProject from './SearchProject'
import SearchHistory from './SearchHistory'

export default function SearchBody() {
  const [type, setType] = useState('study')

  const setTypeStudy = () => {
    setType('study')
  }

  const setTypeProject = () => {
    setType('project')
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        fullWidth
        sx={{
          justifyContent: 'space-evenly',
          border: 'none',
        }}
      >
        <Button onClick={setTypeStudy}>스터디</Button>
        <Button onClick={setTypeProject}>프로젝트</Button>
      </ButtonGroup>
      {type === 'study' && <SearchStudy />}
      {type === 'project' && <SearchProject />}
      <SearchHistory />
    </>
  )
}
