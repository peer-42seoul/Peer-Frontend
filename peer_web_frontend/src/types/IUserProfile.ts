export interface IUserProfile {
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
export interface IMessageInformation {
  nickname: string
  content: string
  profileImage: string
  messageTime: [2023, 9, 6, 17, 16, 51, 131412000]
  messageType: string
}
