import { ProjectType } from '@/types/IPostDetail'
import { ProjectSort } from '@/app/panel/MainPage'

export interface IDetailOption {
  due1: number
  due2: number
  region1: string
  region2: string
  place: string
  status: string
  tag: string
  isInit?: boolean
}

export interface IMainOptionsStore {
  page: number
  sort: ProjectSort
  type: ProjectType
  init: boolean
  openOption: boolean
  setPage: (page: number) => void
  setSort: (sort: ProjectSort) => void
  setType: (type: ProjectType) => void
  setInit: (init: boolean) => void
  detailOption: IDetailOption
  setDetailOptions: (detailOption: IDetailOption) => void
  setOpenOption: (openOption: boolean) => void
}
