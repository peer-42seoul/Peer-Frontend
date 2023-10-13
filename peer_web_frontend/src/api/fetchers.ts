import axios from 'axios'

export const defaultGetFetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })

export const fetchServerData = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: { 'Cache-Control': 'no-store' },
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchStaticData = async (url: string) => {
  const response = await axios.get(url, {
    headers: { 'Cache-Control': 'force-cache' },
  })
  return response.data
}
