'use client'
import useAxiosWithAuth from '@/api/config'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import {
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
import * as style from './interests.style'
import { centeredPosition } from '@/constant/centerdPosition.style'
import { IPagination } from '@/types/IPagination'
import { ITag } from '@/types/IPostDetail'
import { getUniqueArray } from '@/utils/getUniqueArray'

export interface IDefaultPostCard {
  recruit_id: number
  title: string
  image: string
  userId: number
  userNickname: string
  userImage: string
  status: string
  skillList: Array<{
    tagId: number
    name: string
    color: string
  }>
  isFavorite: boolean
}

export interface IShowcasePostCard {
  showcaseId: number
  image: string
  teamLogo: string
  teamName: string
  content: string
  tags: Array<ITag>
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
          <Typography variant="Body2" color={getColor('STUDY')}>
            스터디
          </Typography>
        }
        value={'STUDY'}
        sx={isPc ? style.tabPcStyle : style.tabMobileStyle}
      />
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
          <Typography variant="Body2" color={getColor('SHOWCASE')}>
            쇼케이스
          </Typography>
        }
        value={'SHOWCASE'}
        sx={isPc ? style.tabPcStyle : style.tabMobileStyle}
      />
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
  const [type, setType] = useState('STUDY')
  const [page, setPage] = useState<number>(1)
  const [pageLimit, setPageLimit] = useState<number>(1)

  const [postList, setPostList] = useState<Array<IDefaultPostCard>>([])
  const [showcaseList, setShowcaseList] = useState<Array<IShowcasePostCard>>([])

  const axiosWithAuth = useAxiosWithAuth()

  const { isOpen: isModalOpen, closeModal, openModal } = useModal()
  const [isDeleting, setIsDeleting] = useState(false)

  const { openToast, closeToast } = useToast()

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue as string)
    setPostList([])
    setShowcaseList([])
  }

  const axiosInstance = useAxiosWithAuth()
  const pagesize = 10
  const { data, isLoading, mutate, error } = useSWR<
    IPagination<Array<IDefaultPostCard> | Array<IShowcasePostCard>>
  >(
    `/api/v1/mypage/favorite${
      type === 'SHOWCASE' ? '/showcase?' : `?type=${type}&`
    }page=${page}&pageSize=${pagesize}`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const deleteAll = async () => {
    closeModal()
    closeToast()
    setIsDeleting(true)
    return await axiosWithAuth
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mypage/favorite?type=${type}`,
      )
      .then(() => {
        openToast({
          message: '전체 삭제 되었습니다.',
          severity: 'success',
        })
        setPostList([])
      })
      .catch((error) => {
        if (error.response.status === 500) {
          openToast({
            message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
            severity: 'error',
          })
        } else {
          openToast({
            message: error.response.data.message,
            severity: 'error',
          })
        }
      })
      .finally(() => setIsDeleting(false))
  }

  useEffect(() => {
    if (!isLoading && data) {
      if (type === 'SHOWCASE') {
        setShowcaseList((prev) => {
          return getUniqueArray(
            prev.concat(data.content as Array<IShowcasePostCard>),
            'showcaseId',
          )
        })
      } else {
        setPostList((prev) => {
          return getUniqueArray(
            prev.concat(data.content as Array<IDefaultPostCard>),
            'recruit_id',
          )
        })
      }

      if (data.last === false) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [data])

  useEffect(() => {
    if (error && error?.response?.data?.message) {
      openToast({
        severity: 'error',
        message: `${error.response.data.message}`,
      })
    }
  }, [error])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  const InterestContentsCallback = React.useCallback(() => {
    if (
      (type !== 'SHOWCASE' && postList.length) ||
      (type === 'SHOWCASE' && showcaseList.length)
    ) {
      return (
        <InterestsContents
          postList={postList}
          showcaseList={showcaseList}
          spinner={spinner}
          target={target}
          removeAll={openModal}
          isDeleting={isDeleting}
          type={type}
          setPostList={setPostList}
          setShowcaseList={setShowcaseList}
        />
      )
    } else if (
      isLoading &&
      ((type !== 'SHOWCASE' && !postList.length) ||
        (type === 'SHOWCASE' && !showcaseList.length))
    ) {
      return (
        <Box
          width={1}
          height={1}
          sx={{
            backgroundColor: ['transparent', 'background.secondary'],
            borderRadius: '1rem',
          }}
          position={'relative'}
        >
          <CircularProgress sx={centeredPosition} />
        </Box>
      )
    } else {
      return (
        <Box
          width={1}
          height={1}
          sx={{
            backgroundColor: ['transparent', 'background.secondary'],
            borderRadius: '1rem',
          }}
          position={'relative'}
        >
          <Typography sx={centeredPosition} variant="Caption">
            관심있다고 표시한 페이지가 없습니다.
          </Typography>
        </Box>
      )
    }
  }, [isLoading, postList, showcaseList, type])

  return (
    <>
      <AlertModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        confirmAction={deleteAll}
      />
      <Stack
        direction={'column'}
        spacing={3}
        justifyContent={'center'}
        alignItems={'space-evenly'}
        height={1}
      >
        <TypeTabs type={type} handleChange={handleTabChange} />
        <InterestContentsCallback />
      </Stack>
    </>
  )
}

export default MyInterests
