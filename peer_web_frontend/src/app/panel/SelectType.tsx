import { Button, ButtonGroup } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ProjectType } from "../page";

const SelectType = ({ setType }: { setType: Dispatch<SetStateAction<ProjectType>> }) => {
    return (<ButtonGroup
        variant="contained"
        aria-label="study or project button"
        fullWidth
        sx={{
            justifyContent: 'space-evenly',
            border: 'none',
        }}
    >
        {/* type에 따라 다른 내용 보여주는 것 처리 필요. get해올때 처리될듯*/}
        <Button onClick={() => { setType('study') }}>스터디</Button>
        <Button onClick={() => { setType('project') }}>프로젝트</Button>
    </ButtonGroup>)
}

export default SelectType;