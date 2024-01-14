export enum TeamType {
  PROJECT = 'PROJECT',
  STUDY = 'STUDY',
}

export enum TeamStatus {
  RECRUITING = 'RECRUITING',
  BEFORE = 'BEFORE',
  ONGOING = 'ONGOING',
  COMPLETE = 'COMPLETE',
}

export enum TeamGrant {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
}

export enum TeamOperationForm {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  MIX = 'MIX',
}

export interface IMember {
  name: string
  id: string
  role: TeamGrant
  job: string[]
}

export interface Job {
  id: number
  name: string
  max: number
  current: number
}

export interface ITeam {
  job: Job[]
  team: {
    id: string
    type: TeamType
    name: string
    maxMember: String
    status: TeamStatus
    dueTo: string
    operationForm: TeamOperationForm
    region: string[]
    teamImage: string | null
  }
  member: IMember[]
}

export enum EInterviewType {
  CLOSE = 'close',
  OPEN = 'OPEN',
  RATIO = 'RATIO',
  CHECK = 'CHECK',
}

//TODO: 타입 묶기
export type CloseQuestionList = string[]

export type RatioQuestionList = {
  number: string
  option1: string
  option2: string
}

export type CheckQuestionList = string[]

export interface IInterview {
  question: string
  answer: string
  type: EInterviewType
  optionList: CloseQuestionList | RatioQuestionList | CheckQuestionList | null
}

export interface IApply {
  teamJobId: number
  teamUserId: number
}

export interface IApplicant {
  name: string
  userId: string
  answers: IInterview[]
  applyId: IApply
  jobName: string
}
