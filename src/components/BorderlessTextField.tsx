import { styled } from '@mui/material'
import CuTextField from './CuTextField'
import * as style from './BorderlessTextField.style'

const BorderlessTextField = styled(CuTextField)(style.removeBorder)

export default BorderlessTextField
