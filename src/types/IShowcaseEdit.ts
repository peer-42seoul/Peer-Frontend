import { IUserProfileLink } from './IUserProfile'
import { ITag } from './IPostDetail'

export interface IShowcaseEditorFields {
  image: File[] | null
  tags: ITag[]
  startDate: string
  endDate: string
  links: IUserProfileLink[]
  content: string
}
