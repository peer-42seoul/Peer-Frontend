'use client'
import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import ImageInput from '../panel/common/ImageInput'
import TeamName from '../panel/common/TeamName'
import SkillInput from '../panel/common/SkillInput'
import LinkForm from '../panel/common/LinkForm'
import useToast from '@/hook/useToast'
import useModal from '@/hook/useModal'
import CuTextModal from '@/components/CuTextModal'
import useAxiosWithAuth from '@/api/config'
import StartEndDateViewer from '../panel/common/StartEndDateViewer'
import TeamMembers from '../panel/common/TeamMembers'
import dynamic from 'next/dynamic'
import * as style from './ShowcaseEditor.style'
import { useLinks } from '@/hook/useLinks'
import useShowCaseState from '@/states/useShowCaseState'
import { useRouter } from 'next/navigation'

interface IShowcaseEditorProps {
  data: IShowcaseEditorFields // IShowcase 타입을 import 해야 합니다.
  teamId: number
  requestMethodType: 'post' | 'put'
  router: any | undefined
}

const DynamicEditor = dynamic(() => import('../panel/common/FormUIEditor'), {
  ssr: false,
})

const ShowcaseEditor = ({
  data,
  teamId,
  requestMethodType,
}: IShowcaseEditorProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [errorMessages, setErrorMessages] = useState<string>('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  const { links, addLink, isValid, setIsValid, changeLinkName, changeUrl } =
    useLinks([])
  const { content } = useShowCaseState()
  const router = useRouter()
  const submitHandler = async () => {
    const linksWithoutId = links.map(({ ...rest }) => rest)
    if (!isValid) {
      return
    }
    try {
      if (requestMethodType === 'post') {
        const response = await axiosWithAuth.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/write`,
          {
            image: previewImage.split(',')[1],
            content: content,
            teamId: teamId,
            links: linksWithoutId,
          },
        )
        router.push(`/showcase/${response.data.get('id')}`) // next 13에서 redirect 하는 법
      } else if (requestMethodType === 'put') {
        const response = await axiosWithAuth.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/edit/${teamId}}`,
          {
            image: previewImage.split(',')[1],
            content: content,
            teamId: teamId,
            links: linksWithoutId,
          },
        )
        router.push(`/showcase/${response.data.get('id')}`)
      }
    } catch (error: any) {
      if (error.response) {
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
  }

  return (
    <form id="showcase-form">
      <Stack direction={'column'} spacing={'2.5rem'} sx={{ width: '26rem' }}>
        <ImageInput
          previewImage={previewImage}
          image={image}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
        />
        <TeamName teamName={data.name} />
        <SkillInput skills={data.skills} />
        <StartEndDateViewer start={data.start} end={data.end} />
        <TeamMembers
          members={
            'memberList' in data ? data.memberList || [] : data.member || []
          }
        />
        <LinkForm
          links={links}
          addLink={addLink}
          isValid={isValid}
          setIsValid={setIsValid}
          changeLinkName={changeLinkName}
          changeUrl={changeUrl}
        />
        <DynamicEditor content={data.content} />
        <Button onClick={openModal} sx={style.saveButton}>
          저장
        </Button>
        <CuToast
          open={isOpen}
          onClose={closeToast}
          severity="error"
          message={errorMessages}
        />
        <CuTextModal
          open={alertOpen}
          onClose={closeModal}
          title={'경고'}
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
