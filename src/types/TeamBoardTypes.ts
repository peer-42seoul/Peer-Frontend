// Board

// Notice

export interface ITeamNoticeBase {
  title: string
  authorNickname: string
  createdAt: Date // TODO : 확인 필요함.
}

export interface ITeamNoticeList extends ITeamNoticeBase {
  postId: number
}

export interface ITeamNoticeDetail extends ITeamNoticeBase {
  content: string
  isAuthor: boolean
}
