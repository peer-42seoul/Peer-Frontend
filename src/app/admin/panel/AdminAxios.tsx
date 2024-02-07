import axios from 'axios'

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

export const fetchTags = async () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API
  const response = await axios.get(`${API_URL}/api/v1/tag`, {
    withCredentials: true,
  })
  return response.data
}