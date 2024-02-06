'use client'
import React, { useRef, useState } from 'react'
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

const Page = ({ params }: { params: { id: string } }) => {
  const { openToast, closeToast } = useToast()
  const router = useRouter()
  const editorRef = useRef<Editor | null>(null)

  const [isAnswered, setIsAnswered] = useState(false)

  const searchParam = useSearchParams()

  const type = searchParam.get('type')

  const axiosWithAuth = useAxiosWithAuth()
  const {
    data: defaultValues,
    isLoading,
    error,
  } = useSWR<IRecruitWriteField>(
    `/api/v1/recruit/edit/${params.id}`,
    (url: string) =>
      axiosWithAuth
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          setIsAnswered(data.isAnswered)
          return data
        })
        .then((data) => ({
          place: data.place,
          image: data.image,
          title: data.title,
          name: data.name,
          due: data.due,
          type: data.type,
          region:
            data.place === 'ONLINE' ? { large: '', small: '' } : data.region,
          link: data.link ?? '',
          tagList: data.tagList,
          roleList:
            data.type === 'PROJECT' ? data.roleList : [{ name: '', number: 0 }],
          interviewList: formToField(data.interviewList),
          max: data.totalNumber ? `${data.totalNumber}` : `2`,
        })),
    { revalidateOnFocus: false },
  )

  if (isLoading) return <CuCircularProgress color="primary" />
  else if (error || !defaultValues) {
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

  const handleSubmit = async (data: IRecruitWriteField) => {
    closeToast()

    await axiosWithAuth
      .put(`/api/v1/recruit/${params.id}`, {
        name: data.name,
        title: data.title,
        due: data.due,
        status: 'ONGOING',
        content: editorRef.current?.getMarkdown(),
        region:
          data.place === 'ONLINE'
            ? null
            : [data.region.large, data.region.small],
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
      isAnswered={isAnswered}
    />
  )
}

export default Page
