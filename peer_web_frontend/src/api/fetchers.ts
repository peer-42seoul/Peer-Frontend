import axios from 'axios'

export const defaultGetFetcher = (url: string) =>
  axios.get(url).then((res) => res.data)
