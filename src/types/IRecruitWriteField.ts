import { IRoleWrite } from './IPostDetail'
import { ISkill } from './IUserProfile'

export interface IFormInterviewField {
  question: string
  type: 'OPEN' | 'CLOSE' | 'CHECK' | 'RATIO'
  optionList: Array<{ option: string }>
}

export interface IRecruitWriteField {
  place: string
  image: string
  title: string
  name: string
  due: string
  type: string
  region: { large: string; small: string }
  link: string
  tagList: Array<ISkill>
  roleList: Array<IRoleWrite>
  interviewList: Array<IFormInterviewField>
  max: string
}
