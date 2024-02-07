import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { PieClearIcon } from '../Icons'
import { Control, Controller } from 'react-hook-form'
import { dueList } from '../SettingSelect'
import { ISetupTeam } from '../SettingTeamInfo'
import useMedia from '@/hook/useMedia'

interface ISettingTeamTime {
  teamTime: string
  control: Control<ISetupTeam, any>
}

const SettingTeamTime = ({ teamTime, control }: ISettingTeamTime) => {
  const isPc = useMedia()
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      mx={!isPc ? '0.5rem' : ''}
      mb={'1.2rem'}
      spacing={'0.5rem'}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
        <PieClearIcon />
        <Typography textOverflow={'ellipsis'} variant="Body2Emphasis">
          목표기간
        </Typography>
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
              minWidth: '5rem',
            }}
            {...field}
          >
            {dueList.map((dueTo) => (
              <MenuItem key={dueTo} value={dueTo}>
                <Typography variant="Body2">{dueTo}</Typography>
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Stack>
  )
}

export default SettingTeamTime
