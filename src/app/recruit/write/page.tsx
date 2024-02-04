'use client'
import React, { useRef } from 'react'
import CreateTeamEditor from './panel/CreateTeamEditor'
import { Editor } from '@toast-ui/editor'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'

const Page = () => {
  const editorRef = useRef<Editor | null>(null)

  const defaultValues: IRecruitWriteField = {
    place: '',
    image: null,
    title: '',
    name: '',
    due: '',
    type: 'PROJECT',
    region: ['', ''],
    link: '',
    tagList: [],
    roleList: [{ name: '', number: 0 }],
    interviewList: [],
    max: undefined,
  }

  return (
    <>
      <CreateTeamEditor editorRef={editorRef} defaultValues={defaultValues} />
    </>
  )
}

export default Page
