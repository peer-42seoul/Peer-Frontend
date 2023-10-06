import { Avatar, Stack, Typography } from "@mui/material";

const MainProfile = () => {
    return (
        <Stack bgcolor="purple" height="150px" alignItems="center">
            <Avatar alt="avatar" src="" sx={{ width: 56, height: 56 }} />
            <Typography>김피어</Typography>
            <Typography>42서울</Typography>
            <Stack direction="row">
                <Avatar alt="avatar" src="" />
                <Stack>
                    <Typography>업적명</Typography>
                    <Typography>이 업적의 상세 설명입니다</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default MainProfile;