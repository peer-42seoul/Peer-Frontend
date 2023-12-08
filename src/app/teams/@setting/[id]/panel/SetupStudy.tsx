import {
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { validation, validationNumber } from './utils'
import { dueList } from './SetupSelect'
import { ISetupTeam } from './SetupTeam'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useModal from '@/hook/useModal'
import CuModal from '@/components/CuModal'
import CuButton from '@/components/CuButton'
import { TeamOperationForm } from '@/app/teams/types/types'
import useAxiosWithAuth from '@/api/config'

import ClearIcon from '@mui/icons-material/Clear'
import { Controller, useForm } from 'react-hook-form'
import { locationData } from '@/api/location'
import { closeButtonStyle, comfirmModalStyle, deleteModalStyle } from './styles'

const SetupStudy = ({ team }: { team: ISetupTeam }) => {
  const [preview, setPreview] = useState<string>(
    team.teamImage ? team.teamImage : '/images/teamLogo.png',
  )
  const { isOpen, openModal, closeModal } = useModal()
  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModel,
    closeModal: closeConfirmModel,
  } = useModal()

  const [isEdit, setIsEdit] = useState(false)
  const sendRef = useRef<HTMLFormElement>(null)
  const axiosWithAuth = useAxiosWithAuth()

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<ISetupTeam>({
    defaultValues: team,
    mode: 'onChange',
  })

  const watchAllFields = watch()

  const onSubmit = handleSubmit((data) => {
    if (
      validation(getValues('name')) ||
      validationNumber(getValues('maxMember') as string)
    )
      return alert('한글, 영문, 숫자만 입력 가능합니다.')
    if (isEdit === false) return alert('변경된 사항이 없습니다.')

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
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()

      reader.onload = () => {
        setPreview(reader.result as string)
        setValue('teamImage', reader.result as string)
      }
      reader.readAsDataURL(file!)
    }
  }

  const deleteImage = () => {
    setPreview('/images/teamLogo.png')
    setValue('teamImage', '')
    closeModal()
  }

  useEffect(() => {
    if (watchAllFields) setIsEdit(true)
  }, [watchAllFields])

  useEffect(() => {
    window.history.pushState(null, '', location.href)

    window.onpopstate = () => {
      if (isEdit) {
        console.log("You can't go back")
        history.go(1)

        alert('팀 정보 수정을 완료해주세요.')
      }
    }

    return () => {
      window.onpopstate = () => {}
    }
  }, [isEdit])

  return (
    <>
      <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
        <form ref={sendRef} onSubmit={onSubmit}>
          <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
            <Stack>
              <Typography>스터디</Typography>
              <Stack direction="row" justifyContent={'space-between'}>
                <Typography>스터디명: {team.name}</Typography>
                <Stack>
                  <TextField
                    maxRows={1}
                    inputProps={{
                      style: {
                        padding: 5,
                      },
                    }}
                    {...register('name', {
                      required: '필수 입력사항입니다.',
                      maxLength: 10,
                      minLength: {
                        value: 2,
                        message: '2글자 이상 입력해주세요.',
                      },
                      pattern: {
                        value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                        message: '한글, 영문, 숫자만 입력 가능합니다.',
                      },
                    })}
                    type="text"
                  />
                  <Typography>{errors.name?.message}</Typography>
                </Stack>
              </Stack>
              <Box>
                <Box
                  width={[56, 100]}
                  height={[56, 100]}
                  sx={{ position: 'relative' }}
                >
                  <IconButton sx={closeButtonStyle} onClick={openModal}>
                    <ClearIcon />
                  </IconButton>
                  <Button
                    component="label"
                    sx={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    <Avatar
                      variant="rounded"
                      src={preview}
                      alt="teamLogo"
                      sx={{ width: 100, height: 100 }}
                    />
                    <input
                      type="file"
                      accept={'image/*'}
                      style={{ display: 'none' }}
                      id="teamImage"
                      onChange={handleImage}
                    />
                  </Button>
                </Box>
              </Box>
            </Stack>
            <Stack>
              <Typography>목표 기간: </Typography>
              <Controller
                name="dueTo"
                control={control}
                defaultValue={team.dueTo}
                render={({ field }) => (
                  <Select defaultValue={team.dueTo} {...field}>
                    {dueList.map((dueTo, idx) => (
                      <MenuItem key={'dueTo' + idx} value={dueTo}>
                        {dueTo}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>활동 방식: </Typography>
              <Controller
                name="operationForm"
                control={control}
                defaultValue={team.operationForm}
                render={({ field }) => (
                  <Select defaultValue={team.operationForm} {...field}>
                    {[
                      TeamOperationForm.OFFLINE,
                      TeamOperationForm.ONLINE,
                      TeamOperationForm.MIX,
                    ].map((operation, idx) => (
                      <MenuItem key={'operation' + idx} value={operation}>
                        {operation === TeamOperationForm.OFFLINE && '오프라인'}
                        {operation === TeamOperationForm.ONLINE && '온라인'}
                        {operation === TeamOperationForm.MIX && '온/오프라인'}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>팀 활동 지역: </Typography>
              <Stack direction="row" spacing={1}>
                <Controller
                  name="region.0"
                  control={control}
                  defaultValue={team.region[0]}
                  render={({ field }) => (
                    <Select defaultValue={team.region[0]} {...field}>
                      {locationData.map((region, idx) => (
                        <MenuItem key={'region' + idx} value={region.name}>
                          {region.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  name="region.1"
                  control={control}
                  defaultValue={team.region[1]}
                  render={({ field }) => (
                    <Select defaultValue={team.region[1]} {...field}>
                      {locationData
                        .find((region) => region.name === team.region[0])
                        ?.subArea?.map((region, idx) => (
                          <MenuItem key={'region' + idx} value={region}>
                            {region}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
              </Stack>
            </Stack>
            {/* <Stack>
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
            </Stack> */}
          </Box>
        </form>
        <Button type="button" onClick={openConfirmModel}>
          팀 설정
        </Button>
      </Box>

      <CuModal
        ariaTitle="alert-modal-title"
        ariaDescription="alert-modal-description"
        open={isConfirmOpen}
        handleClose={closeConfirmModel}
        style={comfirmModalStyle}
      >
        <Box>
          <Typography id="alert-modal-title">팀 정보 수정 확인</Typography>
          <Typography id="alert-modal-description">
            팀 정보를 수정하시겠습니다.
          </Typography>
          <CuButton
            variant="contained"
            action={closeConfirmModel}
            message="취소"
            style={{ width: '50%' }}
          />
          <CuButton
            variant="contained"
            action={onSubmit}
            message="수정"
            style={{ width: '50%' }}
          />
        </Box>
      </CuModal>

      <CuModal
        ariaTitle="alert-modal-title"
        ariaDescription="alert-modal-description"
        open={isOpen}
        handleClose={closeModal}
        style={deleteModalStyle}
      >
        <Box>
          <Typography id="alert-modal-title">팀 로고 삭제</Typography>
          <Typography id="alert-modal-description">
            사진을 삭제하시겠습니까?
          </Typography>
          <CuButton
            variant="contained"
            action={closeModal}
            message="취소"
            style={{ width: '50%' }}
          />
          <CuButton
            variant="contained"
            action={deleteImage}
            message="삭제"
            style={{ width: '50%' }}
          />
        </Box>
      </CuModal>
    </>
  )
}

export default SetupStudy
