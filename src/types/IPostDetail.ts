import { SxProps } from '@mui/material'

export type ProjectType = 'STUDY' | 'PROJECT'

export interface ITag {
  tagId: number
  name: string
  color: string
  createdAt?: string
  updatedAt?: string
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
  href?: string
  onFavorite?: () => void
  sx?: SxProps
  favoriteMutate?: () => void
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
  favorite: boolean | undefined
}

export interface IPostDetail {
  title: string
  status: TPostStatus
  due: string
  content: string
  leader_id: string
  leader_image: string
  leader_nickname: string
  region: string[]
  link: string
  tagList: ITag[]
  roleList: IRole[]
  // interviewList: IFormInterview[]
  place: string
  image: string
  totalNumber: number
  favorite: boolean
  teamName: string
}

export interface IFormInterview {
  question: string
  type: string
  optionList: string[] | null
}

export interface IRole {
  name: string
  number: number
  current: number
}

export interface IRoleWrite {
  name: string | null
  number: number
}

export type TPostStatus = 'BEFORE' | 'ONGOING' | 'DONE'

export enum statusEnum {
  BEFORE,
  ONGOING,
  AFTER,
}
