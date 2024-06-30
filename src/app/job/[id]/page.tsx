'use client'

import useAxiosWithAuth from '@/api/config'
import CuCircularProgress from '@/components/CuCircularProgress'
import HitsCounter from '@/components/HitsCounter'
import {
  DetailContent,
  DetailContentCotainer,
  DetailPage,
} from '@/components/board/DetailPanel'
import useToast from '@/states/useToast'
import UTCtoLocalTime from '@/utils/UTCtoLocalTime'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'

export interface IJobDetail {
  title: string // 글 제목
  writerName: string // 글 작성자
  createdAt: Date // 글 작성일
  content: string // 글 내용
  id: number // 글 id
}

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const axiosWithAuth = useAxiosWithAuth()
  const { data, isLoading } = useSWR<IJobDetail>(
    `/api/v1/job/${params.id}`,
    async (url: string) => axiosWithAuth.get(url).then((res) => res.data),
  )
  const { openToast } = useToast()
  useEffect(() => {
    if (!data && !isLoading) {
      openToast({
        severity: 'error',
        message: '게시글을 불러오는 데 실패했습니다.',
      })
      router.push('/job')
    }
  }, [data, isLoading, openToast, router])

  if (isLoading) return <CuCircularProgress color="primary" />
  if (!data) return null

  return (
    <DetailPage
      boardType="JOB"
      handleGoBack={() => {
        router.push('/job')
      }}
    >
      <DetailContentCotainer
        containerTitle="채용 공고"
        onClickEditButton={() => {}}
        author={false}
      >
        <DetailContent
          title={data.title}
          createdAt={UTCtoLocalTime(data.createdAt)}
          authorNickname={data.writerName}
          content={data.content}
        />
      </DetailContentCotainer>
      <HitsCounter
        targetUrl={`https://www.peer-study.co.kr/job/${params.id}`}
      />
    </DetailPage>
  )
}

export default JobDetailPage
