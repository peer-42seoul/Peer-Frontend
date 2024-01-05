'use client'
import { useRouter } from 'next/navigation'

const MyPage = () => {
  const router = useRouter()

  router.push('/my-page/profile')
  return null
}
export default MyPage
