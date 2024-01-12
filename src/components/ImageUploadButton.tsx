import { Button } from '@mui/material'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
// import { UseFormRegisterReturn } from 'react-hook-form'

// setImage를 react-hook-form의 setValue 사용시 setImage를 다음과 같이 넣어주세요
// const setImage = (image: file) => setValue('name', image)

// TODO js doc 사용 법 알기
/*
  children : 버튼 안에 다른 것을 넣고 싶을 때 넣습니다.
  accept : 파일 타입을 다르게 제한하고 싶을 때 씁니다. default로 이미지만 받도록 해두었습니다
  id : id
  setImage : 이미지 파일을 저장할 때 쓰는 함수입니다.
  setPreviewImage : 이미지를 URL로 반환해 저장하는 함수입니다.
  onChange : url로 변환 이후 작동해야할 로직이 있다면 onChange에 넣습니다.
  register : react-hook-form 등록용 입니다.
*/

/**
 * 이미지 업로드 버튼
 * @param {React.ReactNode} children 버튼 안에 다른 것을 넣고 싶을 때 넣습니다.
 * @param {string} accept 파일 타입을 다르게 제한하고 싶을 때 씁니다. default로 이미지만 받도록 해두었습니다
 * @param {string} id id
 * @param {(image: File[]) => void} setImage 이미지 파일을 저장할 때 쓰는 함수입니다.
 * @param {(imageUrl: string) => void} setPreviewImage 이미지를 URL로 반환해 저장하는 함수입니다.
 * @param {() => void} onChange url로 변환 이후 작동해야할 로직이 있다면 onChange에 넣습니다.
 * @param {UseFormRegisterReturn} register react-hook-form 등록용 입니다.
 * @returns
 */
const ImageUploadButton = ({
  children,
  accept = 'image/jpeg, image/jpg, image/png',
  id,
  setImage,
  setPreviewImage,
  onChange,
  register,
}: {
  children?: React.ReactNode
  accept?: string
  id?: string
  setImage: (image: File[]) => void
  setPreviewImage: (imageUrl: string) => void
  onChange?: () => void
  register?: UseFormRegisterReturn
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (e.target.files && e.target.files?.length && e.target.files[0]) {
      const reader = new FileReader()
      setImage([e.target.files[0]])
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
        onChange && onChange()
      }
      if (file) reader.readAsDataURL(file)
    }
  }
  return (
    <Button component="label" sx={{ padding: 0 }}>
      {children}
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        id={id}
        name={id}
        onChange={handleImageChange}
        {...register}
      />
    </Button>
  )
}

export default ImageUploadButton
