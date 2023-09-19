import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";

const Option = () => {
    return (<Box>세부 옵션입니다</Box>)
}

const SearchOption = ({ openOption, setOpenOption }: { openOption: boolean, setOpenOption: any }) => {
    return (
        <>
            <Grid item xs={8}>
                <Stack justifyContent={"center"}>
                    <Typography variant="body2">맞춤 프로젝트를 빠르게 찾아요.</Typography>
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="row" alignItems={"center"} justifyContent={"flex-end"} onClick={() => { setOpenOption(!openOption) }}>
                    <Typography variant="body2">세부 옵션</Typography>
                    <IconButton>
                        {openOption ? <ArrowDropDown /> : <ArrowDropUp />}
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                {openOption && <Option />}
            </Grid>
        </>
    )
}

export default SearchOption;