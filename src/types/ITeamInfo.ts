export type TTeamStatus = 'RECRUITING' | 'BEFORE' | 'ONGOING' | 'COMPLETE'

export interface ITeamInfo {
  id: number
  name: string
  teamPicturePath: string | null // 설정된 프로필 이미지가 없는 경우 null
  status: TTeamStatus
  memberCount: number
  leaderName: string
  createdAt: string // "0000.00.00"
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}
