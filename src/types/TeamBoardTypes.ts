import { IPagination } from './IPagination'

// Board

// Notice

export interface ITeamNoticeBase {
  title: string
  authorNickname: string
  createdAt: Date // TODO : 확인 필요함.
}

export interface ITeamNotice extends ITeamNoticeBase {
  postId: number
}

export interface ITeamNoticeListData extends IPagination<ITeamNotice[]> {}

export interface ITeamNoticeDetail extends ITeamNoticeBase {
  content: string
  isAuthor: boolean
}
