import {
  AlertColor,
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
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useModal from '@/hook/useModal'
import {
  TeamOperationForm,
  TeamStatus,
  TeamType,
} from '@/app/teams/types/types'
import useAxiosWithAuth from '@/api/config'

import ClearIcon from '@mui/icons-material/Clear'
import { Controller, useForm } from 'react-hook-form'
import { locationData } from '@/api/location'
import * as styles from './styles'

import {
  GeoClearIcon,
  PencilClearIcon,
  PieClearIcon,
  TargetClearIcon,
  WifiClearIcon,
} from './Icons'
import useMedia from '@/hook/useMedia'
import useToast from '@/hook/useToast'
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
  // job: Job[] | null
}

const SetupInfo = ({ team }: { team: ISetupTeam }) => {
  const { isPc } = useMedia()
  const [message, setMessage] = useState<string>('')
  const [toastSeverity, setToastSeverity] = useState<AlertColor>('info')
  const { CuToast, isOpen: isOpenToast, openToast, closeToast } = useToast()
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
      return handleOpenToast('입력값을 확인해주세요.', 'error')
    if (isEdit === false)
      return handleOpenToast('변경된 사항이 없습니다.', 'error')

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
    if (!e.target.files) return
    const file = e.target.files[0]
    if (file) {
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

  const handleOpenToast = (message: string, severity: AlertColor) => {
    setMessage(message)
    setToastSeverity(severity)
    openToast()
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
  }, [isEdit])

  return (
    <>
      <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
        <Typography>팀상태</Typography>
        <form ref={sendRef} onSubmit={onSubmit}>
          <Box
            sx={{
              m: '0.5rem',
              p: '0.5rem',
            }}
          >
            <Stack
              direction={isPc ? 'row' : 'column'}
              alignItems={isPc ? 'center' : ''}
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={'0.5rem'}
                p={'0.5rem'}
              >
                <Box
                  width={[56, '10rem']}
                  height={[56, '10rem']}
                  sx={{ position: 'relative' }}
                >
                  <IconButton sx={styles.closeButtonStyle} onClick={openModal}>
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
                      sx={{ width: '10rem', height: '10rem' }}
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
              </Stack>
              <Stack>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  m={'0.5rem'}
                  spacing={'0.25rem'}
                >
                  <PencilClearIcon />
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    spacing={'0.5rem'}
                    height={'4.5rem'}
                  >
                    {team.type === TeamType.PROJECT && (
                      <Typography>프로젝트명</Typography>
                    )}
                    {team.type === TeamType.STUDY && (
                      <Typography>스터디명</Typography>
                    )}

                    <TextField
                      error={errors.name?.message ? true : false}
                      helperText={errors.name?.message}
                      maxRows={1}
                      inputProps={{
                        style: {
                          padding: '0.5rem',
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
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  mx={'0.5rem'}
                  mb={'1.2rem'}
                  spacing={'0.25rem'}
                >
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
                          variant="outlined"
                          {...field}
                        >
                          {[
                            TeamStatus.RECRUITING,
                            TeamStatus.BEFORE,
                            TeamStatus.ONGOING,
                            TeamStatus.COMPLETE,
                          ].map((status) => (
                            <MenuItem key={status} value={status}>
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
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  mb={'1.2rem'}
                  mx={'0.5rem'}
                  spacing={'0.5rem'}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'flex-start'}
                    spacing={'0.25rem'}
                  >
                    <PieClearIcon />
                    <Typography textOverflow={'ellipsis'}>목표기간</Typography>
                  </Stack>

                  <Controller
                    name="dueTo"
                    control={control}
                    defaultValue={team.dueTo}
                    render={({ field }) => (
                      <Select
                        size="small"
                        defaultValue={team.dueTo}
                        variant="outlined"
                        sx={{
                          m: 0,
                          minWidth: '8rem',
                        }}
                        {...field}
                      >
                        {dueList.map((dueTo) => (
                          <MenuItem key={dueTo} value={dueTo}>
                            {dueTo}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Stack>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  mb={'1.2rem'}
                  mx={'0.5rem'}
                  spacing={'0.5rem'}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'flex-start'}
                    spacing={'0.35rem'}
                  >
                    <WifiClearIcon />
                    <Typography>활동방식</Typography>
                  </Stack>
                  <Controller
                    name="operationForm"
                    control={control}
                    defaultValue={team.operationForm}
                    render={({ field }) => (
                      <Select
                        size="small"
                        variant="outlined"
                        defaultValue={team.operationForm}
                        sx={{
                          m: 0,
                          minWidth: '8rem',
                        }}
                        {...field}
                      >
                        {[
                          TeamOperationForm.OFFLINE,
                          TeamOperationForm.ONLINE,
                          TeamOperationForm.MIX,
                        ].map((operation) => (
                          <MenuItem key={operation} value={operation}>
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
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  spacing={'0.5rem'}
                  mx={'0.5rem'}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'flex-start'}
                    spacing={'0.35rem'}
                  >
                    <GeoClearIcon />
                    <Typography>활동지역</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <Controller
                      name="region.0"
                      control={control}
                      defaultValue={team.region[0]}
                      render={({ field }) => (
                        <Select
                          size="small"
                          variant="outlined"
                          defaultValue={team.region[0]}
                          sx={{
                            m: 0,
                            minWidth: '8rem',
                          }}
                          {...field}
                        >
                          {locationData.map((region) => (
                            <MenuItem key={region.name} value={region.name}>
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
                          variant="outlined"
                          defaultValue={team.region[1]}
                          sx={{
                            m: 0,
                            minWidth: '8rem',
                          }}
                          {...field}
                        >
                          {locationData.find(
                            (region) => region.name === team.region[0],
                          )?.subArea ? (
                            locationData
                              .find((region) => region.name === team.region[0])
                              ?.subArea?.map((region) => (
                                <MenuItem key={region} value={region}>
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
            </Stack>
          </Box>
        </form>

        <Stack spacing={'0.4rem'}>
          <Stack py={'0.25rem'} display={'flex'} flexDirection={'row-reverse'}>
            <Button
              sx={styles.SaveButtonStyle}
              variant="contained"
              type="button"
              onClick={openConfirmModel}
            >
              <Typography>저장</Typography>
            </Button>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography>팀을 나가겠습니까?</Typography>
            <Button variant="contained">
              <Typography>팀 나가기</Typography>
            </Button>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography>팀을 터뜨리겠습니까?</Typography>
            <Button variant="contained">
              <Typography>팀 자폭</Typography>
            </Button>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography>팀 활동을 완료하시겠습니까??</Typography>
            <Button variant="contained">
              <Typography>팀 완료</Typography>
            </Button>
          </Stack>
        </Stack>
      </Card>

      <CuTextModal
        open={isConfirmOpen}
        onClose={closeConfirmModel}
        title={'팀 정보 수정'}
        content={'팀 정보 수정하시겠습니까?'}
        containedButton={{
          text: '수정',
          onClick: onSubmit,
        }}
        textButton={{
          text: '취소',
          onClick: closeConfirmModel,
        }}
      />

      <CuTextModal
        open={isOpen}
        onClose={closeModal}
        title={'팀 로고 삭제'}
        content={'로고을 삭제하시겠습니까?'}
        containedButton={{
          text: '삭제',
          onClick: deleteImage,
        }}
        textButton={{
          text: '취소',
          onClick: closeModal,
        }}
      />

      <CuToast open={isOpenToast} onClose={closeToast} severity={toastSeverity}>
        {message}
      </CuToast>
    </>
  )
}

export default SetupInfo
