export interface IPost {
  post_id: number
  title: string
  image: string
  user_id: number
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: string[]
  isFavorite: boolean
}
