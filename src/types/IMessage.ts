// 메시지 목록 페이지

export interface IMessageListData {
  targetId: number
  conversationalId: number
  targetNickname: string
  targetProfile: string
  unreadMsgNumber: number // 아직 확인하지 않은 메시지 데이터 수
  latestContent: string
  latestDate: string // 최신 메시지 날짜
  latestMsgId: number // 최신 메시지 고유 키
}

// 개별 메시지 정보

export interface IMessage {
  userId: number // 이 쪽지의 주인
  msgId: number
  content: string
  date: string
  isEnd: boolean
}

export interface IMessageUser {
  userId: number
  userProfile: string
  userNickname: string
}

// 메시지 전송 타입

export interface IMessageTarget {
  targetId: number
  targetEmail: string
  targetNickname: string
  targetProfile: string
}
