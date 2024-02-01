export interface IPostId {
  postId: number
}

export interface CommentProps {
  data: IComment
  postId: number
}
export interface IComment {
  authorImage: string
  authorNickname: string
  commentId: number
  content: string
  createAt: string
  isAuthor: boolean
}
