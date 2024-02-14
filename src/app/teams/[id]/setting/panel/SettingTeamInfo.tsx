import { Box, Button, Stack, Typography, Card } from '@mui/material'
import { useRef, useState } from 'react'
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
import useToast from '@/states/useToast'
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

interface ISettingTeamJobs {
  team: ISetupTeam
  mutate: () => void
}

const SettingTeamJobs = ({ team, mutate }: ISettingTeamJobs) => {
  const { isTablet, isPc } = useMedia()
  const {
    isOpen: isConfirmOpen,
    openModal: openConfirmModel,
    closeModal: closeConfirmModel,
  } = useModal()
  const sendRef = useRef<HTMLFormElement>(null)
  const axiosWithAuth = useAxiosWithAuth()
  const { openToast } = useToast()
  const [isLogoEdit, setIsLogoEdit] = useState(false)

  const {
    register,
    setValue,
    formState: { errors, isDirty },
    control,
    watch,
  } = useForm<ISetupTeam>({
    defaultValues: team,
    mode: 'onChange',
  })

  const region = watch('region')
  const name = watch('name')
  const dueTo = watch('dueTo')
  const operationForm = watch('operationForm')
  const status = watch('status')
  const image = watch('teamImage')

  /**id: string
  type: TeamType
  name: string
  maxMember: String
  status: TeamStatus
  dueTo: string
  operationForm: TeamOperationForm
  region: string[]
  teamImage: string | null */

  const handleEditModal = () => {
    if (errors.name || errors.dueTo || errors.operationForm)
      return openToast({
        severity: 'error',
        message: '팀 정보를 확인해주세요.',
      })

    if (operationForm !== TeamOperationForm.ONLINE && region.length === 0) {
      openToast({
        severity: 'error',
        message: '활동지역을 선택해주세요.',
      })
      return
    }

    if (isDirty === false && isLogoEdit === false) {
      return openToast({
        severity: 'error',
        message: '변경된 사항이 없습니다.',
      })
    }
    openConfirmModel()
  }

  const onSubmit = () => {
    const data: ISetupTeam = {
      id: team.id,
      type: team.type,
      name: name,
      maxMember: team.maxMember,
      status: status,
      dueTo: dueTo,
      operationForm: operationForm,
      region: region,
      teamImage: image,
    }
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_CSR_API}/api/v1/team/setting/${team.id}`,
        data,
      )
      .then((res) => {
        if (res.status == 200) {
          mutate()
          openToast({
            severity: 'success',
            message: '팀 정보 수정이 완료되었습니다.',
          })
        } else {
          openToast({
            severity: 'error',
            message: '팀 정보 수정에 실패하였습니다.',
          })
        }
      })
      .catch(() => {
        openToast({
          severity: 'error',
          message: '팀 정보 수정에 실패하였습니다.',
        })
      })
      .finally(() => {
        closeConfirmModel()
      })
  }

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
      <Card
        sx={{
          p: '1.5rem',
          borderRadius: '1rem',
          backgroundColor: 'background.secondary',
          backgroundImage: 'none',
        }}
      >
        <Stack direction={'row'} display={'flex'} alignItems={'center'}>
          <Typography variant="Body2Emphasis">팀 상태</Typography>
          <Tutorial title={'팀 설정 페이지'} content={<TeamStatusTutorial />} />
        </Stack>
        <form ref={sendRef} onSubmit={onSubmit}>
          <Box>
            <Stack
              direction={!isPc || isTablet ? 'column' : 'row'}
              alignItems={isPc ? 'center' : ''}
              justifyContent={!isPc || isTablet ? '' : 'space-evenly'}
            >
              <SettingTeamLogo
                teamLogoImage={team.teamImage ? team.teamImage : ''}
                teamStatus={status}
                setValue={setValue}
                setIsLogoEdit={setIsLogoEdit}
              />
              <Stack>
                <SettingTeamName
                  teamType={team.type}
                  teamStatus={status}
                  errors={errors}
                  register={register}
                />
                <SettingTeamStatus teamStatus={status} control={control} />
                <SettingTeamTime
                  teamTime={dueTo}
                  teamStatus={status}
                  control={control}
                />
                <SettingTeamActivity
                  teamStatus={status}
                  teamActivity={operationForm}
                  control={control}
                />
                <SettingTeamLocation
                  teamStatus={status}
                  teamLocation={region}
                  teamActivity={operationForm}
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
            <Button
              disabled={
                team.status === TeamStatus.COMPLETE ||
                (isDirty === false && isLogoEdit === false)
                  ? true
                  : false
              }
              sx={styles.SaveButtonStyle}
              variant="contained"
              type="button"
              onClick={handleEditModal}
            >
              <Typography variant="Body2">저장</Typography>
            </Button>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <Tutorial
              title={'팀 활동 종료하기'}
              content={<TeamEndingTutorial />}
            />
          </Stack>
          <TeamQuitButton teamStatus={team.status} teamId={team.id} />
          <TeamDisperseButton teamStatus={team.status} teamId={team.id} />
          <TeamCompleteButton
            teamStatus={team.status}
            teamId={team.id}
            mutate={mutate}
          />
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
    </>
  )
}

export default SettingTeamJobs
