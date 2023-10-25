import CuTextField from '@/components/CuTextField'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'

const NameField = ({ field }: { field: any }) => {
  return (
    <>
      <CuTextFieldLabel htmlFor="이름">이름</CuTextFieldLabel>
      <CuTextField
        field={field}
        defaultValue=""
        autoComplete="off"
        error={false}
        type="text"
        placeholder="이름을 입력하세요"
        inputProps={{
          maxLength: 5,
        }}
      />
    </>
  )
}

export default NameField
