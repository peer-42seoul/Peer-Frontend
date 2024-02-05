import { SxProps } from '@mui/material'
import { ITag } from './IPostDetail'
import { IShowcaseTag } from '@/app/showcase/panel/types'

export interface IPostCard {
  authorImage: string // 글 작성자 프로필 이미지
  teamName: string // 팀 이름
  title: string // 글 제목
  postId: number // 글 id
  tagList: ITag[]
  image: string // 글 대표 이미지 (썸네일)
  sx?: SxProps // 카드 전체 스타일
  onClick?: (e: React.MouseEvent) => void
}
export interface IPostCardHitchhiking {
  authorImage: string // 글 작성자 프로필 이미지
  authorId: number // 글 작성자 id
  teamName: string // 팀 이름
  title: string // 글 제목
  recruitId: number // 글 id
  tagList: ITag[]
  image: string // 글 대표 이미지 (썸네일)
}

export interface IPostCardShowcase {
  authorImage: string | null // 글 작성자 프로필 이미지
  teamName: string // 팀 이름
  title: string // 글 제목
  postId: number // 글 id
  tagList: IShowcaseTag[]
  image: string | null // 글 대표 이미지 (썸네일)
  isFavorite: boolean
  like: number
  liked: boolean
  sx?: SxProps
  onClick?: (e: React.MouseEvent) => void
}

export interface IHitchhikingCardBack {
  content: string // 모집글 글 내용
  memberImage: Array<{ url: string }> // 모집글의 팀원 프로필 이미지
}

export interface IShowcaseCardBack {
  content: string // 모집글 글 내용
  memberImage: Array<{ url: string }> // 모집글의 팀원 프로필 이미지
}
