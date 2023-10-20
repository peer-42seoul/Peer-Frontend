import { defaultGetFetcher } from "@/api/fetchers";
import { IUserProfile } from "@/types/IUserProfile";
import { Avatar, Stack, Typography } from "@mui/material";
import useSWR from "swr";

const MainProfile = () => {
    const { data } = useSWR<IUserProfile>('http://localhost:4000/profile/1', defaultGetFetcher);
    return (
        <Stack height="150px" alignItems="center" border="1px solid black">
            <Avatar alt="avatar" src={data?.profileImageUrl} sx={{ width: 56, height: 56 }} />
            <Typography>{data?.nickname}</Typography>
            <Typography>{data?.association}</Typography>
            {/* 업적은 2step이라 주석처리 */}
            {/* <Stack direction="row">
                <Avatar alt="avatar" src="" />
                <Stack>
                    <Typography>업적명</Typography>
                    <Typography>이 업적의 상세 설명입니다</Typography>
                </Stack>
            </Stack> */}
        </Stack>
    )
}
export default MainProfile;