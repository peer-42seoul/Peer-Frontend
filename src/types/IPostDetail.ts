export type Tag = {
  tagName: string
  tagColor: string
}

export interface IPost {
  post_id: number
  title: string
  image: string
  user_id: number
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: Tag[]
  isFavorite: boolean
}

export interface IPostDetail {
  title: string
  status: string // 예를 들면 "모집중"
  due: string // 날짜 형식으로 변경해야 함
  content: string
  user_id: string // 사용자 ID의 데이터 타입에 따라 변경해야 함
  region: string
  link: string
  tag: Tag[] // 문자열 배열 형태
  role: IRole[]
  interviewList: IFormInterview[]
}

export interface IFormInterview {
  question: string
  type: string
  optionList: string[]
}

export interface IRole {
  roleName: string
  number: number
}
