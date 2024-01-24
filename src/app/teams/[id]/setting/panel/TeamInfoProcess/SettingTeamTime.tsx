import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { PieClearIcon } from '../Icons'
import { Control, Controller } from 'react-hook-form'
import { dueList } from '../SettingSelect'
import { ISetupTeam } from '../SettingTeamInfo'

interface ISettingTeamTime {
  teamTime: string
  control: Control<ISetupTeam, any>
}

const SettingTeamTime = ({ teamTime, control }: ISettingTeamTime) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      mb={'1.2rem'}
      mx={'0.5rem'}
      spacing={'0.5rem'}
    >
      <Stack direction={'row'} alignItems={'flex-start'} spacing={'0.25rem'}>
        <PieClearIcon />
        <Typography textOverflow={'ellipsis'}>목표기간</Typography>
      </Stack>

      <Controller
        name="dueTo"
        control={control}
        defaultValue={teamTime}
        render={({ field }) => (
          <Select
            size="small"
            defaultValue={teamTime}
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
  )
}

export default SettingTeamTime
