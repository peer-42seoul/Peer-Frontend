export interface IUserProfile {
  id: number
  profileImageUrl: string
  introduction: string
  linkList: Array<IUserProfileLink>
  phone: string
  representAchievement: Array<string>
  achievements: Array<string>
  association: string | null
  email: string
}

export interface IUserProfileLink {
  link: string
  linkTitle: string
}

export interface IProfileCard {
  profileImageURL: string | null
  username: string
  association: string | null
  introduction: string
  email: string
}
