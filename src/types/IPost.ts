export interface IPost {
  post_id: string
  title: string
  image: string
  user_id: number
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: string[]
  isFavorite: boolean
}
