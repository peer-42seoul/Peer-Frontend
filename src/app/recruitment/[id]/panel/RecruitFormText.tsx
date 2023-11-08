import { Typography } from "@mui/material";

const RecruitFormText = ({ label, content, children }: { label: string, content?: string | string[], children?: React.ReactNode }) => (
    <>
        <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
        {content && <Typography>{content}</Typography>}
        {children && children}
    </>
)

export default RecruitFormText;