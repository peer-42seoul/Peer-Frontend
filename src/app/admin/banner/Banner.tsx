'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import {
  Button,
  Container,
  FormControlLabel,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import PageButton from '../panel/PageButton'
import axios from 'axios'
import ImageUploadButton from '@/components/ImageUploadButton'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { Radio } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import CuModal from '@/components/CuModal'
import { idStyle, statusStyle, titleStyle } from './BannerStyles'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'

interface IBannerAllContent {
  bannerId: number
  bannerStatus: string
  bannerType: string // "큰 배너", enum
  title: string
  image: string
  date: string | null
  previewImage: string
  bannerReservationType: string // "즉시" enum
  reservationDate: string | null // "yyyy-MM-dd'T'HH:mm",
  announcementUrl: string //"url"
}

const defaultValues: IBannerAllContent = {
  bannerId: -1,
  bannerStatus: '',
  bannerType: '큰 배너', // enum
  title: '',
  image: '',
  date: null,
  previewImage: '/images/defaultImage.png',
  bannerReservationType: '즉시', // enum
  reservationDate: '',
  announcementUrl: '',
}

interface content {
  bannerId: number
  bannerStatus: string
  title: string
}

// interface IBannerList {
//   image: string
//   writer: string
//   title: string
//   announcementStatus: string // enum
//   reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
//   content: string
// }

// interface IBannerContentView {
// "bannerStatus": string "진행 중", // enum
// "bannerType": string "큰 배너", // enum
// "title": string ,
// "image": string "image url",
// "date": string "yyyy-MM-dd'T'HH:mm",
// "announcementUrl": string "url"
// }

interface IBannerContentWrite {
  bannerType: string // "큰 배너", enum
  title: string
  image: string
  bannerReservationType: string // "즉시" enum
  reservationDate: string | null // "yyyy-MM-dd'T'HH:mm",
  announcementUrl: string //"url"
}

interface IBannerContentEdit {
  bannerId: number
  bannerType: string //"큰 배너", // enum
  title: string
  image: string | null // "url",  // 수정 안되었으면 null
  bannerReservationType: string // "즉시", // enum
  reservationDate: string | null //"yyyy-MM-dd'T'HH:mm",
  announcementUrl: string //"url"
}

