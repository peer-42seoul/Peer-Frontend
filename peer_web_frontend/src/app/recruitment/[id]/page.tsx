'use client'

import { defaultGetFetcher } from "@/api/fetchers"
import { Box, Typography, TextField, Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { title } from "process"
import useSWR from "swr"
import BasicSelect, { ComponentType } from "../panel/BasicSelect"
import SetCommunicationToolLink from "../panel/SetCommunicationToolLink/SetCommunicationToolLink"
import SetInterview from "../panel/SetInterview/SetInterview"
import SetTeamRole from "../panel/SetTeamRole/SetTeamRole"
import TagAutoComplete from "../panel/SetTeamTag/TagAutoComplete"
import SetWorkWeekend from "../panel/SetWorkWeekend/SetWorkWeekend"
import RowRadioButtonsGroup from "../panel/radioGroup"

//이후 ssr 개선 필요
const RecruitDetailPage = () => {
    // const router = useRouter()
    //id에 따라 값 가져오기
    // const { data, isLoading, mutate } = useSWR(
    //     `${process.env.NEXT_PUBLIC_API_URL}api/v1/recruitment/${router.query.id}`,
    //     defaultGetFetcher,
    // )
    return (<>
        <Box>
            <Typography variant="h3">모집 글</Typography>
            <Box>
                <Typography variant="h6">팀 제목</Typography>
                <Typography>팀 제목 내용</Typography>
            </Box>
            <Box>
                <Typography variant="h6">팀 분류</Typography>
                <RowRadioButtonsGroup value="study" />
            </Box>
            {/* <Box>
                    <Typography variant="h6">팀 인원</Typography>
                    <BasicSelect
                        type={ComponentType.TeamSize}
                        value={teamsize}
                        setValue={setTeamsize}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">목표기간</Typography>
                    <BasicSelect
                        type={ComponentType.Month}
                        value={month}
                        setValue={setMonth}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">지역</Typography>
                    <BasicSelect
                        type={ComponentType.Area}
                        value={area}
                        setValue={setArea}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
                    <SetCommunicationToolLink setValue={setCommunicationTool} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="h6" sx={{ paddingRight: '5px' }}>
                        모집인원 인터뷰 등록하기
                    </Typography>
                    <Button variant="outlined" onClick={handleOpenBasicModal}>
                        등록
                    </Button>
                    <SetInterview
                        openBasicModal={openBasicModal}
                        handleCloseBasicModal={handleCloseBasicModal}
                    />
                </Box>
                <Box>
                    <Typography variant="h6">태그</Typography>
                    <TagAutoComplete datas={tagData} setData={setTagData} />
                </Box>
                <Box>
                    <SetWorkWeekend
                        setWeekendCheckedState={setWeekendCheckedState}
                        WeekendCheckedState={WeekendCheckedState}
                    />
                </Box>
                {teamType === 'study' ? null : (
                    <Box>
                        <Typography variant="h6">팀 역할</Typography>
                        <SetTeamRole roleData={roleData} setRoleData={setRoleData} />
                    </Box>
                )}
                <Box>
                    <Typography variant="h6">팀 소개</Typography>
                    <TextField
                        variant="outlined"
                        sx={{ width: '80vw', height: 'auto' }}
                        onChange={handleChangeIntroduction}
                        multiline
                    />
                </Box> */}
            <Button variant="contained" color="success">
                작성 완료
            </Button>
        </Box>
    </>)
}

export default RecruitDetailPage;