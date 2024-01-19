export interface IUserProfile {
  id: number
  nickname: string
  profileImageUrl: string
  introduction: string
  linkList: Array<IUserProfileLink>
  representAchievement: string // 2스텝에서 사용/ 임시/ 1스텝에서넌 신경 x
  achievements: Array<string>
  association: string | null // 해당 없을 시 null
  email: string
}

export interface IUserProfileLink {
  // id: number
  name: string
  link: string
}

export interface IProfileCard {
  profileImageUrl: string | null
  nickname: string
  association: string | null
  introduction: string
  email: string
}
