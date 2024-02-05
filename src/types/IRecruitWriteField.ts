import { IRoleWrite } from './IPostDetail'
import { ISkill } from './IUserProfile'

export interface IFormInterviewField {
  question: string
  type: 'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'
  optionList: Array<{ option: string }>
}

export interface IRecruitWriteField {
  place: string
  image: string | null
  title: string
  name: string
  due: string
  type: string
  region: Array<string> | null
  link: string
  tagList: Array<ISkill>
  roleList: Array<IRoleWrite>
  interviewList: Array<IFormInterviewField>
  // interviewList: Array<IFormInterview>
  max: string | undefined
  // content: string
}
