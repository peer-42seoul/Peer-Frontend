export interface IPagination<T> {
  content: T
  pageable: {
    sort: {
      empty: boolean
      unsorted: boolean
      sorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: {
    empty: boolean
    unsorted: boolean
    sorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}
