'use client'
import useAxiosWithAuth from '@/api/config'
import { ProjectType } from '@/app/panel/MainPage'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useToast from '@/hook/useToast'
import { IMainCard } from '@/types/IPostDetail'
import {
  AlertColor,
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import InterestsContents from './panel/InterestsContents'
import CuTextModal from '@/components/CuTextModal'
import * as pageStyle from '../panel/my-page.style'
import * as style from './interests.style'

interface IInterestResponse {
  postList: IMainCard[]
  isLast: boolean
}

const TypeTabs = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: React.SyntheticEvent, newValue: string) => void
}) => {
  const { isPc } = useMedia()

  const getColor = (value: string) => {
    if (value === type) {
      return 'text.normal'
    } else if (isPc) {
      return 'text.alternative'
    }
    return 'text.assistive'
  }

  return (
    <Tabs
      value={type}
      onChange={handleChange}
      aria-label="menu tabs"
      variant="fullWidth"
      sx={{
        '& .MuiTabs-indicator': {
          display: 'none',
        },
        '& .MuiTabs-indicatorSpan': {
          display: 'none',
        },
      }}
    >
      <Tab
        label={
          <Typography variant="Body2" color={getColor('PROJECT')}>
            프로젝트
          </Typography>
        }
        value={'PROJECT'}
        sx={isPc ? style.tabPcStyle : style.tabMobileStyle}
      />
      <Tab
        label={
          <Typography variant="Body2" color={getColor('STUDY')}>
            스터디
          </Typography>
        }
        value={'STUDY'}
        sx={isPc ? style.tabPcStyle : style.tabMobileStyle}
      />
      {/* <Tab
        label={
          <Typography
            variant="Body2"
            color={getColor('SHOWCASE')}
          >
            쇼케이스
          </Typography>
        }
        value={'SHOWCASE'}
        sx={isPc ? style.tabPcStyle : style.tabMobileStyle}
      /> */}
    </Tabs>
  )
}

const AlertModal = ({
  isOpen,
  closeModal,
  confirmAction,
}: {
  isOpen: boolean
  closeModal: () => void
  confirmAction: () => void
}) => {
  return (
    <CuTextModal
      open={isOpen}
      onClose={closeModal}
      title={'삭제'}
      content={'정말 삭제하시겠습니까?'}
      containedButton={{
        text: '삭제',
        onClick: confirmAction,
      }}
      textButton={{
        text: '취소',
        onClick: closeModal,
      }}
    />
  )
}

const MyInterests = () => {
  const { isPc } = useMedia()
  const [type, setType] = useState('PROJECT')
  const [page, setPage] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>(
    [] as Array<IMainCard>,
  )
  const axiosWithAuth = useAxiosWithAuth()
  const { CuToast, isOpen: isToastOpen, closeToast, openToast } = useToast()
  const { isOpen: isModalOpen, closeModal, openModal } = useModal()
  const [isDeleting, setIsDeleting] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    message: '',
    severity: '' as AlertColor,
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('newValue: ', newValue)
    console.log('11', event.currentTarget, event.target)
    setType(newValue as string)
    setPostList([])
  }

  const axiosInstance = useAxiosWithAuth()
  const pagesize = 10
  const { data, isLoading, mutate, error } = useSWR<IInterestResponse>(
    `/api/v1/recruit/favorite?type=${type}&page=${page}&pagesize=${pagesize}`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )

  const deleteAll = async () => {
    closeModal()
    setIsDeleting(true)
    return await axiosWithAuth
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/favorite?type=${type}`,
      )
      .then(() => {
        setToastMessage({
          message: '전체 삭제 되었습니다.',
          severity: 'success',
        })
        openToast()
        mutate()
        setIsDeleting(false)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (!isLoading && data && !data.isLast) {
      setPostList((prev) => prev.concat(data.postList))
      if (data?.postList.length === pagesize) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [isLoading, data])

  useEffect(() => {
    if (error && error?.response?.data?.message) {
      setToastMessage({
        severity: 'error',
        message: `${error.response.data.message}`,
      })
      openToast()
    }
  }, [error, openToast])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  return (
    <>
      <CuToast
        open={isToastOpen}
        onClose={closeToast}
        severity={toastMessage.severity}
        message={toastMessage.message}
      />
      <AlertModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        confirmAction={deleteAll}
      />
      <Stack
        direction={'column'}
        spacing={3}
        sx={isPc ? pageStyle.pagePcStyle : pageStyle.pageMobileStyle}
        justifyContent={'center'}
        alignItems={'space-evenly'}
        height={1}
      >
        <TypeTabs type={type} handleChange={handleTabChange} />

        {postList.length ? (
          <InterestsContents
            postList={postList}
            spinner={spinner}
            target={target}
            type={type as ProjectType}
            removeAll={openModal}
            isDeleting={isDeleting}
          />
        ) : (
          <Box
            width={1}
            height={1}
            sx={{
              backgroundColor: isPc ? 'background.secondary' : 'transparent',
              borderRadius: '1rem',
            }}
            position={'relative'}
          >
            {isLoading ? (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ) : (
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                variant="Caption"
              >
                관심있다고 표시한 페이지가 없습니다.
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </>
  )
}

export default MyInterests
