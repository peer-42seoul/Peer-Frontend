import { ITag } from './IPostDetail'

export interface IPostCard {
  authorImage: string // 글 작성자 프로필 이미지
  teamName: string // 팀 이름
  title: string // 글 제목
  recruitId: number // 글 id
  tagList: ITag[]
  image: string // 글 대표 이미지 (썸네일)
}
