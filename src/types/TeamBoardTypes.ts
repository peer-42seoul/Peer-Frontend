import { IPagination } from './IPagination'

// Board

export interface ITeamBoard {
  boardId: number
  boardName: string
}

export interface ITeamPostBase {
  postId: number
  title: string
  nickname: string
  hit: number
  date: Date
}

export interface ITeamPost extends ITeamPostBase {}
export interface ITeamBoardList {
  boardId: number
  boardName: string
  posts: ITeamPost[]
}

export interface ITeamBoardListData extends IPagination<ITeamBoardList[]> {}

export interface ITeamPostDetail extends ITeamPostBase {
  content: string
}

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

export interface ITeamComment {
  answerId: number
  authorImage: string
  authorNickname: string
  content: string
  createdAt: Date
  isAuthor: boolean
}
