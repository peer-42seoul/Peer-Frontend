import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MainCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider
            {...settings}
        >
            <Box height={'100px'} bgcolor={'green'}>
                <h3>배너 1</h3>
            </Box>
            <Box height={'100px'} bgcolor={'green'}>
                <h3>배너 2</h3>
            </Box>
            <Box height={'100px'} bgcolor={'green'}>
                <h3>배너3</h3>
            </Box>
        </Slider>)
}


export default MainCarousel;