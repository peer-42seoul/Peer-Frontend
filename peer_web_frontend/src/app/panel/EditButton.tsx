import { Edit } from "@mui/icons-material"
import { Fab } from "@mui/material"

const EditButton = () => {
    return (<Fab color="secondary" aria-label="edit" >
        {/* <Link href={"글쓰기 페이지로"}>*/}
        <Edit />
        {/* </Link> */}
    </Fab>)
}

export default EditButton;