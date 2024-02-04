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
// import ToastEditor from '@/components/ToastUIEditor'
// import ToastViewer from '@/components/ToastUIViewer'
import { idStyle, statusStyle, titleStyle } from './AnnounceStyles'

interface IAnnounceAllContent {
  announcementId: number
  previewImage: string
  image: string
  title: string
  writer: string
  view: number
  content: string
  announcementStatus: string // enum
  date: null | string
  announcementNoticeStatus: string
  reservationDate: null | string
}

const defaultValues: IAnnounceAllContent = {
  announcementId: -1,
  previewImage: '/images/defaultImage.png',
  image: '',
  title: '',
  writer: '',
  view: -1,
  announcementStatus: '',
  date: null,
  announcementNoticeStatus: '',
  reservationDate: null,
  content: '',
}

interface content {
  announcementId: number
  announcementStatus: string
  image: string
  title: string
}

// interface IAnnounceList {
//   image: string
//   writer: string
//   title: string
//   announcementStatus: string // enum
//   reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
//   content: string
// }

// interface IAnnounceContentView {
//   announcementId: number
//   announcementNoticeStatus: string
//   previewImage: string
//   title: string
//   writer: string
//   view: number
//   content: string
//   date: null | string
// }

interface IAnnounceContentWrite {
  image: string
  writer: string
  title: string
  announcementNoticeStatus: string // enum
  reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
  content: string
}

interface IAnnounceContentEdit {
  announcementId: number
  image: string | null
  writer: string
  title: string
  announcementNoticeStatus: string // enum
  reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
  content: string
}

