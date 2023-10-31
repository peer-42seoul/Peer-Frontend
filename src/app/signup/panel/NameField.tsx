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
      <CuTextFieldLabel htmlFor="name">이름</CuTextFieldLabel>
      <CuTextField
        field={field}
        autoComplete="off"
        error={false}
        type="text"
        placeholder="이름을 입력하세요"
        inputProps={{
          maxLength: 5,
        }}
      />
      {(error && <Typography color="error">{error.message}</Typography>) || (
        <Typography>&nbsp;</Typography>
      )}
    </>
  )
}

export default NameField
