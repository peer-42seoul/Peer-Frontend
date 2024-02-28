import { Stack, TextField, Typography } from '@mui/material'
import { PencilClearIcon } from '../Icons'
import { TeamStatus, TeamType } from '@/app/teams/types/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ISetupTeam } from '../SettingTeamInfo'

interface ISettingTeamName {
  teamStatus: TeamStatus
  teamType: TeamType
  errors: FieldErrors<ISetupTeam>
  register: UseFormRegister<ISetupTeam>
}

const SettingTeamName = ({
  teamStatus,
  teamType,
  errors,
  register,
}: ISettingTeamName) => {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
      <PencilClearIcon />
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'0.5rem'}
        height={'4.5rem'}
      >
        {teamType === TeamType.PROJECT && (
          <Typography variant="Body2Emphasis">프로젝트명</Typography>
        )}
        {teamType === TeamType.STUDY && (
          <Typography variant="Body2Emphasis">스터디명</Typography>
        )}

        <TextField
          disabled={teamStatus === TeamStatus.COMPLETE}
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
            maxLength: 40,
            minLength: {
              value: 2,
              message: '2글자 이상 입력해주세요.',
            },
          })}
          type="text"
          variant="outlined"
          sx={{
            width: '10rem',
          }}
        />
      </Stack>
    </Stack>
  )
}

export default SettingTeamName
