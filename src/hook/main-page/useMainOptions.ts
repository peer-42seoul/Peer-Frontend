import useMainOptionsStore from '@/states/main-page/useMainOptionsStore'
import { useCallback, useEffect } from 'react'
import { ProjectType } from '@/types/IPostDetail'
import { ProjectSort } from '@/app/panel/MainPage'
import { useRouter, useSearchParams } from 'next/navigation'
import { IDetailOption } from '@/types/IMainOptions'

const useMainOptions = () => {
  const {
    type,
    sort,
    page,
    init,
    detailOption,
    setPage,
    setInit,
    setSort,
    setType,
    setDetailOptions,
  } = useMainOptionsStore()
  const searchParams = useSearchParams()
  const queryKeyword = searchParams.get('keyword') ?? ''
  const searchType =
    searchParams.get('type') === 'PROJECT' ? 'PROJECT' : 'STUDY'
  const router = useRouter()

  const dueObject: { [key: number]: string } = {
    0: '1주일',
    20: '1개월',
    40: '3개월',
    60: '6개월',
    80: '9개월',
    100: '12개월 이상',
  }

  //option 설정하기
  const pageSize = 6

  const optionsQuery = `?type=${type ?? 'STUDY'}&sort=${
    sort ?? 'latest'
  }&page=${page}&pageSize=${pageSize}&keyword=${queryKeyword}&due=${
    dueObject[detailOption.due1]
  }&due=${dueObject[detailOption.due2]}&region1=${
    detailOption.region1
  }&region2=${detailOption.region2}&place=${detailOption.place}&status=${
    detailOption.status
  }&tag=${detailOption.tag}`

  useEffect(() => {
    if (queryKeyword !== '') {
      setType(searchType)
      setInit(false)
    }
  }, [queryKeyword, searchType])

  const handleType = useCallback(
    (value: ProjectType) => {
      setInit(false)
      setType(value)
      //type이 변경될 경우 초기화
      setPage(1)
      setDetailOptions({
        ...detailOption,
        due1: 0,
        due2: 100,
        region1: '',
        region2: '',
        place: '',
        status: '',
        tag: '',
      })
      setSort('latest')
      router.replace(`?type=${value}`)
    },
    [router],
  )

  const handleSort = useCallback(
    (value: ProjectSort) => {
      setSort(value)
      setPage(1)
    },
    [setPage, setSort],
  )

  const handleOption = useCallback(
    (value: IDetailOption) => {
      setDetailOptions({ ...detailOption, ...value })
      setPage(1)
    },
    [detailOption, setDetailOptions, setPage],
  )

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage)
  }

  return {
    optionsQuery,
    handleSort,
    handleType,
    handleChangePage,
    handleOption,
    type,
    sort,
    page,
    init,
    detailOption,
    queryKeyword,
  }
}

export default useMainOptions
