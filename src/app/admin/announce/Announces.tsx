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
// import ImageUploadButton from '@/components/ImageUploadButton'
// import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { Radio } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import CuModal from '@/components/CuModal'
import { idStyle, statusStyle, titleStyle } from './AnnounceStyles'
import DynamicToastEditorAdmin from '@/components/DynamicToastEditorAdmin'
import { Editor } from '@toast-ui/editor'
import DynamicToastViewer from '@/components/DynamicToastViewer'
import { config } from '../panel/AdminAxios'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'

interface IAnnounceAllContent {
  announcementId: number
  // previewImage: string
  // image: string
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
  // previewImage: '/images/defaultImage.png',
  // image: '',
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
  // image: string
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
  // image: string
  writer: string
  title: string
  announcementNoticeStatus: string // enum
  reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
  content: string
}

interface IAnnounceContentEdit {
  announcementId: number
  // image: string | null
  writer: string
  title: string
  announcementNoticeStatus: string // enum
  reservationDate: null | string // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
  content: string
}

const Announces = () => {
  const API_URL = process.env.NEXT_PUBLIC_CSR_API

  const [content, setContent] = useState<content[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    control,
    // watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IAnnounceAllContent>({
    defaultValues: defaultValues,
    mode: 'onChange',
  })
  // let previewImage = watch('previewImage')
  const editorRef = useRef<Editor | null>(null)
  const [writeMode, setWriteMode] = useState<string>('')

  const [page, setPage] = useState<number>(1)
  const totalPageVar = useRef<number>(1)
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

  const [currentNoticeStatus, setCurrentNoticeStatus] = useState('없음')
  const [currentDate, setCurrentDate] = useState<string>('')
  const [currentContent, setCurrentContent] = useState<string>('')

  // 초기 페이지 진입시 공지사항 목록 불러오기
  useEffect(() => {
    let isMounted = true // 마운트 상태를 추적하는 변수 추가
    axios
      .get(`${API_URL}/api/v1/admin/announcement`, {
        params,
        ...config,
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
    console.log('on submit')

    if (
      editorRef.current?.getMarkdown()?.length &&
      editorRef.current?.getMarkdown()?.length > 10000
    ) {
      alert('본문의 글이 너무 깁니다!')
      return
    }
    // if (data.previewImage === '') {
    //   alert('이미지를 삽입해주세요')
    //   return
    // }
    let DateFormed = ''
    if (data.announcementNoticeStatus === '예약') {
      console.log('reservation in')

      if (data.reservationDate === null) {
        console.log('reservation null')
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
        // image: data.previewImage.split(',')[1],
        writer: data.writer,
        title: data.title,
        announcementNoticeStatus: data.announcementNoticeStatus, // 'announcementStatus'를 'announcementNoticeStatus'로 매핑합니다.
        reservationDate:
          data.announcementNoticeStatus === '예약' ? DateFormed : null,
        content: editorRef.current ? editorRef.current.getMarkdown() : '',
      }
    } else return
    console.log('before axios')
    await axios
      .post(`${API_URL}/api/v1/admin/announcement`, submitData, {
        withCredentials: true,
      })
      .then(() => {
        console.log('then')
        setOpen(false)
        openToast({
          message: '공지 글을 성공적으로 등록하였습니다.',
          severity: 'success',
        })
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
          })
      })
      .catch((err) => {
        alert('공지사항 등록 실패 \n사유 : ' + err)
      })
  }

  const onSubmitEdit = async (data: IAnnounceAllContent) => {
    let submitData: IAnnounceContentEdit
    let DateFormed = ''
    if (data.announcementNoticeStatus === '예약') {
      if (data.reservationDate === null) {
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
        // image: data.image === '' ? null : data.previewImage.split(',')[1],
        writer: data.writer,
        title: data.title,
        announcementNoticeStatus: data.announcementNoticeStatus, // 'announcementStatus'를 'announcementNoticeStatus'로 매핑합니다.
        reservationDate:
          data.announcementNoticeStatus === '예약' ? DateFormed : null,
        content: editorRef.current ? editorRef.current.getMarkdown() : '',
      }
    } else return

    await axios
      .put(`${API_URL}/api/v1/admin/announcement`, submitData, {
        withCredentials: true,
      })
      .then(() => {
        openToast({
          message: '공지 글이 성공적으로 수정되었습니다.',
          severity: 'success',
        })
        setOpen(false)
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            totalPageVar.current = res.data.totalPages
            setContent(res.data.content)
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
      .get(`${API_URL}/api/v1/admin/announcement/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setValue('announcementId', id)
        setValue('writer', res.data.writer)
        setValue('title', res.data.title)
        setValue('view', res.data.view)
        // setValue('previewImage', res.data.image)
        setValue('content', res.data.content)
        setValue('date', res.data.date)
        setValue('announcementStatus', res.data.announcementStatus)
        setCurrentContent(res.data.content)
        setCurrentDate(res.data.date)
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
        alert('공지사항 조회 실패 \n사유 : ' + err)
      })
  }

  const onHandleHideOrUnHide = async (mode: string) => {
    const announcementId = getValues('announcementId')
    axios
      .post(
        `${API_URL}/api/v1/admin/announcement/${mode}`,
        { announcementId },
        { withCredentials: true },
      )
      .then(() => {
        setOpen(false)
        openToast({
          message: `공지글이 ${mode}처리 되었습니다.`,
          severity: 'success',
        })
        reset()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            setContent(res.data.content)
          })
      })
      .catch(() => {
        alert(`공지사항 ${mode} 처리 실패`)
      })
  }

  const onHandleDelete = async (announcementId: number) => {
    axios
      .delete(`${API_URL}/api/v1/admin/announcement`, {
        data: { announcementId: announcementId },
        withCredentials: true,
      })
      .then(() => {
        setOpen(false)
        openToast({
          message: `${announcementId}번 공지 글이 성공적으로 삭제되었습니다.`,
          severity: 'success',
        })
        closeRemoveModal()
        axios
          .get(`${API_URL}/api/v1/admin/announcement`, {
            params,
            withCredentials: true,
          })
          .then((res) => {
            setContent(res.data.content)
          })
      })
      .catch((err) => {
        alert('공지글 삭제 실패 \n 사유: ' + err)
      })
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '80rem',
        height: '30rem',
        paddingTop: '5rem',
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
                // previewImage = watch('previewImage')
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
                {/* <Box sx={{ width: '20%' }}>
                  <Image
                    src={item.image}
                    width={150}
                    height={75}
                    alt="Picture of the announcement"
                  />
                </Box> */}
                <Button
                  onClick={() => onHandleView(item.announcementId)}
                  sx={{ width: '85%' }}
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
      {/* 새글쓰기 모달 */}
      <CuModal
        title={
          writeMode === 'write'
            ? '새 공지글 쓰기'
            : writeMode === 'edit'
              ? '공지글 수정하기'
              : '공지 글 보기'
        }
        open={open}
        onClose={() => setOpen(false)}
        mobileFullSize={false}
      >
        <Container>
          {/* {writeMode === 'view' ? (
            <Box>
              <Image
                src={previewImage}
                width={320}
                height={160}
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
                  width={240}
                  height={160}
                  alt="Picture of the announcement"
                />
              </Box>
            </ImageUploadButton>
          )} */}
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
            error={!!errors.writer}
            helperText={errors.writer?.message}
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
                // value={
                //   getValues('date')?.split('T')[0] +
                //   ' ' +
                //   getValues('date')?.split('T')[1]
                // }
                value={
                  currentDate?.split('T')[0] +
                  ' ' +
                  currentDate?.split('T')[1]
                }
                disabled={true}
              />
            </>
          ) : null}
          {writeMode === 'view' ? (
            <Box>
              <DynamicToastViewer
                // initialValue={getValues('content')}
                initialValue={currentContent}
                sx={{
                  width: '100%',
                  wordBreak: 'break-word',
                  height: '20rem',
                  color: 'text.alternative',
                  overflowY: 'auto',
                }}
              />
            </Box>
          ) : (
            <Box>
              <DynamicToastEditorAdmin
                initialValue={getValues('content')}
                initialEditType="wysiwyg"
                editorRef={editorRef}
                previewStyle="tab"
                height={'30rem'}
              />
            </Box>
          )}
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
            {/* 예약 날짜 선택 */}
            {currentNoticeStatus === '예약' ? (
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
                      writeMode === 'view' || currentNoticeStatus !== '예약'
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
            ) : null}
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
                onClick={() => {
                  currentId.current = getValues('announcementId')
                  openRemoveModal()
                }}
              >
                삭제
              </Button>
            ) : null}
            {writeMode === 'view' ? (
              <Button
                variant={'contained'}
                onClick={() => onHandleEdit()}
                disabled={
                  getValues('announcementStatus') !== '예약' ? true : false
                }
              >
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

export default Announces
