'use client'

import {
  Box,
  SelectChangeEvent,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
} from '@mui/material'
import { TeamOperationForm, TeamStatus, TeamType } from '../../../types/types'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import SetupSelect from './SetupSelect'
import Image from 'next/image'
import useModal from '@/hook/useModal'
import CuModal from '@/components/CuModal'
import CuButton from '@/components/CuButton'
import useAxiosWithAuth from '@/api/config'
import ClearIcon from '@mui/icons-material/Clear'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import CuTextModal from '@/components/CuTextModal'

interface ISetupTeam {
  id: string
  type: TeamType
  name: string
  maxMember: String
  status: TeamStatus
  dueTo: string
  operationForm: TeamOperationForm
  region: string[]
  teamImage: string | null
}

const SetupTeam = ({ team }: { team: ISetupTeam }) => {
  const { isOpen, openModal, closeModal } = useModal()
  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModel,
    closeModal: closeConfirmModel,
  } = useModal()
  const [teamInfo, setTeamInfo] = useState(team)
  const [isEdit, setIsEdit] = useState(false)
  const axiosWithAuth = useAxiosWithAuth()

  const sendTeamInfo = () => {
    if (
      validation(teamInfo.name) ||
      validationNumber(teamInfo.maxMember as string)
    )
      return alert('한글, 영문, 숫자만 입력 가능합니다.')
    if (isEdit === false) return alert('변경된 사항이 없습니다.')

    const data: ISetupTeam = {
      name: teamInfo.name,
      dueTo: teamInfo.dueTo,
      operationForm: teamInfo.operationForm,
      region: teamInfo.region,
      teamImage: teamInfo.teamImage,
      maxMember: teamInfo.maxMember,
      type: teamInfo.type,
      status: teamInfo.status,
      id: teamInfo.id,
    }

    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${team.id}`,
        data,
      )
      .then((res) => {
        if (res.status == 200) {
          console.log('서버에 저장 완료')
          setIsEdit(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    closeConfirmModel()
  }

  const handleLocation1 = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      region: [event.target.value, teamInfo.region[1], teamInfo.region[2]],
    })
  }

  const handleLocation2 = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,

      region: [teamInfo.region[0], event.target.value, teamInfo.region[2]],
    })
  }

  const handleOperationForm = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      operationForm: event.target.value as TeamOperationForm,
    })
  }

  const handleDate = (event: SelectChangeEvent) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      dueTo: event.target.value,
    })
  }

  const handleTeamName = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      name: event.target.value,
    })
  }

  const handleImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0]
      console.log(file)
      if (e.target.files && e.target.files[0]) {
        setIsEdit(true)
        const reader = new FileReader()

        reader.onload = () => {
          setTeamInfo({
            ...teamInfo,
            teamImage: reader.result as string,
          })
        }
        reader.readAsDataURL(file!)
      }
    },
    [teamInfo.teamImage],
  )

  const handleDeleteImage = useCallback(() => {
    setTeamInfo({
      ...teamInfo,
      teamImage: null,
    })
    closeModal()
  }, [teamInfo.teamImage])

  const handleMaxMember = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEdit(true)
    setTeamInfo({
      ...teamInfo,
      maxMember: event.target.value,
    })
  }

  const validation = (target: string) => {
    // 한글, 영문, 숫자만 입력 가능
    // 2~12자리
    let check = /^[\d|a-zA-Z|가-힣]{2,12}$/

    if (check.test(target)) {
      return false
    }

    return true
  }

  const validationNumber = (target: string) => {
    // 숫자만 입력 가능
    // 1~2자리
    let check = /^[0-9]{1,2}$/

    if (check.test(target)) {
      return false
    }

    return true
  }

  useEffect(() => {
    window.history.pushState(null, '', location.href)

    window.onpopstate = () => {
      if (isEdit) {
        console.log("You can't go back")
        history.go(1)

        alert('팀 정보 수정을 완료해주세요.')
      }
    }
  }, [isEdit])

  return (
    <>
      {teamInfo.type === TeamType.STUDY ? (
        <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
          <Typography fontWeight="bold">클릭한 스터디 팀 설정 : </Typography>
          <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
            <Stack>
              <Typography>스터디</Typography>
              <Stack direction="row" justifyContent={'space-between'}>
                <Typography>스터디명: {team.name}</Typography>

                <TextField
                  id="outlined-basic"
                  label={`스터디 이름`}
                  variant="outlined"
                  value={teamInfo.name}
                  maxRows={1}
                  size="small"
                  onChange={handleTeamName}
                  error={validation(teamInfo.name)}
                  helperText={validation(teamInfo.name) ? '다시 입력' : ''}
                  inputProps={{
                    style: {
                      padding: 5,
                    },
                  }}
                />
              </Stack>
              <Box>
                <Box
                  width={[56, 100]}
                  height={[56, 100]}
                  sx={{ position: 'relative' }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '0',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50px',
                      borderColor: 'lightgray',
                      border: '1px',
                      padding: '4px',
                      backgroundColor: 'white',
                      zIndex: '9999',
                    }}
                    onClick={openModal}
                  >
                    <ClearIcon />
                  </IconButton>
                  <Button
                    component="label"
                    sx={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    <Avatar
                      variant="rounded"
                      src={
                        teamInfo.teamImage
                          ? teamInfo.teamImage
                          : '/images/teamLogo.png'
                      }
                      alt="teamLogo"
                      sx={{ width: 100, height: 100 }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '0',
                        right: '6px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50px',
                        borderColor: 'lightgray',
                        border: '1px',
                        padding: '4px',
                        backgroundColor: 'white',
                      }}
                    >
                      <PhotoCameraOutlinedIcon />
                    </Box>
                    <input
                      type="file"
                      accept={'image/*'}
                      style={{ display: 'none' }}
                      id="profileImage"
                      name="profileImage"
                      onChange={handleImage}
                    />
                  </Button>
                </Box>
              </Box>
            </Stack>
            <Stack>
              <Typography>목표 기간: </Typography>
              <SetupSelect
                type="dueTo"
                value={teamInfo.dueTo}
                setValue={handleDate}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>활동 방식: </Typography>
              <SetupSelect
                type="operationForm"
                value={teamInfo.operationForm}
                setValue={handleOperationForm}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>팀 활동 지역: </Typography>
              <Stack direction="row" spacing={1}>
                <SetupSelect
                  type="location"
                  value={teamInfo.region[0]}
                  setValue={handleLocation1}
                />
                <SetupSelect
                  type="location"
                  parentLocation={teamInfo.region[0]}
                  value={teamInfo.region[1]}
                  setValue={handleLocation2}
                />
              </Stack>
            </Stack>
            <Stack>
              <Typography>팀원 모집 인원: </Typography>
              <TextField
                id="outlined-basic"
                label={`팀원 모집 최대 인원`}
                variant="outlined"
                value={teamInfo.maxMember}
                maxRows={1}
                size="small"
                onChange={handleMaxMember}
                error={validationNumber(teamInfo.maxMember as string)}
                helperText={
                  validationNumber(teamInfo.maxMember as string)
                    ? '다시 입력'
                    : ''
                }
                inputProps={{
                  style: {
                    padding: 5,
                  },
                }}
              />
            </Stack>
          </Box>
          <Button onClick={openConfirmModel}>팀 설정</Button>
        </Box>
      ) : (
        <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
          <Typography fontWeight="bold">
            클릭한 프로젝트명 팀 설정 :{' '}
          </Typography>
          <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
            <Stack>
              <Typography>프로젝트</Typography>
              <Stack direction="row" justifyContent={'space-between'}>
                <Typography>프로젝트명: {team.name}</Typography>

                <TextField
                  id="outlined-basic"
                  label={`프로젝트 이름`}
                  variant="outlined"
                  value={teamInfo.name}
                  maxRows={1}
                  size="small"
                  onChange={handleTeamName}
                  error={validation(teamInfo.name)}
                  helperText={validation(teamInfo.name) ? '다시 입력' : ''}
                  inputProps={{
                    style: {
                      padding: 5,
                    },
                  }}
                />
              </Stack>
              <Box>
                <Box
                  width={[56, 100]}
                  height={[56, 100]}
                  sx={{ position: 'relative' }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '0',
                      right: '6px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50px',
                      borderColor: 'lightgray',
                      border: '1px',
                      padding: '4px',
                      backgroundColor: 'white',
                      zIndex: '9999',
                    }}
                    onClick={openModal}
                  >
                    <ClearIcon />
                  </IconButton>
                  <Button
                    component="label"
                    sx={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    <Image
                      src={
                        teamInfo.teamImage
                          ? teamInfo.teamImage
                          : '/images/teamLogo.png'
                      }
                      alt="teamLogo"
                      width={100}
                      height={100}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: '0',
                        right: '6px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50px',
                        borderColor: 'lightgray',
                        border: '1px',
                        padding: '4px',
                        backgroundColor: 'white',
                      }}
                    >
                      <PhotoCameraOutlinedIcon />
                    </Box>
                    <input
                      type="file"
                      accept={'image/*'}
                      style={{ display: 'none' }}
                      id="profileImage"
                      name="profileImage"
                      onChange={handleImage}
                    />
                  </Button>
                </Box>
              </Box>
            </Stack>
            <Stack>
              <Typography>목표 기간: </Typography>
              <SetupSelect
                type="dueTo"
                value={teamInfo.dueTo}
                setValue={handleDate}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>활동 방식: </Typography>
              <SetupSelect
                type="operationForm"
                value={teamInfo.operationForm}
                setValue={handleOperationForm}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>팀 활동 지역: </Typography>
              <Stack direction="row" spacing={1}>
                <SetupSelect
                  type="location"
                  value={teamInfo.region[0]}
                  setValue={handleLocation1}
                />
                <SetupSelect
                  type="location"
                  parentLocation={teamInfo.region[0]}
                  value={teamInfo.region[1]}
                  setValue={handleLocation2}
                />
              </Stack>
            </Stack>
          </Box>
          <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
            <Typography>팀 역할</Typography>
            <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
              <Stack>
                <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
                  <Typography>FE</Typography>
                </Box>
                <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
                  <Typography>BE</Typography>
                </Box>
                <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
                  <Typography>디자이너</Typography>
                </Box>
                <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
                  <Typography>역할</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Button onClick={openConfirmModel}>팀 설정</Button>
        </Box>
      )}
      <CuTextModal
        open={isConfirmOpen}
        onClose={closeConfirmModel}
        title={'팀 정보 수정 확인'}
        containedButton={{
          text: '수정',
          onClick: sendTeamInfo,
        }}
        textButton={{
          text: '취소',
          onClick: closeConfirmModel,
        }}
        content={'팀 정보를 수정하시겠습니까?'}
      />
      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 로고 삭제'}
        containedButton={{
          text: '삭제',
          onClick: openModal,
        }}
        textButton={{
          text: '취소',
          onClick: handleDeleteImage,
        }}
        content={'사진을 삭제하시겠습니까?'}
      />
    </>
  )
}

export default SetupTeam
