import MainPage from './panel/MainPage'
import axios from 'axios'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'

export default async function Home() {
  const accessToken = getCookie('accessToken', { cookies })
  let data
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=1&pageSize=6&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
      {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-store',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    data = response.data
  } catch (e) {
    console.error(e)
  }

  return <MainPage initData={data} />
}
