import { Stack, TextField, Typography } from '@mui/material'
import { PencilClearIcon } from '../Icons'
import { TeamType } from '@/app/teams/types/types'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ISetupTeam } from '../SettingTeamInfo'

interface ISettingTeamName {
  teamType: TeamType
  errors: FieldErrors<ISetupTeam>
  register: UseFormRegister<ISetupTeam>
}

const SettingTeamName = ({ teamType, errors, register }: ISettingTeamName) => {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
      <PencilClearIcon />
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'0.5rem'}
        height={'4.5rem'}
      >
        {teamType === TeamType.PROJECT && <Typography>프로젝트명</Typography>}
        {teamType === TeamType.STUDY && <Typography>스터디명</Typography>}

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
  )
}

export default SettingTeamName
