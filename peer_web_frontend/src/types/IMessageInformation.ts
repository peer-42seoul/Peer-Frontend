//임의로 설정, api 생성되면 바꿀 예정
export interface IMessageInformation {
  id: number
  content: string
  messageTime: number[]
  messageType: string
  nickname?: string // Make 'nickname' property optional
}
