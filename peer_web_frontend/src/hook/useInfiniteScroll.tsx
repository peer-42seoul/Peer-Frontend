import { debounce } from 'lodash'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = ({ initialPage = 1, initialSpinner = false, targetRef, setPage }) => {
    const [spinner, setSpinner] = useState(initialSpinner);

    const debouncedFetchData = debounce(() => {
        if (!spinner) {
            // 데이터 업데이트
            setPage((prevPage) => prevPage + 1);
            setSpinner(false);
        }
    }, 1000);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (!spinner) {
                        // 스피너를 표시하고 페이지 번호를 증가시킨 후 디바운스된 데이터 가져오기 함수 호출
                        setSpinner(true);
                        setPage((prevPage) => prevPage + 1);
                        debouncedFetchData();
                    }
                }
            },
            { threshold: 0.7 },
        );

        const currentTarget = targetRef.current;

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        // 컴포넌트가 언마운트되면 IntersectionObserver 해제
        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, spinner, debouncedFetchData, setPage]);

    return { targetRef, spinner };
};

export default useInfiniteScroll;


// Example usage:
// const { target, messageList } = useInfiniteScroll(fetchData, { initialPage: 1, initialMessageList: [] });

export default useInfiniteScroll;
