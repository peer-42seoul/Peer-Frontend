'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MyPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/my-page/profile')
  }, [])
  return <></>
}
export default MyPage
