import MainPage from './panel/MainPage'
import axios from 'axios'
import { cookies } from 'next/headers'

export default async function Home() {
  let data
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=STUDY&sort=latest&page=1&pageSize=6&keyword=&due=&region1=&region2=&place=&status=&tag=`,
      {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-store',
          Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
        },
      },
    )
    data = response.data
  } catch (e) {
    console.error(e)
  }

  return <MainPage initData={data} />
}
