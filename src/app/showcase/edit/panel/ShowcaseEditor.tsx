'use client'
import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import ImageInput from './formPanel/ImageInput'
import TeamName from './formPanel/TeamName'
import SkillInput from './formPanel/SkillInput'
import LinkForm from './formPanel/LinkForm'
import FormUIEditor from '../panel/formPanel/FormUIEditor'
import useShowCaseState from '@/states/useShowCaseState'

const ShowcaseEditor = () => {
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>('')
  const [text, setText] = useState<string>('')
  const { content } = useShowCaseState()

  const defaultValues: IShowcaseEditorFields = {
    image: null,
    tags: [],
    startDate: '',
    endDate: '',
    links: [{ id: 0, linkName: '', linkUrl: '' }],
    content: '',
  }
  const { control, setValue, watch } = useForm({
    defaultValues: defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  })

  const submitHandler = () => {
    console.log(`Cover : ${image}`)

    alert(`text : ${content} , Cover : ${previewImage}`)
  }
  return (
    <form>
      <Stack direction={'column'} spacing={'2.5rem'} sx={{ width: '26rem' }}>
        <ImageInput
          previewImage={previewImage}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
          // register={register}
          // setValue={setValue}
        />
        <TeamName />
        <SkillInput watch={watch} setValue={setValue} />
        <LinkForm
          fields={fields}
          append={append}
          remove={remove}
          control={control}
        />
        <FormUIEditor initialValue={text} setText={setText} />
        <Button onClick={submitHandler}>저장</Button>
      </Stack>
    </form>
  )
}

export default ShowcaseEditor
