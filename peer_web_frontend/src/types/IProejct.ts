import { Tag } from './IPostDetail'

//임의로 설정, api 생성되면 바꿀 예정
export interface IProject {
  id: string
  nickname: string
  profileImgUrl: string
  imageUrl: string
  description: string
  tagList: Tag[]
  isFavorite: boolean
  inProgress: boolean
}
