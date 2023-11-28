'use client'
import useAxiosWithAuth from '@/api/config'
import { ProjectType } from '@/app/panel/MainPage'
import CloseButton from '@/components/CloseButton'
import CuButton from '@/components/CuButton'
import CuModal from '@/components/CuModal'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import useMedia from '@/hook/useMedia'
import useModal from '@/hook/useModal'
import useToast from '@/hook/useToast'
import { IMainCard } from '@/types/IPostDetail'
import {
  AlertColor,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import InterestsContents from './panel/InterestsContents'

interface IInterestResponse {
  postList: IMainCard[]
  isLast: boolean
}

const TypeToggle = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: SelectChangeEvent) => void
}) => {
  console.log('dropdown', type)
  return (
    <Select value={type} onChange={handleChange} variant="standard">
      <MenuItem value={'PROJECT'}>프로젝트</MenuItem>
      <MenuItem value={'STUDY'}>스터디</MenuItem>
      {/* <MenuItem value={'showcase'}>쇼케이스</MenuItem> 2step */}
    </Select>
  )
}

const TypeTabs = ({
  type,
  handleChange,
}: {
  type: string
  handleChange: (e: React.SyntheticEvent, newValue: string) => void
}) => {
  console.log('tab', type)

  return (
    <Tabs
      value={type}
      onChange={handleChange}
      aria-label="menu tabs"
      variant="fullWidth"
    >
      <Tab label="프로젝트" value={'PROJECT'} />
      <Tab label="스터디" value={'STUDY'} />
      {/* <Tab label="쇼케이스" value={'showcase'} /> */}
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
    <CuModal
      open={isOpen}
      handleClose={closeModal}
      ariaTitle=""
      ariaDescription=""
    >
      <Stack direction={'column'}>
        <Typography>삭제</Typography>
        <CloseButton
          action={closeModal}
          style={{ border: 'none', color: 'black' }}
        />
      </Stack>
      <Typography>정말 삭제하시겠습니까?</Typography>
      <Stack direction={'column'}>
        <CuButton
          message="취소"
          action={closeModal}
          variant="contained"
          style={{ width: '50%' }}
        />
        <CuButton
          message="삭제"
          action={confirmAction}
          variant="contained"
          style={{ width: '50%' }}
        />
      </Stack>
    </CuModal>
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    console.log('event.target.value as string : ', event.target.value as string)
    setType(event.target.value as string)
    setPostList([])
  }

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
      if (data.postList.length === pagesize) {
        setPageLimit((prev) => prev + 1)
      }
    }
    if (error && error?.response?.data?.message) {
      setToastMessage({
        severity: 'error',
        message: `${error.response.data.message}`,
      })
      openToast()
    }
  }, [error, isLoading, data, openToast])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  return (
    <div>
      <CuToast
        open={isToastOpen}
        onClose={closeToast}
        severity={toastMessage.severity}
      >
        {toastMessage.message}
      </CuToast>
      <AlertModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        confirmAction={deleteAll}
      />
      {isPc ? (
        <TypeToggle type={type} handleChange={handleSelectChange} />
      ) : (
        <TypeTabs type={type} handleChange={handleTabChange} />
      )}
      <CuButton
        variant="text"
        message="전체 삭제"
        action={openModal}
        disabled={isDeleting}
      />

      {postList.length ? (
        <InterestsContents
          postList={postList}
          spinner={spinner}
          target={target}
          type={type as ProjectType}
        />
      ) : isLoading ? (
        <Typography>로딩 중</Typography>
      ) : (
        <Typography>관심있다고 표시한 페이지가 없습니다.</Typography>
      )}
    </div>
  )
}

export default MyInterests
