import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ITeamInfo } from "../page";
import { TeamOperationForm } from "@/app/teams/@setting/[id]/page";

//icons
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import RoomIcon from "@mui/icons-material/Room";
import WifiIcon from "@mui/icons-material/Wifi";

const TeamsList = ({ prop }: { prop: ITeamInfo[] }) => {
  console.log(prop);
  const router = useRouter();

  return (
    <Stack
      spacing={1}
      sx={{ p: 1 }}
      flex={4}
      border="1px solid"
      borderRadius={2}
    >
      {prop.map((team, index) => (
        <Card
          key={index}
          sx={{
            p: 2,
            boxShadow: "none",
            border: "1px solid",
          }}
        >
          <CardActionArea onClick={() => router.push(`/teams/${team.id}`)}>
            {/* 기획상 문제로 임시로 주석처리 */}
            {/* {team.myRole && (
                <IconButton
                  sx={{ float: 'right' }}
                  onClick={() => router.push(`/teams/setup/${index}`)}
                >
                  <SettingsIcon />
                </IconButton>
              )}  */}
            <Stack direction={"row"} spacing={1} my={1}>
              <Box border="1px solid" width={60} sx={{ margin: 0 }}>
                <Typography textAlign={"center"}>
                  {team.type === "STUDY" ? "스터디" : "프로젝트"}
                </Typography>
              </Box>

              <Typography>{team.name}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Stack direction={"row"}>
                <TrackChangesIcon fontSize="small" />
                <Typography>목표 기간 {team.dueTo}</Typography>
              </Stack>
              <Stack direction={"row"}>
                <RoomIcon fontSize="small" />
                <Typography>지역 {team.region}</Typography>
              </Stack>
              <Stack direction={"row"}>
                <WifiIcon fontSize="small" />
                <Typography>
                  활동 방식{" "}
                  {team.operationFormat === TeamOperationForm.MIX
                    ? "온/오프라인"
                    : team.operationFormat === TeamOperationForm.OFFLINE
                      ? "오프라인"
                      : "온라인"}
                </Typography>
              </Stack>
            </Stack>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
};

export default TeamsList;
