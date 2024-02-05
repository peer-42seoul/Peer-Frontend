import { AlertColor, Box, Button, Card, Stack, Typography } from '@mui/material'
import { validation, validationNumber } from './utils'
import { useEffect, useRef, useState } from 'react'
import useModal from '@/hook/useModal'
import {
  TeamOperationForm,
  TeamStatus,
  TeamType,
} from '@/app/teams/types/types'
import useAxiosWithAuth from '@/api/config'

import { useForm } from 'react-hook-form'
import * as styles from './styles'

import useMedia from '@/hook/useMedia'
import useToast from '@/hook/useToast'
import CuTextModal from '@/components/CuTextModal'
import TeamQuitButton from './TeamEndProcess/TeamQuitButton'
import TeamDisperseButton from './TeamEndProcess/TeamDisperseButton'
import TeamCompleteButton from './TeamEndProcess/TeamCompleteButton'
import SettingTeamLogo from './TeamInfoProcess/SettingTeamLogo'
import SettingTeamName from './TeamInfoProcess/SettingTeamName'
import SettingTeamStatus from './TeamInfoProcess/SettingTeamStatus'
import SettingTeamTime from './TeamInfoProcess/SettingTeamTime'
import SettingTeamActivity from './TeamInfoProcess/SettingTeamActivity'
import SettingTeamLocation from './TeamInfoProcess/SettingTeamLocation'
import Tutorial from '@/components/Tutorial'
import TeamStatusTutorial from '@/components/tutorialContent/TeamStatusTutorial'
import TeamEndingTutorial from '@/components/tutorialContent/TeamEndingTutorial'

export interface ISetupTeam {
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

const layoutPcBox = {
  m: '0.5rem',
  p: '0.5rem',
}

const SettingTeamJobs = ({ team }: { team: ISetupTeam }) => {
  const { isPc } = useMedia()
  const [message, setMessage] = useState<string>('')
  const [toastSeverity, setToastSeverity] = useState<AlertColor>('info')
  const { CuToast, isOpen: isOpenToast, openToast, closeToast } = useToast()
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
          location.reload()
        } else {
          console.log('서버에 저장 실패')
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        closeConfirmModel()
      })
  })

  const handleOpenToast = (message: string, severity: AlertColor) => {
    setMessage(message)
    setToastSeverity(severity)
    openToast()
  }

  useEffect(() => {
    if (watchAllFields) setIsEdit(true)
  }, [watchAllFields])

  // useEffect(() => {
  //   window.history.pushState(null, '', location.href)

  //   console.log('status', team.status)

  //   window.onpopstate = () => {
  //     if (isEdit === true) {
  //       console.log("You can't go back")
  //       history.go(1)

  //       alert('팀 정보 수정을 완료해주세요.')
  //     }
  //   }
  // }, [isEdit])

  return (
    <>
      <Card sx={{ p: '1.5rem', borderRadius: '1rem' }}>
        <Stack direction={'row'} display={'flex'} alignItems={'center'}>
          <Typography fontWeight="bold">팀 상태</Typography>
          <Tutorial content={<TeamStatusTutorial />} />
        </Stack>
        <form ref={sendRef} onSubmit={onSubmit}>
          <Box sx={isPc ? layoutPcBox : {}}>
            <Stack
              direction={isPc ? 'row' : 'column'}
              alignItems={isPc ? 'center' : ''}
            >
              <SettingTeamLogo
                teamLogoImage={team.teamImage ? team.teamImage : ''}
                setValue={setValue}
              />
              <Stack>
                <SettingTeamName
                  teamType={team.type}
                  errors={errors}
                  register={register}
                />
                <SettingTeamStatus teamStatus={team.status} control={control} />
                <SettingTeamTime teamTime={team.dueTo} control={control} />
                <SettingTeamActivity
                  teamActivity={team.operationForm}
                  control={control}
                />
                <SettingTeamLocation
                  teamLocation={team.region}
                  control={control}
                />
              </Stack>
            </Stack>
          </Box>
        </form>

        <Stack spacing={'0.4rem'}>
          <Stack
            py={!isPc ? '1rem' : '0.25rem'}
            display={'flex'}
            flexDirection={'row-reverse'}
          >
            <Tutorial content={<TeamEndingTutorial />} />
            <Button
              disabled={team.status === TeamStatus.COMPLETE ? true : false}
              sx={styles.SaveButtonStyle}
              variant="contained"
              type="button"
              onClick={openConfirmModel}
            >
              <Typography>저장</Typography>
            </Button>
          </Stack>
          <TeamQuitButton teamStatus={team.status} teamId={team.id} />
          <TeamDisperseButton teamStatus={team.status} teamId={team.id} />
          <TeamCompleteButton teamStatus={team.status} teamId={team.id} />
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

      <CuToast open={isOpenToast} onClose={closeToast} severity={toastSeverity}>
        {message}
      </CuToast>
    </>
  )
}

export default SettingTeamJobs
