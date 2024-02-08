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

export interface ITeamBoardListData extends IPagination<ITeamPost[]> {}

export interface ITeamPostDetail extends ITeamPostBase {
  content: string
  isAuthor: boolean
}

// Notice

export interface ITeamNoticeBase {
  title: string
  nickname: string
  createdAt: Date
}

export interface ITeamNotice extends ITeamNoticeBase {
  postId: number
}

export interface ITeamNoticeListData extends IPagination<ITeamNotice[]> {}

export interface ITeamNoticeDetail extends ITeamNoticeBase {
  content: string
  isAuthor: boolean
}

export interface ITeamBoardComment {
  commentId: number
  authorImage: string
  authorNickname: string
  content: string
  createdAt: Date
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

export interface IEditFormType {
  teamId: string
  postId?: number
  type: 'edit' | 'new' // 수정 | 새로 작성
  handleGoBack: () => void // 취소 버튼
}

export interface IBoardEditFormType extends IEditFormType {
  boardId: number
}
