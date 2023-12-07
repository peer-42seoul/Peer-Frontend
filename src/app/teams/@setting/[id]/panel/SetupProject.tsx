import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { validation, validationNumber } from './utils'
import SetupSelect from './SetupSelect'
import { ISetupTeam } from './SetupTeam'

const SetupProject = ({ teamInfo }: { teamInfo: ISetupTeam }) => {
  return (
    <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
      <Box sx={{ border: '1px solid', borderRadius: 2, m: 1, p: 2 }}>
        <Stack>
          <Typography>스터디</Typography>
          <Stack direction="row" justifyContent={'space-between'}>
            <Typography>스터디명: {teamInfo.name}</Typography>

            <TextField
              id="outlined-basic"
              label={`스터디 이름`}
              variant="outlined"
              value={teamInfo.name}
              maxRows={1}
              size="small"
              onChange={handleTeamName}
              error={validation(teamInfo.name)}
              helperText={validation(teamInfo.name) ? '다시 입력' : ''}
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Stack>
          <Box>
            <Box
              width={[56, 100]}
              height={[56, 100]}
              sx={{ position: 'relative' }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '0',
                  right: '6px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50px',
                  borderColor: 'lightgray',
                  border: '1px',
                  padding: '4px',
                  backgroundColor: 'white',
                  zIndex: '9999',
                }}
                onClick={openModal}
              >
                <ClearIcon />
              </IconButton>
              <Button
                component="label"
                sx={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <Avatar
                  variant="rounded"
                  src={
                    teamInfo.teamImage
                      ? teamInfo.teamImage
                      : '/images/teamLogo.png'
                  }
                  alt="teamLogo"
                  sx={{ width: 100, height: 100 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '0',
                    right: '6px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50px',
                    borderColor: 'lightgray',
                    border: '1px',
                    padding: '4px',
                    backgroundColor: 'white',
                  }}
                >
                  <PhotoCameraOutlinedIcon />
                </Box>
                <input
                  type="file"
                  accept={'image/*'}
                  style={{ display: 'none' }}
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImage}
                />
              </Button>
            </Box>
          </Box>
        </Stack>
        <Stack>
          <Typography>목표 기간: </Typography>
          <SetupSelect
            type="dueTo"
            value={teamInfo.dueTo}
            setValue={handleDate}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>활동 방식: </Typography>
          <SetupSelect
            type="operationForm"
            value={teamInfo.operationForm}
            setValue={handleOperationForm}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Typography>팀 활동 지역: </Typography>
          <Stack direction="row" spacing={1}>
            <SetupSelect
              type="location"
              value={teamInfo.region[0]}
              setValue={handleLocation1}
            />
            <SetupSelect
              type="location"
              parentLocation={teamInfo.region[0]}
              value={teamInfo.region[1]}
              setValue={handleLocation2}
            />
          </Stack>
        </Stack>
        <Stack>
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
              validationNumber(teamInfo.maxMember as string) ? '다시 입력' : ''
            }
            inputProps={{
              style: {
                padding: 5,
              },
            }}
          />
        </Stack>
      </Box>
      <Button onClick={openConfirmModel}>팀 설정</Button>
    </Box>
  )
}

export default SetupProject
