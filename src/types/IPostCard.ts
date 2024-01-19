import { SxProps } from '@mui/material'
import { ITag } from './IPostDetail'
import { IShowcaseTag } from '@/app/showcase_ref/panel/types'

export interface IPostCard {
  authorImage: string | null // 글 작성자 프로필 이미지
  teamName: string // 팀 이름
  title: string // 글 제목
  postId: number // 글 id
  tagList: IShowcaseTag[]
  image: string | null // 글 대표 이미지 (썸네일)
  sx?: SxProps // 카드 전체 스타일
  onClick?: (e: React.MouseEvent) => void
}

export interface IPostCardShowcase {
  authorImage: string // 글 작성자 프로필 이미지
  teamName: string // 팀 이름
  title: string // 글 제목
  postId: number // 글 id
  tagList: IShowcaseTag[]
  image: string // 글 대표 이미지 (썸네일)
  sx?: SxProps
}

export interface IHitchhikingCardBack {
  content: string // 모집글 글 내용
  memberImage: Array<{ url: string }> // 모집글의 팀원 프로필 이미지
}
