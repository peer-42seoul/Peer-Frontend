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
import axios, { AxiosError } from 'axios'
import useToast from '@/hook/useToast'
import { redirect } from 'next/navigation'
import useSWR from 'swr'
import { defaultGetFetcher } from '@/api/fetchers'
import { AlertModal } from '@/app/my-page/interests/page'
import useModal from '@/hook/useModal'
import CuTextModal from '@/components/CuTextModal'

const teamId = 42
const ShowcaseEditor = () => {
  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/${teamId}`,
    defaultGetFetcher,
  )

  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>('')
  const [text, setText] = useState<string>('')
  const { content } = useShowCaseState()
  const [errorMessages, setErrorMessages] = useState<string>('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  // const [alertOpen, setAlertOpen] = useState(false)

  // 1. 아무것도 안 보내면 기본 이미지 적용. 그러나 저장 이전에 한 번 더 물음

  const defaultValues: IShowcaseEditorFields = {
    image: null,
    tags: data?.skills ? data.skills : [],
    startDate: data?.start ? data.start : '',
    endDate: data?.end ? data.end : '',
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

  const submitHandler = async () => {
    // if (!previewImage) {
    //   openModal()
    //   return
    // }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/write`,
        {
          image: 'previewImage',
          content: 'content',
          teamId: 'value3',
        },
      )
      console.log(`/api/showcase response : ${response}`)
      redirect(`/showcase/${response.data.get('id')}`) // next 13에서 redirect 하는 법
    } catch (error: any) {
      console.log(`/api/showcase error ${error}`)
      if (error.response) {
        // 서버에서 응답을 받은 경우
        switch (error.response.status) {
          case 400:
            setErrorMessages('요청이 올바르지 않습니다. (BAD_REQUEST)')
            openToast()
            break
          case 403:
            setErrorMessages('접근이 거부되었습니다. (FORBIDDEN)')
            openToast()
            break
          case 404:
            setErrorMessages('페이지를 찾을 수 없습니다. (NOT_FOUND)')
            openToast()
            break
          default:
            setErrorMessages('알 수 없는 에러가 발생했습니다.')
            openToast()
            break
        }
      } else if (error.request) {
        setErrorMessages('서버에서 응답이 없습니다.')
      } else {
        setErrorMessages('요청을 설정하는 중에 에러가 발생했습니다.')
      }
    }
    alert(`image : ${previewImage}, content : ${text}, teamId : ${content}`)
  }

  // if (isLoading) return <div>로딩중</div>
  // if (error) return <div>에러</div>
  return (
    <form>
      <Stack direction={'column'} spacing={'2.5rem'} sx={{ width: '26rem' }}>
        <ImageInput
          previewImage={previewImage}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
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
        <Button onClick={openModal}>저장</Button>
        <CuToast
          open={isOpen}
          onClose={closeToast}
          severity="error"
          message={errorMessages}
        />
        <CuTextModal
          open={alertOpen}
          onClose={closeModal}
          title={'삭제'}
          content={'대표 이미지를 등록하지 않으면 기본 이미지로 저장됩니다.'}
          containedButton={{
            text: '전송',
            onClick: submitHandler,
          }}
          textButton={{
            text: '취소',
            onClick: closeModal,
          }}
        />
      </Stack>
    </form>
  )
}
export default ShowcaseEditor
