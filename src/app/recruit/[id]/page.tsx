import React from 'react'
import axios from 'axios'
import RecruitDetailPage from '@/app/recruit/[id]/panel/RecruitDetailPage'

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
    console.log(e)
  }

  return <RecruitDetailPage data={data} id={params.id} key={data?.updatedAt} />
}
