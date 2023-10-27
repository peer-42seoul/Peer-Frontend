import CuModal from "@/components/CuModal";
import { Box, Typography, Button } from "@mui/material";
import { Dispatch } from "react";

const ConfirmModal = ({ open, setOpen, submitForm }: { open: boolean, setOpen: Dispatch<React.SetStateAction<boolean>>, submitForm: () => void }) => {
    return (<CuModal
        open={open}
        handleClose={() => setOpen(false)}
        ariaTitle="modal-title"
        ariaDescription="modal-description"
    >
        <Box>
            <Typography variant="h4" id="modal-title">지원서 제출</Typography>
            <Typography id="modal-description">
                지원서를 제출하시겠습니까?
            </Typography>
            <Box>
                <Button onClick={() => setOpen(false)}>취소</Button>
                <Button onClick={() => submitForm()}>확인</Button>
            </Box>
        </Box>
    </CuModal >)
}

export default ConfirmModal;