import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { TargetClearIcon } from '../Icons'
import { Control, Controller } from 'react-hook-form'
import { TeamStatus } from '@/app/teams/types/types'
import { ISetupTeam } from '../SettingTeamInfo'
import useMedia from '@/hook/useMedia'

interface ISettingTeamStatus {
  teamStatus: TeamStatus
  control: Control<ISetupTeam, any>
}

const SettingTeamStatus = ({ teamStatus, control }: ISettingTeamStatus) => {
  const { isPc } = useMedia()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      mx={isPc ? '0.5rem' : ''}
      mb={'1.2rem'}
      spacing={'0.25rem'}
    >
      <TargetClearIcon />
      <Stack direction={'row'} alignItems={'center'} spacing={'0.5rem'}>
        <Typography>상태</Typography>
        <Controller
          name="status"
          control={control}
          defaultValue={teamStatus}
          render={({ field }) => (
            <Select
              disabled={teamStatus === TeamStatus.COMPLETE ? true : false}
              size="small"
              sx={{ m: 0 }}
              defaultValue={teamStatus}
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
  )
}

export default SettingTeamStatus
