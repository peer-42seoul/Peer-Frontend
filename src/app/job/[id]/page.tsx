'use client'

import HitsCounter from '@/components/HitsCounter'
import {
  DetailContent,
  DetailContentCotainer,
  DetailPage,
} from '@/components/board/DetailPanel'
import { useRouter } from 'next/navigation'

export interface IJobDetail {
  title: string // 글 제목
  writer: string // 글 작성자
  createdAt: Date // 글 작성일
  content: string // 글 내용
}

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  const data: IJobDetail = {
    title: 'title',
    writer: 'writer',
    createdAt: new Date(),
    content: 'content',
  }

  const router = useRouter()

  return (
    <DetailPage
      boardType="JOB"
      handleGoBack={() => {
        router.push('/job')
      }}
    >
      <DetailContentCotainer
        containerTitle="이번 주의 채용 공고"
        onClickEditButton={() => {}}
        author={false}
      >
        <DetailContent
          title={data.title}
          createdAt={data.createdAt}
          authorNickname={data.writer}
          content={data.content}
        />
      </DetailContentCotainer>
      {/* TODO: https://www.peer-study.co.kr/ 로 수정 필요함 */}
      <HitsCounter targetUrl={`http://localhost:3000/job/${id}`} />
    </DetailPage>
  )
}

export default JobDetailPage
