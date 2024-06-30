'use client'

import useAxiosWithAuth from '@/api/config'
import HitsCounter from '@/components/HitsCounter'
import {
  DetailContent,
  DetailContentCotainer,
  DetailPage,
} from '@/components/board/DetailPanel'
import UTCtoLocalTime from '@/utils/UTCtoLocalTime'
import { useRouter } from 'next/navigation'
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

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>데이터가 없습니다.</div>

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
      {/* TODO: https://www.peer-study.co.kr/ 로 수정 필요함 */}
      <HitsCounter targetUrl={`http://localhost:3000/job/${params.id}`} />
    </DetailPage>
  )
}

export default JobDetailPage
