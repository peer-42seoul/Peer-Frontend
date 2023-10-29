import { debounce } from 'lodash'
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

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
