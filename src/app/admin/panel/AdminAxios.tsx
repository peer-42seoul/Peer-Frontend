import axios from 'axios'

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

export const fetchTags = async () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  try {
    const response = await axios.get(`${API_URL}/api/v1/tag`, {
      withCredentials: true,
      // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('태그를 불러오는 데 실패했습니다.', error)
    throw error
  }
}
