export interface IUserProfile {
  id: number
  profileImageUrl: string
  introduction: string
  linkList: Array<IUserProfileLink>
  phone: string
  representAchievement: string
  achievements: Array<string>
  association: string | null
  email: string
}

export interface IUserProfileLink {
  link: string
  linkTitle: string
}
