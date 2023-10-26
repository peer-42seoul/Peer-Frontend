export type TTeamStatus = 'RECRUITING' | 'BEFORE' | 'ONGOING' | 'COMPLETE'

export type TTeamType = 'STUDY' | 'PROJECT'

export type TOperationForm = 'ONLINE' | 'OFFLINE' | 'MIX'

export interface ITeamInfo {
  id: number
  name: string
  teamPicturePath: string | null // 설정된 프로필 이미지가 없는 경우 null
  status: TTeamStatus
  memberCount: string // "현재 팀원 / 최대 팀원" 형식
  leaderName: string
  type: TTeamType
  dueTo: number
  operationForm: TOperationForm
  region: string[]
}