const Announce = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

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
  } = useForm<IAnnounceAllContent>({
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

  const [currentNoticeStatus, setCurrentNoticeStatus] = useState('없음')

  // 초기 페이지 진입시 공지사항 목록 불러오기
  useEffect(() => {
    let isMounted = true // 마운트 상태를 추적하는 변수 추가
    axios
      .get(`${API_URL}/api/v1/admin/announcement`, {
        params,
        // withCredentials: true,
        // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
      })
      .then((res) => {
        if (isMounted) {
          console.log('res : ', res)
          totalPageVar.current = res.data.totalPages
          console.log(totalPageVar)
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
    console.log('page render')
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

  const onSubmit = async (data: IAnnounceAllContent) => {
    console.log('onSubmit', data)
    if (data.previewImage === '') {
      alert('이미지를 삽입해주세요')
      return
    }
    let DateFormed = ''
    if (data.announcementNoticeStatus === '예약') {
      if (data.reservationDate === null) {
        console.log('there is no reservationDate therefore return')
        return
      }
      DateFormed = formatDate(new Date(data.reservationDate))
      if (DateFormed === 'error') {
        alert('예약 시간은 현재 시간보다 이후여야 합니다.')
        return
      }
    }
    let submitData: IAnnounceContentWrite
    if ('announcementId' in data && 'reservationDate' in data) {
      submitData = {
        image: data.previewImage.split(',')[1],
        writer: data.writer,
        title: data.title,
        announcementNoticeStatus: data.announcementNoticeStatus, // 'announcementStatus'를 'announcementNoticeStatus'로 매핑합니다.
        reservationDate:
          data.announcementNoticeStatus === '예약' ? DateFormed : null,
        content: data.content,
      }
    } else return
    await axios
      .post(`${API_URL}/api/v1/admin/announcement`, submitData)
      .then(() => {
        console.log('submit success')
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            // withCredentials: true,
            // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
          })
      })
      .catch((err) => {
        console.log('submit fail', submitData)
        alert('공지사항 등록 실패 \n사유 : ' + err)
      })
  }

  const onSubmitEdit = async (data: IAnnounceAllContent) => {
    console.log('onSubmitEdit, given data -> ', data, data.image)

    let submitData: IAnnounceContentEdit
    let DateFormed = ''
    if (data.announcementNoticeStatus === '예약') {
      if (data.reservationDate === null) {
        console.log('there is no reservationDate therefore return')
        return
      }
      DateFormed = formatDate(new Date(data.reservationDate))
      if (DateFormed === 'error') {
        alert('예약 시간은 현재 시간보다 이후여야 합니다.')
        return
      }
    }
    if ('announcementId' in data && 'reservationDate' in data) {
      submitData = {
        announcementId: data.announcementId,
        image: data.image === '' ? null : data.previewImage.split(',')[1],
        writer: data.writer,
        title: data.title,
        announcementNoticeStatus: data.announcementNoticeStatus, // 'announcementStatus'를 'announcementNoticeStatus'로 매핑합니다.
        reservationDate:
          data.announcementNoticeStatus === '예약' ? DateFormed : null,
        content: data.content,
      }
    } else return

    await axios
      .put(`${API_URL}/api/v1/admin/announcement`, submitData)
      .then(() => {
        console.log('Edit submit success', submitData)
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            // withCredentials: true,
            // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
          })
      })
      .catch((err) => {
        console.log('submit edit fail', submitData)
        alert('공지사항 수정 실패 \n사유 : ' + err)
      })
  }

  const onHandleEdit = async () => {
    setWriteMode('edit')
    console.log('edit vlaues ,', getValues())
  }

  const onHandleView = async (id: number) => {
    setWriteMode('view')
    setOpen(true)
    await axios
      .get(`${API_URL}/api/v1/admin/announcement/${id}`)
      .then((res) => {
        console.log(res)
        setValue('announcementId', id)
        setValue('writer', res.data.writer)
        setValue('title', res.data.title)
        setValue('view', res.data.view)
        setValue('previewImage', res.data.image)
        setValue('content', res.data.content)
        setValue('date', res.data.date)
        setValue('announcementStatus', res.data.announcementStatus)

        let noticeStatusValue = '없음' // 기본값
        if (
          res.data.announcementStatus === '게제' ||
          res.data.announcementStatus === '숨김'
        ) {
          noticeStatusValue = '없음'
        } else if (res.data.announcementStatus === '예약') {
          noticeStatusValue = '예약'
        }
        setValue('announcementNoticeStatus', noticeStatusValue)
      })
      .catch((err) => {
        console.log(err)
        alert('공지사항 조회 실패 \n사유 : ' + err)
      })
  }

  const onHandleHideOrUnHide = async (mode: string) => {
    console.log('onHandleHide, ', getValues('announcementId'))
    const announcementId = getValues('announcementId')
    axios
      .post(`${API_URL}/api/v1/admin/announcement/${mode}`, { announcementId })
      .then(() => {
        console.log(`${mode} success`)
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            // withCredentials: true,
            // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
          })
          .then((res) => {
            setContent(res.data.content)
          })
      })
      .catch((err) => {
        console.log(err)
        alert(`공지사항 ${mode} 처리 실패`)
      })
  }

  const onHandleDelete = async (announcementId: number) => {
    axios
      .delete(`${API_URL}/api/v1/admin/announcement`, {
        data: { announcementId: announcementId },
      })
      .then(() => {
        console.log('delete success')
        setOpen(false)
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            // withCredentials: true,
            // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
          })
          .then((res) => {
            setContent(res.data.content)
          })
      })
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80rem',
        height: '60rem',
        backgroundColor: 'background.primary',
      }}
    >
      <Stack>
        {/* 새 글 버튼 */}
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'Headline'} align="center">
            공지사항
          </Typography>
          <Box justifyContent={'right'}>
            <Button
              variant={'contained'}
              onClick={() => {
                setWriteMode('write')
                previewImage = watch('previewImage')
                setOpen(true)
              }}
            >
              새 글
            </Button>
          </Box>
        </Stack>
        {/* 공지사항 리스트 */}
        <Stack sx={{ width: '45rem', height: '35rem' }}>
          <Stack>
            {content?.map((item) => (
              <Stack
                direction={'row'}
                display={'flex'}
                justifyContent={'space-between'}
                sx={{ width: '90%', height: '90%' }}
                key={item.announcementId}
              >
                <Box
                  sx={{ width: '5%', display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant={'Body1'} sx={idStyle}>
                    {item.announcementId}
                  </Typography>
                </Box>
                <Box
                  sx={{ width: '5%', display: 'flex', alignItems: 'center' }}
                >
                  <Typography variant={'body1'} sx={statusStyle}>
                    {item.announcementStatus}
                  </Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Image
                    src={item.image}
                    width={150}
                    height={75}
                    alt="Picture of the announcement"
                  />
                </Box>
                {/* <Box sx={{ width: '25%' }}> */}
                <Button
                  onClick={() => onHandleView(item.announcementId)}
                  sx={{ width: '65%' }}
                >
                  <Typography variant={'body1'} sx={titleStyle}>
                    {item.title}
                  </Typography>
                </Button>
                {/* </Box> */}
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
      {/* 새글쓰기 모달 */}
      <CuModal
        title=""
        open={open}
        onClose={() => setOpen(false)}
        mobileFullSize={false}
      >
        <Container>
          <Typography variant={'h4'} align="center">
            {writeMode === 'write'
              ? '새 공지글 쓰기'
              : writeMode === 'edit'
                ? '공지글 수정하기'
                : '공지 글 보기'}
          </Typography>
          <ImageUploadButton
            setPreviewImage={(image: string) => setValue('previewImage', image)}
            register={register('image')}
          >
            <Box>
              <Image
                src={previewImage}
                width={240}
                height={160}
                alt="Picture of the announcement"
              />
            </Box>
          </ImageUploadButton>
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
          <Typography variant={'Title2'}>글쓴이</Typography>
          <TextField
            {...register('writer', {
              required: '글쓴이는 필수 입력 항목입니다.',
              maxLength: {
                value: 10,
                message: '글쓴이는 10자 이내로 입력해주세요.',
              },
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={writeMode === 'view'}
          />
          {writeMode === 'view' ? (
            <>
              <Typography variant={'Title2'}>조회수</Typography>
              <TextField value={getValues('view')} disabled={true} />
              <Typography variant={'Title2'}>
                {new Date(getValues('date') ?? new Date()) > new Date()
                  ? '예약된 시간'
                  : '게제된 시간'}
              </Typography>
              <TextField
                value={
                  getValues('date')?.split('T')[0] +
                  ' ' +
                  getValues('date')?.split('T')[1]
                }
                disabled={true}
              />
            </>
          ) : null}
          <Typography variant={'Body1'}>내용</Typography>
          <TextField
            multiline
            disabled={writeMode === 'view'}
            {...register('content', {
              required: '내용은 필수 입력 항목입니다.',
              minLength: {
                value: 10,
                message: '내용은 최소 10자 이상 입력해주세요.',
              },
            })}
            error={!!errors.content}
            helperText={errors.content?.message}
          />
          {/* </Stack> */}
          {/* <ToastEditor initialValue="" /> */}
          {/* <ToastViewer /> */}
          <Stack>
            <Typography variant={'Title2'}>공지 예약 및 알림</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Controller
                name="announcementNoticeStatus"
                control={control}
                defaultValue={
                  getValues('announcementStatus') === '예약'
                    ? getValues('announcementStatus')
                    : '게제'
                }
                rules={{ required: '공지 예약 및 알림 상태를 설정해주세요' }} // 필수 조건 추가
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    onChange={(e) => {
                      setCurrentNoticeStatus(e.target.value)
                      field.onChange(e)
                    }}
                  >
                    <FormControlLabel
                      value="없음"
                      control={<Radio />}
                      label="게제 및 알림없음"
                      disabled={
                        writeMode === 'view' ||
                        (writeMode === 'edit' &&
                          getValues('announcementStatus') !== '예약')
                      }
                    />
                    <FormControlLabel
                      value="즉시"
                      control={<Radio />}
                      label="즉시 게제 및 알림"
                      disabled={
                        writeMode === 'view' ||
                        (writeMode === 'edit' &&
                          getValues('announcementStatus') !== '예약')
                      }
                    />
                    <FormControlLabel
                      value="예약"
                      control={<Radio />}
                      label="예약 게제 및 알림"
                      disabled={
                        writeMode === 'view' ||
                        (writeMode === 'edit' &&
                          getValues('announcementStatus') !== '예약')
                      }
                    />
                  </RadioGroup>
                )}
              />
            </Stack>
            {errors.announcementNoticeStatus && (
              <Typography color="error" variant="body2">
                {errors.announcementNoticeStatus.message}
              </Typography>
            )}
            <Controller
              name="reservationDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DateTimePicker
                  value={dayjs(
                    getValues('date') ?? new Date(Date.now() + 3600000),
                  )}
                  onChange={onChange}
                  ampm={false}
                  format="YYYY-MM-DD hh:mm"
                  disabled={
                    writeMode === 'view' ||
                    currentNoticeStatus !== '예약'
                  }
                  sx={{ width: '12rem' }}
                />
              )}
              rules={
                getValues('announcementNoticeStatus') === '예약'
                  ? { required: 'Date and Time required' }
                  : undefined
              }
            />
          </Stack>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button variant={'contained'} onClick={() => setOpen(false)}>
              취소
            </Button>
            {/* 게제된 게시물 <-> 숨김처리된 게시물, 예약된 건 숨기기 불가능 */}
            {writeMode === 'view' ? (
              getValues('announcementStatus') === '숨김' ? (
                <Button
                  variant={'contained'}
                  onClick={() => onHandleHideOrUnHide('show')}
                >
                  게제
                </Button>
              ) : getValues('announcementStatus') === '예약' ? null : (
                <Button
                  variant={'contained'}
                  onClick={() => onHandleHideOrUnHide('hide')}
                >
                  숨김
                </Button>
              )
            ) : null}
            {writeMode === 'view' ? (
              <Button
                variant={'contained'}
                onClick={() => onHandleDelete(getValues('announcementId'))}
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
        </Container>
      </CuModal>
    </Container>
  )
}

export default Announce
