'use client'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import {
  // useFieldArray,
  useForm,
} from 'react-hook-form'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import ImageInput from './formPanel/ImageInput'
import TeamName from './formPanel/TeamName'
import SkillInput from './formPanel/SkillInput'

const ShowcaseEditor = () => {
  const [previewImage, setPreviewImage] = useState<string>('')

  const defaultValues: IShowcaseEditorFields = {
    image: null,
    tags: [],
    startDate: '',
    endDate: '',
    links: [],
    content: '',
  }
  const {
    //  control,
    register,
    setValue,
    watch,
  } = useForm({
    defaultValues: defaultValues,
  })
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'links',
  // })

  return (
    <form>
      <Stack direction={'column'} spacing={'2.5rem'}>
        <ImageInput
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          register={register}
          setValue={setValue}
        />
        <TeamName />
        <SkillInput watch={watch} setValue={setValue} />
      </Stack>
    </form>
  )
}

export default ShowcaseEditor
