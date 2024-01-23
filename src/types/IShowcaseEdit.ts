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
  isLeader?: boolean
  role: string
  image: string
}

export interface ILinkInformation {
  id: number
  name: string
  link: string
}

export interface ISkill {
  name: string
  Id: number
  color: string
}
export interface IShowcaseEditorProps {
  data: IShowcaseEditorFields | IShowcaseData
  teamId: number
  requestMethodType: 'post' | 'put'
  router: any | undefined
}
// /write 디렉토리 interface
export interface IShowcaseEditorFields {
  name: string
  skills: ISkill[]
  start: string
  end: string
  memberList?: IMember[]
  member?: IMember[] // edit api에서 사용
  links: ILinkInformation[]
  content?: string
}

// /[id] 디렉토리 interface
export interface IShowcaseViewerFields {
  name: string
  skills: ISkill[]
  start: string
  end: string
  member: IMember[]
  links: ILinkInformation[]
  content: string
  image: string
}

export interface IShowcaseData {
  author: boolean
  image: string
  favorite: boolean
  liked: boolean
  likeCount: number
  name: string
  start: string
  end: string
  skills: ISkill[]
  member: IMember[]
  links: ILinkInformation[]
  content: string
}
