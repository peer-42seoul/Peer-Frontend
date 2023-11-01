export type Tag = {
  tagName: string
  tagColor: string
}

export interface IPost {
  post_id: number
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: Tag[]
  isFavorite: boolean
}

export interface IPostDetail {
  title: string
  status: string
  due: string
  content: string
  user_id: string
  region: string
  link: string
  tagList: Tag[]
  role: IRole[]
  interviewList: IFormInterview[]
  place: string
}

export interface IFormInterview {
  question: string
  type: string
  optionList: string[]
}

export interface IRole {
  name: string
  number: number
}
