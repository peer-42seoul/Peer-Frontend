'use client'

import { Box, Button, TextField, Typography } from '@mui/material'
import RowRadioButtonsGroup from './panel/radioGroup'
import SetTeamRole from './panel/SetTeamRole/SetTeamRole'
import TagAutoComplete from './panel/SetTeamTag/TagAutoComplete'
import { ChangeEvent, useEffect, useState } from 'react'
import BasicSelect, { ComponentType } from './panel/BasicSelect'
import SetInterview from './panel/SetInterview/SetInterview'
import SetCommunicationToolLink from './panel/SetCommunicationToolLink/SetCommunicationToolLink'
import SetWorkWeekend from './panel/SetWorkWeekend/SetWorkWeekend'

export interface IRoleData {
  role: string
  member: number
}

const CreateTeam = () => {
  const [title, setTitle] = useState<string>('')
  const [teamType, setTeamType] = useState<string>('project')
  const [tagData, setTagData] = useState<string[]>([])
  const [area, setArea] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [communicationTool, setCommunicationTool] = useState<string>('')
  const [teamIntroduction, setTeamIntroduction] = useState<string>('')
  const [WeekendCheckedState, setWeekendCheckedState] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  })
  const [roleData, setRoleData] = useState<IRoleData[]>([])

  const [openBasicModal, setOpenBasicModal] = useState(false)
  const handleOpenBasicModal = () => {
    console.log('handleOpenBasicModal')
    setOpenBasicModal(true)
  }
  const handleCloseBasicModal = () => setOpenBasicModal(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string)
  }

  const handleChangeIntroduction = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamIntroduction(event.target.value as string)
  }

  // 나중에 지울 것.
  useEffect(() => {
    console.log('teamtype :', teamType)
    console.log('communicationtool link :', communicationTool)
    console.log('teamIntroduction :', teamIntroduction)
    console.log('WeekendCheckedState :', WeekendCheckedState)
    console.log('roleData :', roleData)
  }, [
    teamType,
    communicationTool,
    teamIntroduction,
    WeekendCheckedState,
    roleData,
  ])

  return (
    <>
      <Box>
        <Typography variant="h3">모집 글 쓰기</Typography>
        <Box>
          <Typography variant="h6">팀 제목</Typography>
          <TextField variant="outlined" value={title} onChange={handleChange} />
        </Box>
        {/* <Box> 모집 글 뷰에선 스터디/프로젝트 구분을 애초에 들어올때 하니까 필요없나?
          <Typography variant="h6">팀 분류</Typography>
          <RowRadioButtonsGroup setValue={setTeamType} />
        </Box> */}
        <Box>
          <Typography variant="h6">팀 인원</Typography>
          <BasicSelect
            type={ComponentType.TeamSize}
            value={teamsize}
            setValue={setTeamsize}
          />
        </Box>
        <Box>
          <Typography variant="h6">목표기간</Typography>
          <BasicSelect
            type={ComponentType.Month}
            value={month}
            setValue={setMonth}
          />
        </Box>
        <Box>
          <Typography variant="h6">지역</Typography>
          <BasicSelect
            type={ComponentType.Area}
            value={area}
            setValue={setArea}
          />
        </Box>
        <Box>
          <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
          <SetCommunicationToolLink setValue={setCommunicationTool} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h6" sx={{ paddingRight: '5px' }}>
            모집인원 인터뷰 등록하기
          </Typography>
          <Button variant="outlined" onClick={handleOpenBasicModal}>
            등록
          </Button>
          <SetInterview
            openBasicModal={openBasicModal}
            handleCloseBasicModal={handleCloseBasicModal}
          />
        </Box>
        <Box>
          <Typography variant="h6">태그</Typography>
          <TagAutoComplete datas={tagData} setData={setTagData} />
        </Box>
        <Box>
          <SetWorkWeekend
            setWeekendCheckedState={setWeekendCheckedState}
            WeekendCheckedState={WeekendCheckedState}
          />
        </Box>
        {teamType === 'study' ? null : (
          <Box>
            <Typography variant="h6">팀 역할</Typography>
            <SetTeamRole roleData={roleData} setRoleData={setRoleData} />
          </Box>
        )}
        <Box>
          <Typography variant="h6">팀 소개</Typography>
          <TextField
            variant="outlined"
            sx={{ width: '80vw', height: 'auto' }}
            onChange={handleChangeIntroduction}
            multiline
          />
        </Box>
        <Button variant="contained" color="success">
          작성 완료
        </Button>
      </Box>
    </>
  )
}

export default CreateTeam
