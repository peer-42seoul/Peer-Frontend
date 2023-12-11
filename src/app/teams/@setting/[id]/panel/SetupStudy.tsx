import {
  Avatar,
  Box,
  Button,
  Card,
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
import { TeamOperationForm, TeamStatus } from '@/app/teams/types/types'
import useAxiosWithAuth from '@/api/config'

import ClearIcon from '@mui/icons-material/Clear'
import { Controller, useForm } from 'react-hook-form'
import { locationData } from '@/api/location'
import {
  SaveButtonStyle,
  closeButtonStyle,
  comfirmModalStyle,
  deleteModalStyle,
} from './styles'
import {
  GeoClearIcon,
  PencilClearIcon,
  PieClearIcon,
  TargetClearIcon,
  WifiClearIcon,
} from './Icons'

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
      .finally(() => {
        closeConfirmModel()
      })
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
      if (isEdit === true) {
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
      <Card sx={{ p: 3, borderRadius: '10px' }}>
        <Typography>팀상태</Typography>
        <form ref={sendRef} onSubmit={onSubmit}>
          <Box sx={{ m: 1, p: 1 }}>
            <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
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
              <Typography>{team.name}</Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} m={1}>
                <PencilClearIcon />
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                >
                  <Typography>프로젝트명</Typography>
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
              <Stack direction={'row'} alignItems={'center'} m={1}>
                <TargetClearIcon />
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                >
                  <Typography>상태</Typography>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={team.status}
                    render={({ field }) => (
                      <Select
                        size="small"
                        sx={{ m: 0 }}
                        defaultValue={team.status}
                        {...field}
                      >
                        {[
                          TeamStatus.RECRUITING,
                          TeamStatus.BEFORE,
                          TeamStatus.ONGOING,
                          TeamStatus.COMPLETE,
                        ].map((status, idx) => (
                          <MenuItem key={'status' + idx} value={status}>
                            {status === TeamStatus.RECRUITING && '모집 중'}
                            {status === TeamStatus.BEFORE && '진행 예정'}
                            {status === TeamStatus.ONGOING && '진행 중'}
                            {status === TeamStatus.COMPLETE && '완료'}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} m={1}>
                <PieClearIcon />
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                >
                  <Typography>목표 기간</Typography>
                  <Controller
                    name="dueTo"
                    control={control}
                    defaultValue={team.dueTo}
                    render={({ field }) => (
                      <Select size="small" defaultValue={team.dueTo} {...field}>
                        {dueList.map((dueTo, idx) => (
                          <MenuItem key={'dueTo' + idx} value={dueTo}>
                            {dueTo}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Stack>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} m={1}>
                <WifiClearIcon />
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                >
                  <Typography>활동 방식</Typography>
                  <Controller
                    name="operationForm"
                    control={control}
                    defaultValue={team.operationForm}
                    render={({ field }) => (
                      <Select
                        size="small"
                        defaultValue={team.operationForm}
                        {...field}
                      >
                        {[
                          TeamOperationForm.OFFLINE,
                          TeamOperationForm.ONLINE,
                          TeamOperationForm.MIX,
                        ].map((operation, idx) => (
                          <MenuItem key={'operation' + idx} value={operation}>
                            {operation === TeamOperationForm.OFFLINE &&
                              '오프라인'}
                            {operation === TeamOperationForm.ONLINE && '온라인'}
                            {operation === TeamOperationForm.MIX &&
                              '온/오프라인'}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Stack>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} m={1}>
                <GeoClearIcon />
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                >
                  <Typography>팀 활동 지역</Typography>
                  <Controller
                    name="region.0"
                    control={control}
                    defaultValue={team.region[0]}
                    render={({ field }) => (
                      <Select
                        size="small"
                        defaultValue={team.region[0]}
                        {...field}
                      >
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
                      <Select
                        size="small"
                        defaultValue={team.region[1]}
                        {...field}
                      >
                        {locationData.find(
                          (region) => region.name === team.region[0],
                        )?.subArea ? (
                          locationData
                            .find((region) => region.name === team.region[0])
                            ?.subArea?.map((region, idx) => (
                              <MenuItem key={'region' + idx} value={region}>
                                {region}
                              </MenuItem>
                            ))
                        ) : (
                          <MenuItem key={'region'} value={''}></MenuItem>
                        )}
                      </Select>
                    )}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </form>
        <Stack position={'relative'}>
          <Button
            sx={SaveButtonStyle}
            variant="contained"
            type="button"
            onClick={openConfirmModel}
          >
            저장
          </Button>
        </Stack>
      </Card>

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
