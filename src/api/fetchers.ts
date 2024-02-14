import axios, { AxiosInstance } from 'axios'

export const defaultGetFetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })

/* useSWR에 적용하는 법
  const {data} = useSWR([url, axiosInstance], ([url, axiosInstance]) => getFetcherWithInstance(url, axiosInstance))
*/

export const getFetcherWithInstance = (
  url: string,
  axiosInstance: AxiosInstance,
) =>
  axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })

// //사용법
// import useAxiosWithAuth from './config'
// ...
//   const axiosInstance = useAxiosWithAuth()
//   defaultGetFetcher('/api-endpoint', axiosInstance).then((data) => {}).catch((error) => {})

export const fetchServerData = async (url: string) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: { 'Cache-Control': 'no-store' },
    })
    return response.data
  } catch (e) {
    console.error('fetchServerData error')
  }
}

export const fetchStaticData = async (url: string) => {
  const response = await axios.get(url, {
    headers: { 'Cache-Control': 'force-cache' },
  })
  return response.data
}
