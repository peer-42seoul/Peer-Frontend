'use client'
import { Button, Container, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { IShowcaseEditorFields } from '@/types/IShowcaseEdit'
import ImageInput from '../panel/common/ImageInput'
import TeamName from '../panel/common/TeamName'
import SkillInput from '../panel/common/SkillInput'
import LinkForm from '../panel/common/LinkForm'
import useToast from '@/states/useToast'
import useModal from '@/hook/useModal'
import CuTextModal from '@/components/CuTextModal'
import useAxiosWithAuth from '@/api/config'
import StartEndDateViewer from '../panel/common/StartEndDateViewer'
import TeamMembers from '../panel/common/TeamMembers'
import * as style from './ShowcaseEditor.style'
import { useLinks } from '@/hook/useLinks'
import useShowCaseState from '@/states/useShowCaseState'
import { useRouter } from 'next/navigation'
import useMedia from '@/hook/useMedia'
import DynamicToastEditor from '@/components/DynamicToastEditor'
import { Editor } from '@toast-ui/editor'

interface IShowcaseEditorProps {
  data: IShowcaseEditorFields // IShowcase 타입을 import 해야 합니다.
  teamId?: number
  showcaseId?: number
  requestMethodType: 'post' | 'put'
  router: any | undefined
}

const ShowcaseEditor = ({
  data,
  teamId,
  showcaseId,
  requestMethodType,
}: IShowcaseEditorProps) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    data.image ?? '/images/defaultImage.png',
  )
  const { openToast } = useToast()
  const { isOpen: alertOpen, closeModal, openModal } = useModal()
  const { links, addLink, isValid, setIsValid, changeLinkName, changeUrl } =
    useLinks(data.links ? data.links : [])
  const { content, setContent } = useShowCaseState()
  const router = useRouter()
  const { isPc } = useMedia()
  const editorRef = useRef<Editor | null>(null)

  useEffect(() => {
    if (requestMethodType === 'put') {
      setContent(data?.content)
    }
  }, [requestMethodType, data?.content])

  const submitHandler = async () => {
    const linksWithoutId = links.map(({ ...rest }) => rest)
    if (!isValid) {
      return
    }
    try {
      if (requestMethodType === 'post') {
        await axiosWithAuth.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/write`,
          {
            image: previewImage.split(',')[1],
            content: content,
            teamId: teamId,
            links: linksWithoutId,
          },
        )
        router.push(`/teams/${teamId}/showcase`)
      } else if (requestMethodType === 'put') {
        await axiosWithAuth.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/edit/${showcaseId}`,
          {
            image: image.length ? previewImage.split(',')[1] : null,
            content: content,
            links: linksWithoutId,
          },
        )
        router.push(`/showcase/detail/${showcaseId}`)
      }
    } catch (error: any) {
      closeModal()
      if (error.response) {
        switch (error.response.status) {
          case 400:
            openToast({
              severity: 'error',
              message: '요청이 올바르지 않습니다.',
            })

            break
          case 403:
            openToast({
              severity: 'error',
              message: '접근이 거부되었습니다.',
            })
            break
          case 404:
            openToast({
              severity: 'error',
              message: '페이지를 찾을 수 없습니다.',
            })
            break
          case 409:
            openToast({
              severity: 'error',
              message: '이미 쇼케이스가 존재합니다.',
            })
            break
          default:
            openToast({
              severity: 'error',
              message: '알 수 없는 에러가 발생했습니다.',
            })
            break
        }
      } else if (error.request) {
        openToast({
          severity: 'error',
          message: '서버에서 응답이 없습니다.',
        })
      } else {
        openToast({
          severity: 'error',
          message: '요청을 설정하는 중에 에러가 발생했습니다.',
        })
      }
    }
  }

  return (
    <Container
      sx={{
        padding: isPc ? '2.5rem 4rem 2.5rem 4rem' : '0 1rem 0 1rem',
        width: '100%',
        height: 'auto',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          height: '4.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <Button
          onClick={openModal}
          sx={style.saveButton}
          style={{ width: '4.3125rem', height: '2rem' }}
        >
          저장
        </Button>
      </Stack>
      <Stack direction={'column'} sx={{ width: '100%', gap: '2.5rem' }}>
        <ImageInput
          previewImage={previewImage}
          image={image}
          setImage={setImage}
          setPreviewImage={setPreviewImage}
        />
        <TeamName teamName={data.name} editMode={true} />
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
        {/* <DynamicEditor content={data.content} /> */}
        <DynamicToastEditor
          initialValue={data.content}
          initialEditType="wysiwyg"
          editorRef={editorRef}
          previewStyle="tab"
          height={'30rem'}
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
    </Container>
  )
}
export default ShowcaseEditor
