import { IUserProfileLink } from './IUserProfile'

// export interface IShowcaseEditorFields {
//   image: File[] | null
//   tags: string[]
//   startDate: string
//   endDate: string
//   links: IUserProfileLink[]
//   content: string
// }
export interface IMember {
  nickname: string
  isLeader: boolean
  role: string
  image: string
}

export interface ISkill {
  name: string
  Id: number
  color: string
}

export interface IShowcaseEditorFields {
  title: string
  skills: ISkill[]
  start: string
  end: string
  memberList: IMember[]
  links: IUserProfileLink[]
}
