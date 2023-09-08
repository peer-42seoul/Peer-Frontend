export interface UserProfile {
  id: number
  profileImageUrl: string
  introduction: string
  linkList: Array<string>
  phone: string
  representAchievement: Array<string>
  achievements: Array<string>
  association: string | null
  userId: string
  email: string
}
