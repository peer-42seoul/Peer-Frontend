import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import Typography from '@mui/material/Typography'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

import { ISignUpInputs } from '@/types/ISignUpInputs'

const NameField = ({
  field,
  error,
}: {
  field: ControllerRenderProps<ISignUpInputs, 'name'>
  error: FieldError | undefined
}) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="name" >
       <Typography variant="Caption">이름</Typography>
        </CuTextFieldLabel>
      <CuTextField
        {...field}
        autoComplete="name"
        error={false}
        type="text"
        placeholder="이름을 입력하세요."
        inputProps={{
          maxLength: 5,
        }}
        sx={{ width: '100%' }}
      />
      <Typography color="error" variant="Caption">
        {error?.message || '\u00A0'}
      </Typography>
    </>
  )
}

export default NameField
