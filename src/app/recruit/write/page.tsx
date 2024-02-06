'use client'
import React, { useRef } from 'react'
import CreateTeamEditor from './panel/CreateTeamEditor'
import { Editor } from '@toast-ui/editor'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import useAxiosWithAuth from '@/api/config'
import { ITag } from '@/types/IPostDetail'
import useToast from '@/states/useToast'
import { useRouter } from 'next/navigation'
import { fieldToForm } from './panel/fields/Interview/handleInterviewList'

const Page = () => {
  const editorRef = useRef<Editor | null>(null)
  const axiosWithAuth = useAxiosWithAuth()
  const router = useRouter()

  const { openToast, closeToast } = useToast()

  const defaultValues: IRecruitWriteField = {
    place: '',
    image: '',
    title: '',
    name: '',
    due: '',
    type: 'PROJECT',
    region: { large: '', small: '' },
    link: '',
    tagList: [],
    roleList: [{ name: '', number: 0 }],
    interviewList: [],
    max: '2',
  }

  const handleSubmit = async (data: IRecruitWriteField) => {
    closeToast()
    await axiosWithAuth
      .post('/api/v1/recruit/write', {
        image: data.image?.split(',')[1],
        title: data.title,
        name: data.name,
        due: data.due,
        type: data.type,
        region:
          data.place === 'ONLINE'
            ? null
            : [data.region.large, data.region.small],
        tagList: data.tagList.map((tag: ITag) => {
          return tag.tagId
        }),
        roleList: data.type === 'PROJECT' ? data.roleList : null,
        interviewList: fieldToForm(data.interviewList), // 인터뷰 리스트 재가공 필요
        place: data.place,
        max: data.type === 'PROJECT' ? null : Number(data.max),
        content: editorRef.current?.getMarkdown(),
        link: data.link,
      })
      .then((res) => {
        openToast({
          message: '모집글이 성공적으로 등록되었습니다.',
          severity: 'success',
        })
        router.push(`/recruit/${res.data}`)
      })
      .catch((error) => {
        openToast({
          message: error.data.message ?? '모집글 등록에 실패했습니다.',
          severity: 'error',
        })
      })
  }

  return (
    <CreateTeamEditor
      editorRef={editorRef}
      defaultValues={defaultValues}
      editorType="write"
      submitHandler={handleSubmit}
    />
  )
}

export default Page
