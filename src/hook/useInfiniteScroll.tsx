import { debounce } from 'lodash'
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

/**
 * 메시지 무한 스크롤 훅
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
  const targetRef = useRef<HTMLDivElement>() // fetch 여부를 결정할 요소
  const scrollRef = useRef<HTMLDivElement>() // 스크롤 위치를 결정할 요소

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

export const useInfiniteScrollHook = (
  setPage: Dispatch<SetStateAction<number>>,
  mutate: any,
  isEnd: boolean,
  page: number
) => {
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
          if (!spinner && !isEnd) {
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
  }, [target, spinner, debouncedFetchData, page, isEnd])

  return { target, spinner }
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
