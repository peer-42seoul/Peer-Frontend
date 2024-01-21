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

// /write 디렉토리 interface
export interface IShowcaseEditorFields {
  name: string
  skills: ISkill[]
  start: string
  end: string
  memberList: IMember[]
  links: IUserProfileLink[]
}

// /[id] 디렉토리 interface
export interface IShowcaseViewerFields {
  name: string
  skills: ISkill[]
  start: string
  end: string
  member: IMember[]
  links: IUserProfileLink[]
  content: string
  image: string
}
export interface IShowcaseEditorProps {
  data: IShowcaseEditorFields // IShowcase 타입을 import 해야 합니다.
  teamId: number
  requestMethodType: 'post' | 'put'
  router: any | undefined
}

export interface ILinkInformation {
  id: number
  name: string
  link: string
}
