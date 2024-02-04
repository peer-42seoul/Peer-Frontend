'use client'
import React, { useRef } from 'react'
import CreateTeamEditor from '@/app/recruit/write/panel/CreateTeamEditor'
import { Editor } from '@toast-ui/editor'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuCircularProgress from '@/components/CuCircularProgress'
import useToast from '@/states/useToast'
import { useRouter } from 'next/navigation'

interface IRecruitEditApiType extends IRecruitWriteField {
  isAnswered: boolean
}

const Page = (params: { id: string }) => {
  const { openToast, closeToast } = useToast()
  const router = useRouter()
  const editorRef = useRef<Editor | null>(null)

  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading, error } = useSWR<IRecruitEditApiType>(
    `/api/v1/recruit/edit/${params.id}`,
    (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )

  if (isLoading) return <CuCircularProgress color="primary" />
  else if (error || !data) {
    if (error.data.message) {
      openToast({ message: error.data.message, severity: 'error' })
    } else {
      openToast({
        message: '데이터를 불러오는데 실패했습니다.',
        severity: 'error',
      })
    }
    router.replace(`/recruit/${params.id}`)
    return <></>
  }

  const defaultValues: IRecruitWriteField = { ...(data as IRecruitWriteField) }

  const handleSubmit = async (data: IRecruitWriteField) => {
    closeToast()
    console.log(data)
    console.log(editorRef.current?.getMarkdown())
  }

  return (
    <>
      <CreateTeamEditor
        editorRef={editorRef}
        defaultValues={defaultValues}
        editorType="write"
        submitHandler={handleSubmit}
        isAnswered={data?.isAnswered}
      />
    </>
  )
}

export default Page
