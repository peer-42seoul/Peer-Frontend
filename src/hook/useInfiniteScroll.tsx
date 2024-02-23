import { debounce } from 'lodash'
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import useSWRInfinite from 'swr/infinite'
import { IPagination } from '@/types/IPagination'

/**
 * 무한 요청 훅 (with useSWRInfinite)
 * - GET 요청만 가능합니다.
 * - IPagination 타입의 데이터와 함께 사용할 수 있습니다.
 * @param urlWithoutPageParam : 페이지 번호를 제외한 api request URL
 * @example '/api?param1=1&param2=2' // page=1 은 제외합니다.
 * @param fetcher : 데이터를 가져오는 함수
 * @param config
 * @example
 * const fetcher = (url: string) => axios.get(url).then((res) => res.data)
 * @returns { data, error, isLoading, size, setSize }
 * @description
 * - data : 데이터
 * - error : 에러
 * - isLoading : 로딩 여부
 * - size : 현재 페이지 번호 (getKey 함수의 pageIndex이고 초깃값은 0)
 * - setSize : 페이지 번호를 변경하는 함수 (보통 setSize(size + 1)로 사용)
 */
export const useInfiniteSWR = (
  urlWithoutPageParam: string,
  fetcher: (url: string) => Promise<any>,
  config?: any,
) => {
  const getKey = (pageIndex: number, previousPageData: IPagination<any>) => {
    if (previousPageData && previousPageData.last) {
      return null // 마지막 페이지면 null 반환 (데이터를 가져오지 않음)
    }
    return `${urlWithoutPageParam}&page=${pageIndex + 1}` // 페이지 번호를 포함한 요청 URL 반환
  }
  const { data, error, isLoading, isValidating, size, setSize } =
    useSWRInfinite<IPagination<any>>(getKey, fetcher, {
      ...config,
      revalidateFirstPage: false,
    })

  return {
    data,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
  }
}

// useInfiniteSWR 훅과 IntersectionObserver를 함께 쓰기 위한 무한 스크롤 훅
export const useInfiniteSWRScroll = (
  urlWithoutPageParam: string,
  fetcher: (url: string) => Promise<any>,
  config?: any,
) => {
  const { data, error, isLoading, size, setSize, isValidating } =
    useInfiniteSWR(urlWithoutPageParam, fetcher, config)
  const targetRef = useRef<HTMLDivElement>(null)
  const isLoadMore = !!(
    !isLoading &&
    data &&
    data[data.length - 1]?.last === false
  )

  const debouncedFetchData = debounce(() => {
    // 데이터 업데이트. setSpinner을 언제 true할지 정해야.
    setSize(size + 1)
  }, 1000)

  useEffect(() => {
    if (!targetRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && isLoadMore) {
        debouncedFetchData()
      }
    })
    const currentRef = targetRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [debouncedFetchData, targetRef])

  return {
    data,
    error,
    isLoading,
    size,
    setSize,
    targetRef,
    isValidating,
  }
}

/**
 * ANCHOR : 메시지 무한 스크롤 훅 (POST 요청)
 * @param trigger 데이터를 가져오는 함수
 * @param isEnd 더이상 데이터를 가져올 수 없는지 여부
 */
export const useMessageInfiniteScroll = ({
  trigger,
  isEnd,
}: {
  trigger: () => Promise<any>
  isEnd: boolean
}) => {
  const [spinner, setSpinner] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null) // fetch 여부를 결정할 요소
  const scrollRef = useRef<HTMLDivElement>(null) // 스크롤 위치를 결정할 요소

  const debouncedFetchData = debounce(async () => {
    // 데이터 업데이트. setSpinner을 언제 true할지 정해야.
    setSpinner(true)
    await trigger()
    setSpinner(false)
  }, 1000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!spinner && !isEnd) {
            // 스피너를 표시하고 디바운스된 데이터 가져오기 함수 호출
            // 가능한 페이지 양을 도달했다면 더이상 로딩하지 않는다.
            // isEnd가 true면 더이상 로딩하지 않는다.
            debouncedFetchData()
          }
        }
      },
      { threshold: 0.7 },
    )
    const currentRef = targetRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }
    // 컴포넌트가 언마운트되면 IntersectionObserver 해제
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [targetRef, spinner, debouncedFetchData, isEnd])

  return { targetRef, scrollRef, spinner }
}

/**
 * 무한 스크롤 훅
 * @param setPage 페이지 번호를 변경하는 함수
 * @param mutate 데이터를 가져오는 함수
 * @param pageLimit 마지막 페이지 번호
 * @param page 현재 페이지 번호
 */
const useInfiniteScroll = ({
  setPage,
  mutate,
  pageLimit,
  page,
}: {
  setPage: Dispatch<SetStateAction<number>>
  mutate: any
  pageLimit: number
  page: number
}) => {
  const [spinner, setSpinner] = useState(false)
  const target = useRef(null)

  const debouncedFetchData = debounce(async () => {
    // 데이터 업데이트. setSpinner을 언제 true할지 정해야.
    setSpinner(true)
    setPage(page + 1)
    await mutate()
    setSpinner(false)
  }, 1000)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!spinner && page < pageLimit) {
            // 스피너를 표시하고 페이지 번호를 증가시킨 후 디바운스된 데이터 가져오기 함수 호출
            // 가능한 페이지 양을 도달했다면 더이상 로딩하지 않는다.
            debouncedFetchData()
          }
        }
      },
      { threshold: 0.7 },
    )

    const currentTarget = target.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    // 컴포넌트가 언마운트되면 IntersectionObserver 해제
    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [target, spinner, debouncedFetchData, page, pageLimit])

  return { target, spinner }
}

export default useInfiniteScroll
