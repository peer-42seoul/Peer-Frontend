export interface IJob {
  title: string
  writerName: string
  createdAt: string
  id: number
}

export interface IJobDetail extends IJob {
  content: string
}
