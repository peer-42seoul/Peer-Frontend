import { debounce } from 'lodash'
import { useState, useEffect, useRef } from 'react'

/**
 * 무한 스크롤 훅
 * @param trigger 데이터를 가져오는 함수
 * @param isEnd 더이상 데이터를 가져올 수 없는지 여부
 */
const useInfiniteScroll = ({
  trigger,
  isEnd,
}: {
  trigger: () => Promise<any>
  isEnd: boolean
}) => {
  const [spinner, setSpinner] = useState(false)
  const ref = useRef<HTMLDivElement>()

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

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    // 컴포넌트가 언마운트되면 IntersectionObserver 해제
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [ref, spinner, debouncedFetchData, isEnd])

  return { ref, spinner }
}

export default useInfiniteScroll
