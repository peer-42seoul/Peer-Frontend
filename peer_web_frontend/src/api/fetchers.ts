import axios from 'axios'

export const defaultGetFetcher = (url: string) =>
  axios.get(url).then((res) => res.data)

export const fetchServerData = async (url: string) => {
  const response = await axios.get(url, {
    headers: { 'Cache-Control': 'no-store' },
  })
  return response.data
}

export const fetchStaticData = async (url: string) => {
  const response = await axios.get(url, {
    headers: { 'Cache-Control': 'force-cache' },
  })
  return response.data
}
