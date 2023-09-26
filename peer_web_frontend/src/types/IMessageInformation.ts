//임의로 설정, api 생성되면 바꿀 예정
export interface IMessageInformation {
  senderId: number
  senderNickname: string
  msgId: number
  content: string
  date: string
  isEnd: boolean
}

export interface IMessagObject {
  target: number
  targetNickname: string
  targetImage: string
  unreadMsgNumber: number
  latestContent: string
  latestDate: string
}
