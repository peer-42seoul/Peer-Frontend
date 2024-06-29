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
    title: '7월 1주차 채용 공고',
    writer: 'jujeon',
    createdAt: new Date(),
    content: `# This is a Title

This is a paragraph of text. You can write multiple lines of text here and it will stay together in the formatted document.

## Here's a Subheading

You can use asterisks (*) or underscores (_) to create italic text like this. 

**Bold text** can be created with two asterisks (**) or two underscores (__).

We can also include lists:

* Bullet point 1
* Bullet point 2
  * Nested bullet point

And numbered lists:

1. Numbered item 1
2. Numbered item 2

Here's a link to [Wikipedia](wikipedia.org). 

You can also add an image using the following syntax:

!["Alt text for the image"](path/to/the/image.jpg)

**Note:** This is just a basic example, and there are many other formatting options available in Markdown. `,
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
        containerTitle="채용 공고"
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