const Banner = () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API

  const [page, setPage] = useState<number>(1)
  const totalPageVar = useRef<number>(1)
  const [content, setContent] = useState<content[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IBannerAllContent>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })
  const [writeMode, setWriteMode] = useState<string>('')
  let previewImage = watch('previewImage')
  const [fourthPage, setFourthPage] = useState<boolean>(false)
  const [fifthPage, setFifthPage] = useState<boolean>(false)
  const params = {
    page: page - 1,
    size: 5,
  }
  // 백엔드 API에서는 page가 0부터 시작하므로 page - 1로 설정

  const { openToast } = useToast()

  const currentId = useRef<number>(-1)
  const {
    openModal: openRemoveModal,
    closeModal: closeRemoveModal,
    isOpen: isRemoveModalOpen,
  } = useModal()

  const [currentReservationType, setCurrentReservationType] = useState('없음')
  const [currentBannerType, setCurrentBannerType] = useState('')

  // 초기 페이지 진입시 공지사항 목록 불러오기
  useEffect(() => {
    let isMounted = true // 마운트 상태를 추적하는 변수 추가
    axios
      .get(`${API_URL}/api/v1/admin/banner`, {
        params,
        withCredentials: true,
      })
      .then((res) => {
        if (isMounted) {
          totalPageVar.current = res.data.totalPages
          setContent(res.data.content)
        }
      })

    return () => {
      isMounted = false
    }
  }, [page])

  // 페이지가 바뀔 때마다 페이지 버튼의 활성화 여부를 결정
  // fifthPage 는 4번째 페이지 버튼의 활성화 여부, fourthPage 는 5번째 페이지 버튼의 활성화 여부
  useEffect(() => {
    if (page === totalPageVar.current) {
      setFourthPage(false)
      setFifthPage(false)
    } else if (page + 1 === totalPageVar.current) {
      setFourthPage(true)
      setFifthPage(false)
    } else if (page + 2 <= totalPageVar.current) {
      setFourthPage(true)
      setFifthPage(true)
    }
  }, [page, totalPageVar.current])

  // 모달이 닫힐 때마다 폼 입력값을 reset
  useEffect(() => {
    if (open === false) reset()
  }, [open])

  // ISO 로 쉽게 변환 가능함 hyna님 코멘트 확인
  const formatDate = (date: Date) => {
    const now = new Date()
    if (date < now) return 'error'

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const onSubmit = async (data: IBannerAllContent) => {
    if (data.previewImage === '') {
      alert('이미지를 삽입해주세요')
      return
    }
    let DateFormed = ''
    if (data.bannerReservationType === '예약') {
      if (data.reservationDate === null) {
        return
      }
      DateFormed = formatDate(new Date(data.reservationDate))
      if (DateFormed === 'error') {
        alert('예약 시간은 현재 시간보다 이후여야 합니다.')
        return
      }
    }
    let submitData: IBannerContentWrite
    submitData = {
      bannerType: data.bannerType,
      title: data.title,
      image: data.previewImage.split(',')[1],
      bannerReservationType: data.bannerReservationType,
      reservationDate:
        data.bannerReservationType === '예약' ? DateFormed : null,
      announcementUrl: data.announcementUrl,
    }
    await axios
      .post(`${API_URL}/api/v1/admin/banner`, submitData, {
        withCredentials: true,
      })
      .then(() => {
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/banner`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
            openToast({
              message: '배너 글을 성공적으로 등록하였습니다.',
              severity: 'success',
            })
          })
      })
      .catch((err) => {
        alert('공지사항 등록 실패 \n사유 : ' + err)
      })
  }

  const onSubmitEdit = async (data: IBannerAllContent) => {
    let submitData: IBannerContentEdit
    let DateFormed = ''
    if (data.bannerReservationType === '예약') {
      if (data.reservationDate === null) {
        return
      }
      DateFormed = formatDate(new Date(data.reservationDate))
      if (DateFormed === 'error') {
        alert('예약 시간은 현재 시간보다 이후여야 합니다.')
        return
      }
    }
    if ('bannerId' in data && 'reservationDate' in data) {
      submitData = {
        bannerId: data.bannerId,
        bannerType: data.bannerType,
        title: data.title,
        image:
          data.previewImage === '' ? null : data.previewImage.split(',')[1],
        bannerReservationType: data.bannerReservationType,
        reservationDate:
          data.bannerReservationType === '예약' ? data.reservationDate : null,
        announcementUrl: data.announcementUrl,
      }
    } else return

    await axios
      .put(`${API_URL}/api/v1/admin/banner`, submitData, {
        withCredentials: true,
      })
      .then(() => {
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/banner`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
            openToast({
              message: '배너 글을 성공적으로 수정하였습니다.',
              severity: 'success',
            })
          })
      })
      .catch((err) => {
        alert('공지사항 수정 실패 \n사유 : ' + err)
      })
  }

  const onHandleEdit = async () => {
    setWriteMode('edit')
  }

  const onHandleView = async (id: number) => {
    setWriteMode('view')
    setOpen(true)
    await axios
      .get(`${API_URL}/api/v1/admin/banner/${id}`, { withCredentials: true })
      .then((res) => {
        setValue('bannerId', id)
        setValue('bannerStatus', res.data.bannerStatus)
        setValue('bannerType', res.data.bannerType)
        setCurrentBannerType(res.data.bannerType)
        setValue('title', res.data.title)
        setValue('previewImage', res.data.image)
        setValue('date', res.data.date)
        setValue('announcementUrl', res.data.announcementUrl)

        let reservationStatusValue = '' // 기본값
        if (
          res.data.bannerStatus === '종료' ||
          res.data.bannerStatus === '진행 중'
        ) {
          reservationStatusValue = '즉시'
        } else if (res.data.bannerStatus === '예약') {
          reservationStatusValue = '예약'
        }
        setValue('bannerReservationType', reservationStatusValue)
      })
      .catch((err) => {
        alert('공지사항 조회 실패 \n사유 : ' + err)
      })
  }

  const onHandleRunOrEnd = async (mode: string) => {
    const bannerId = getValues('bannerId')
    axios
      .post(
        `${API_URL}/api/v1/admin/banner/${mode}`,
        { bannerId },
        { withCredentials: true },
      )
      .then(() => {
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/banner`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            setContent(res.data.content)
            openToast({
              message: `배너를 ${mode}처리 하였습니다.`,
              severity: 'success',
            })
          })
      })
      .catch(() => {
        alert(`공지사항 ${mode} 처리 실패`)
      })
  }

  const onHandleDelete = async (bannerId: number) => {
    axios
      .delete(`${API_URL}/api/v1/admin/banner`, {
        data: { bannerId: bannerId },
        withCredentials: true,
      })
      .then(() => {
        setOpen(false)
        alert(bannerId + '번 배너가 삭제되었습니다.')
        closeRemoveModal()
        axios
          .get(`${API_URL}/api/v1/admin/banner`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            setContent(res.data.content)
            openToast({
              message: '배너 글을 성공적으로 삭제하였습니다.',
              severity: 'success',
            })
          })
      })
      .catch((err) => {
        alert('배너 삭제 실패 \n 사유: ' + err)
      })
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5rem',
        width: '80rem',
        height: '20rem',
      }}
    >
      <Stack>
        {/* 새 글 버튼 */}
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'Headline'} align="center">
            배너 관리
          </Typography>
          <Box justifyContent={'right'}>
            <Button
              variant={'contained'}
              onClick={() => {
                setWriteMode('write')
                previewImage = watch('previewImage')
                setOpen(true)
                setValue(
                  'reservationDate',
                  formatDate(new Date(Date.now() + 3600000)),
                )
              }}
            >
              새 글
            </Button>
          </Box>
        </Stack>
        {/* 배너 리스트 */}
        <Stack sx={{ width: '45rem', height: '35rem' }}>
          <Stack>
            {content?.map((item) => (
              <Stack
                direction={'row'}
                display={'flex'}
                justifyContent={'space-between'}
                sx={{ width: '90%', height: '90%' }}
                key={item.bannerId}
              >
                <Box
                  sx={{ width: '5%', display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant={'Body1'} sx={idStyle}>
                    {item.bannerId}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: '10%',
                    display: 'flex',
                    justifyContent: 'center', // 가운데 정렬을 위해 추가
                    alignItems: 'center',
                    backgroundColor:
                      item.bannerStatus === '진행 중'
                        ? 'green.normal'
                        : item.bannerStatus === '예약'
                          ? 'yellow.normal'
                          : 'red.normal',
                  }}
                >
                  <Typography variant={'body1'} sx={statusStyle}>
                    {item.bannerStatus}
                  </Typography>
                </Box>
                <Button
                  onClick={() => onHandleView(item.bannerId)}
                  sx={{ width: '80%' }}
                >
                  <Typography variant={'body1'} sx={titleStyle}>
                    {item.title}
                  </Typography>
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* 페이지 버튼 */}
        <Stack direction={'row'} justifyContent={'center'}>
          <PageButton
            page={page}
            setPage={setPage}
            pageFourth={fourthPage}
            pageFifth={fifthPage}
            totalPage={totalPageVar.current}
          />
        </Stack>
      </Stack>
      {/* 새 글쓰기 모달 */}
      <CuModal
        title={
          writeMode === 'write'
            ? '새 배너 쓰기'
            : writeMode === 'edit'
              ? '배너 수정하기'
              : '배너 보기'
        }
        open={open}
        onClose={() => setOpen(false)}
        mobileFullSize={false}
      >
        <Container>
          {writeMode === 'view' ? (
            <Box>
              <Image
                src={previewImage}
                width={currentBannerType === '작은 배너' ? 251 : 946}
                height={currentBannerType === '작은 배너' ? 100 : 200}
                alt="Picture of the announcement"
              />
            </Box>
          ) : (
            <ImageUploadButton
              setPreviewImage={(image: string) =>
                setValue('previewImage', image)
              }
              register={register('image')}
            >
              <Box>
                <Image
                  src={previewImage}
                  width={currentBannerType === '작은 배너' ? 251 : 946}
                  height={currentBannerType === '작은 배너' ? 100 : 200}
                  alt="Picture of the announcement"
                />
              </Box>
            </ImageUploadButton>
          )}
          {/* 배너 유형 선택 */}
          <Typography variant={'Title2'}>배너 유형</Typography>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Controller
              name="bannerType"
              control={control}
              defaultValue={getValues('bannerType')}
              rules={{ required: '배너 유형을 선택해주세요' }} // 필수 조건 추가
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  onChange={(e) => {
                    setCurrentBannerType(e.target.value)
                    field.onChange(e)
                  }}
                >
                  <FormControlLabel
                    value="큰 배너"
                    control={<Radio />}
                    label="큰 배너 (권장 946*200)"
                    disabled={writeMode === 'view' || writeMode === 'edit'}
                  />
                  <FormControlLabel
                    value="작은 배너"
                    control={<Radio />}
                    label="작은 배너 (권장 251*100)"
                    disabled={writeMode === 'view' || writeMode === 'edit'}
                  />
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.bannerStatus && (
            <Typography color="error" variant="body2">
              {errors.bannerStatus.message}
            </Typography>
          )}
          {/* 배너 제목 */}
          <Typography variant={'Title2'}>제목</Typography>
          <TextField
            {...register('title', {
              required: '제목은 필수 입력 항목입니다.',
              maxLength: {
                value: 30,
                message: '제목은 30자 이내로 입력해주세요.',
              },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={writeMode === 'view'}
          />
          <Typography variant={'Body1'}>관련 글 링크</Typography>
          <TextField
            disabled={writeMode === 'view'}
            {...register('announcementUrl', {
              required: 'url은 필수 입력 항목입니다.',
              pattern: {
                value:
                  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
                message: '유효한 URL 주소를 입력해주세요.',
              },
            })}
            error={!!errors.announcementUrl}
            helperText={errors.announcementUrl?.message}
          />
          {/* 배너 예약 설정 (라디오 버튼) */}
          <Stack>
            <Typography variant={'Title2'}>배너 예약 하기</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Controller
                name="bannerReservationType"
                control={control}
                defaultValue={getValues('bannerReservationType')}
                rules={{ required: '배너 예약 상태를 설정해주세요' }} // 필수 조건 추가
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    onChange={(e) => {
                      setCurrentReservationType(e.target.value)
                      field.onChange(e)
                    }}
                  >
                    <FormControlLabel
                      value="즉시"
                      control={<Radio />}
                      label="즉시 게제"
                      disabled={
                        writeMode === 'view' ||
                        (writeMode === 'edit' &&
                          getValues('bannerStatus') !== '예약')
                      }
                    />
                    <FormControlLabel
                      value="예약"
                      control={<Radio />}
                      label="예약 게제 및 알림"
                      disabled={
                        writeMode === 'view' ||
                        (writeMode === 'edit' &&
                          getValues('bannerStatus') !== '예약')
                      }
                    />
                  </RadioGroup>
                )}
              />
            </Stack>
            {errors.bannerStatus && (
              <Typography color="error" variant="body2">
                {errors.bannerStatus.message}
              </Typography>
            )}
            {/* 예약 날짜 선택 */}
            <Controller
              name="reservationDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DateTimePicker
                  defaultValue={dayjs(
                    getValues('date') === null
                      ? new Date(Date.now() + 3600000)
                      : getValues('date'),
                  )}
                  onChange={onChange}
                  ampm={false}
                  format="YYYY-MM-DD HH:mm"
                  disabled={
                    writeMode === 'view' || currentReservationType !== '예약'
                  }
                  sx={{ width: '12rem' }}
                />
              )}
              rules={
                getValues('bannerReservationType') === '예약'
                  ? { required: 'Date and Time required' }
                  : undefined
              }
            />
          </Stack>
          {/* 버튼 */}
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button variant={'contained'} onClick={() => setOpen(false)}>
              취소
            </Button>
            {/* 예약 -> 게제된 게시물 <-> 종료처리된 게시물 */}
            {writeMode === 'view' ? (
              getValues('bannerStatus') === '예약' ? (
                <Button
                  variant={'contained'}
                  onClick={() => onHandleRunOrEnd('publish')}
                >
                  게제
                </Button>
              ) : getValues('bannerStatus') === '진행 중' ? (
                <Button
                  variant={'contained'}
                  onClick={() => onHandleRunOrEnd('termination')}
                >
                  종료
                </Button>
              ) : (
                <Button
                  variant={'contained'}
                  onClick={() => onHandleRunOrEnd('publish')}
                >
                  게제
                </Button>
              )
            ) : null}
            {writeMode === 'view' ? (
              <Button
                variant={'contained'}
                onClick={() => {
                  currentId.current = getValues('bannerId')
                  openRemoveModal()
                }}
              >
                삭제
              </Button>
            ) : null}
            {writeMode === 'view' ? (
              <Button variant={'contained'} onClick={() => onHandleEdit()}>
                수정
              </Button>
            ) : writeMode === 'edit' ? (
              <Button
                variant={'contained'}
                onClick={handleSubmit(onSubmitEdit)}
              >
                수정완료
              </Button>
            ) : (
              <Button variant={'contained'} onClick={handleSubmit(onSubmit)}>
                등록
              </Button>
            )}
          </Stack>
          <CuTextModal
            title="태그 삭제하기"
            open={isRemoveModalOpen}
            onClose={closeRemoveModal}
            content="정말 태그를 삭제하시겠습니까?"
            textButton={{
              text: '취소',
              onClick: closeRemoveModal,
            }}
            containedButton={{
              text: '삭제',
              onClick: () => onHandleDelete(currentId.current),
            }}
          />
        </Container>
      </CuModal>
    </Container>
  )
}

export default Banner
