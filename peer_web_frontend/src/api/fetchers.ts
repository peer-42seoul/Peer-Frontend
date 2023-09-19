import axios from 'axios'

export const defaultGetFetcher = (url: string) =>
  axios.get(url).then((res) => res.data)

export const fetchServerData = async (url: string) => {
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()
  return data
}

export const fetchStaticData = async (url: string) => {
  const res = await fetch(url, { cache: 'force-cache' })
  const data = await res.json()
  return data
}
