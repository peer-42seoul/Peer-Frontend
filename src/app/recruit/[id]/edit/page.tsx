'use client'
import React, { useRef } from 'react'
import CreateTeamEditor from '@/app/recruit/write/panel/CreateTeamEditor'
import { Editor } from '@toast-ui/editor'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuCircularProgress from '@/components/CuCircularProgress'
import useToast from '@/states/useToast'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  fieldToForm,
  formToField,
} from '../../write/panel/fields/Interview/handleInterviewList'
import { IFormInterview, IRoleWrite } from '@/types/IPostDetail'
import { ISkill } from '@/types/IUserProfile'

interface IRecruitEditApiType {
  place: string
  image: string | null
  title: string
  name: string
  due: string
  type: string
  region: Array<string> | null
  link: string
  tagList: Array<ISkill>
  roleList: Array<IRoleWrite>
  interviewList: Array<IFormInterview>
  max: string | undefined
  isAnswered: boolean
}

const Page = ({ params }: { params: { id: string } }) => {
  const { openToast, closeToast } = useToast()
  const router = useRouter()
  const editorRef = useRef<Editor | null>(null)

  const searchParam = useSearchParams()

  const type = searchParam.get('type')

  const axiosWithAuth = useAxiosWithAuth()
  const {
    data: initData,
    isLoading,
    error,
  } = useSWR<IRecruitEditApiType>(
    `/api/v1/recruit/edit/${params.id}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  if (isLoading) return <CuCircularProgress color="primary" />
  else if (error || !initData) {
    if (error?.response?.initData?.message) {
      openToast({ message: error?.response?.data?.message, severity: 'error' })
    } else {
      openToast({
        message: '데이터를 불러오는데 실패했습니다.',
        severity: 'error',
      })
    }
    router.replace(`/recruit/${params.id}?type=${type}`)
    return <></>
  }

  const defaultValues: IRecruitWriteField = {
    place: initData.place,
    image: initData.image,
    title: initData.title,
    name: initData.name,
    due: initData.due,
    type: type || initData.type,
    region: initData.place === 'ONLINE' ? ['', ''] : initData.region,
    link: initData.link ?? '',
    tagList: initData.tagList,
    roleList:
      initData.type === 'PROJECT'
        ? initData.roleList
        : [{ name: '', number: 0 }],
    interviewList: formToField(initData.interviewList),
    max: initData.max ? initData.max.toString() : '2',
  }

  const handleSubmit = async (data: IRecruitWriteField) => {
    closeToast()

    await axiosWithAuth
      .put(`/api/v1/recruit/${params.id}`, {
        name: data.name,
        title: data.title,
        due: data.due,
        status: 'ONGOING',
        content: editorRef.current?.getMarkdown(),
        region: data.place === 'ONLINE' ? null : data.region,
        link: data.link,
        tagList: data.tagList.map((tag) => {
          return tag.tagId
        }),
        roleList: data.type === 'PROJECT' ? data.roleList : null,
        interviewList: fieldToForm(data.interviewList),
        place: data.place,
        max: data.type === 'PROJECT' ? null : Number(data.max),
        type: data.type,
      })
      .then((res) => {
        openToast({
          message: '모집글이 성공적으로 수정되었습니다.',
          severity: 'success',
        })
        router.replace(`/recruit/${res.data}?type=${data.type}`)
      })
      .catch((error) => {
        openToast({
          message:
            error?.response?.data?.message ?? '모집글 수정에 실패했습니다.',
          severity: 'error',
        })
      })
  }

  return (
    <CreateTeamEditor
      editorRef={editorRef}
      defaultValues={defaultValues}
      editorType="edit"
      submitHandler={handleSubmit}
      isAnswered={initData?.isAnswered}
    />
  )
}

export default Page
