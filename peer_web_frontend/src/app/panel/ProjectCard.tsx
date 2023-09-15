import { Favorite } from "@mui/icons-material"
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Chip, IconButton, Typography } from "@mui/material"
import { red } from "@mui/material/colors"


const ProjectCard = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
            />
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="add to favorites">
                        <Favorite />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
                <Box>
                    <Chip label="프레임워크" size="small" />
                    <Chip label="개발언어1" size="small" />
                    <Chip label="개발언어2" size="small" />
                    <Chip label="개발언어3" size="small" />
                </Box>
            </CardContent>
        </Card >)
}

export default ProjectCard;