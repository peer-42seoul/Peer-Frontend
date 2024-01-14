import { IUserProfileLink } from './IUserProfile'

// export interface IShowcaseEditorFields {
//   image: File[] | null
//   tags: string[]
//   startDate: string
//   endDate: string
//   links: IUserProfileLink[]
//   content: string
// }
export interface IShowcaseEditorFields {
  title: string
  skills: string[]
  start: string
  end: string
  memberList: []
  links: string[]
}
