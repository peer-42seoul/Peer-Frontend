import React from 'react'
import axios from 'axios'
import RecruitDetailPage from '@/app/recruit/[id]/panel/RecruitDetailPage'
import NextSeo from '@/components/NextSeo'

export const dynamic = 'force-dynamic'

export default async function RecruitDetailIndex({
  params,
}: {
  params: { id: string }
}) {
  let data
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SSR_API}/api/v1/recruit/${params.id}`,
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
    data = response.data
  } catch (e) {
    // console.error(e)
  }

  const webMetadata = {
    title: data?.title,
    description: data?.content,
    url: `https://peer-study.co.kr/`,
    image: data?.image,
  }

  return (
    <>
      <NextSeo webMetadata={webMetadata} />
      <RecruitDetailPage data={data} id={params.id} />
    </>
  )
}
