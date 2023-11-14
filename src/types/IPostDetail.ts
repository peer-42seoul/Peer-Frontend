import { ProjectType } from '@/app/panel/MainPage'

export interface ITag {
  name: string
  color: string
}

export interface IMainCard {
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: ITag[]
  favorite?: boolean
  recruit_id: number
  type: ProjectType | undefined
}

export interface IPost {
  recruit_id: number
  title: string
  image: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  status: string
  tagList: ITag[]
  favorite: boolean
}

export interface IPostDetail {
  title: string
  status: TPostStatus
  due: string
  content: string
  user_id: string
  user_nickname: string
  user_thumbnail: string
  region: string[]
  link: string
  tagList: ITag[]
  roleList: IRole[]
  // interviewList: IFormInterview[]
  place: string
}

export interface IFormInterview {
  question: string
  type: string
  optionList: string[] | null
}

export interface IRole {
  name: string
  number: number
}

export type TPostStatus = 'BEFORE' | 'ONGOING' | 'DONE'

export enum statusEnum {
  BEFORE,
  ONGOING,
  AFTER,
}
