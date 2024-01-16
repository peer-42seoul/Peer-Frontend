'use client'
import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import ImageInput from './formPanel/ImageInput'
import TeamName from './formPanel/TeamName'
import SkillInput from './formPanel/SkillInput'
import LinkForm from './formPanel/LinkForm'
import useToast from '@/hook/useToast'
import { redirect } from 'next/navigation'
import useModal from '@/hook/useModal'
import CuTextModal from '@/components/CuTextModal'
import useAxiosWithAuth from '@/api/config'
import StartEndDateViewer from './formPanel/StartEndDateViewer'
import TeamMembers from './formPanel/TeamMembers'
import dynamic from 'next/dynamic'
import * as style from './test.style'
import { IUserProfileLink } from '@/types/IUserProfile'

interface IShowcaseEditorProps {
  data: IShowcaseEditorFields // IShowcase 타입을 import 해야 합니다.
}

const DynamicEditor = dynamic(() => import('../panel/formPanel/FormUIEditor'), {
  ssr: false,
})

const ShowcaseEditor = ({ data }: IShowcaseEditorProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [errorMessages, setErrorMessages] = useState<string>('')
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const { isOpen: alertOpen, closeModal, openModal } = useModal()

  const useLinks = (initValue: IUserProfileLink[]) => {
    const [links, setLinks] = useState<IUserProfileLink[]>(initValue)

    const addLink = (linkName: string, linkUrl: string) => {
      const newLink = { linkName, linkUrl, id: links.length }
      setLinks([...links, newLink])
    }

    const changeLinkName = (id: number, content: string) => {
      // links[id].linkName = content
      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, linkName: content } : link,
        ),
      )
    }

    const changeUrl = (id: number, content: string) => {
      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, linkUrl: content } : link,
        ),
      )
    }

    return { links, addLink, changeLinkName, changeUrl }
  }
  const { links, addLink, changeLinkName, changeUrl } = useLinks([])

  const submitHandler = async () => {
    try {
      const response = await axiosWithAuth.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/write`,
        {
          image: 'previewImage',
          content: 'content',
          teamId: 'value3',
          links: links,
        },
      )
      redirect(`/showcase/${response.data.get('id')}`) // next 13에서 redirect 하는 법
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

  // if (isLoading) return <div>로딩중</div>
  // if (error) return <div>에러</div>
  return (
    <form id="showcase-form">
      <Stack direction={'column'} spacing={'2.5rem'} sx={{ width: '26rem' }}>
        <ImageInput
          previewImage={previewImage}
          image={image}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
        />
        <TeamName teamName={data.title} />
        <SkillInput tags={data?.skills} />
        <StartEndDateViewer start={data.start} end={data.end} />
        <TeamMembers members={data?.memberList} />
        <LinkForm
          links={links}
          addLink={addLink}
          changeLinkName={changeLinkName}
          changeUrl={changeUrl}
        />
        <DynamicEditor initialValue={text} setText={setText} />
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
