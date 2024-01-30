'use client'

import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/system'
import {
  Button,
  Container,
  FormControlLabel,
  Modal,
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
// import ToastEditor from '@/components/ToastUIEditor'
import ToastViewer from '@/components/ToastUIViewer'

const alignCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

interface content {
  announcementId: number
  announcementStatus: string
  image: string
  title: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: 'background-tertiary',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll',
}

interface IAnnounce {
  image: string
  writer: string
  title: string
  announcementNoticeStatus: string // enum
  reservationDate: null // "yyyy-MM-ddTHH:mm", // notification이 예약일 경우에만 존재하면 됨
  content: string
}

const defaultValues: IAnnounce = {
  image: '/images/defaultImage.png',
  writer: '',
  title: '',
  announcementNoticeStatus: '없음',
  reservationDate: null,
  content: '',
}

const Announce = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const [page, setPage] = useState<number>(0)
  // const [totalPage, setTotalPage] = useState<number>(0)
  let totalPageVar = 0
  const [content, setContent] = useState<content[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const { register, handleSubmit, control, watch, setValue, reset } =
    useForm<IAnnounce>({ defaultValues: defaultValues })
  const announcementNoticeStatus = watch('announcementNoticeStatus')
  const writeMode = useRef<string>('')
  let previewImage = watch('image')
  const fourthPage = useRef<boolean>(false)
  const fifthPage = useRef<boolean>(false)
  const renderFlag = useRef<boolean>(false)
  const params = {
    page: page - 1,
    size: 5,
  }
  // 백엔드 API에서는 page가 0부터 시작하므로 page - 1로 설정

  const onSubmit = async (data: IAnnounce) => {
    console.log('onSubmit')
    const submitData = { ...data, image: data.image.split(',')[1] }
    console.log(typeof submitData)

    await axios
      .post(`${API_URL}/api/v1/admin/announcement`, submitData)
      .then(() => {
        console.log('submit success')
        setOpen(false)
        reset()
      })
      .catch((err) => {
        console.log('error', err)
        console.log('submit fail', submitData)
        alert('공지사항 등록 실패')
      })
  }

  useEffect(() => {
    if (page === totalPage) {
      fourthPage.current = false
      fifthPage.current = false
    } else if (page + 1 === totalPage) {
      fourthPage.current = true
      fifthPage.current = false
    } else if (page + 2 <= totalPage) {
      fourthPage.current = true
      fifthPage.current = true
    }
  }, [totalPageVar])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/v1/admin/announcement`, {
        params,
        // withCredentials: true,
        // peer-test 도메인에서만 httpOnly sameSite 쿠키를 전달받을 수 있으므로 로컬에서 테스트 할 동안 임시로 주석처리
      })
      .then((res) => {
        console.log(res)
        // setTotalPage(res.data.totalPages)
        totalPageVar = res.data.totalPages
        console.log(totalPageVar)
        setContent(res.data.content)
        requestRenderPage()
      })
  }, [page])

  const requestRenderPage = () => {
    if (renderFlag.current === true) {
      renderFlag.current = false
    } else {
      renderFlag.current = true
    }
  }

  const onHandleView = (id: number) => {
    writeMode.current = 'view'
    setOpen(true)
    axios
      .get(`${API_URL}/api/v1/admin/announcement/${id}`)
      .then((res) => {
        console.log(res)
        setValue('image', res.data.image)
      })
      .catch((err) => {
        console.log(err)
        alert('공지사항 조회 실패')
      })
    const title = content.find((item) => item.announcementId === id)?.title
    // const writer = content.find((item) => item.announcementId === id)?.wr
    const image = content.find((item) => item.announcementId === id)?.image

    if (title !== undefined) setValue('title', title)
    // if (writer !== undefined) setValue('writer', writer)
    if (image !== undefined) setValue('image', image)
  }

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80rem',
        height: '60rem',
        // backgroundColor: 'background.primary',
      }}
    >
      <Stack>
        {/* 새 글 버튼 */}
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'Title1'} align="center">
            공지사항
          </Typography>
          <Box justifyContent={'right'}>
            <Button
              variant={'contained'}
              onClick={() => {
                writeMode.current = 'write'
                previewImage = watch('image')
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
                <Typography variant={'Body1'} sx={alignCenter}>
                  {item.announcementId}
                </Typography>
                <Typography variant={'body1'} sx={alignCenter}>
                  {item.announcementStatus}
                </Typography>
                <Box
                  src={item.image}
                  width={'10.5rem'}
                  height={'4.5rem'}
                  component={'img'}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <Button onClick={() => onHandleView(item.announcementId)}>
                  <Typography variant={'body1'} sx={alignCenter}>
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
          />
        </Stack>
      </Stack>
      {/* 새글쓰기 모달 */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography variant={'h4'} align="center">
            {writeMode.current === 'write'
              ? '새 공지글 쓰기'
              : writeMode.current === 'edit'
                ? '공지글 수정하기'
                : '공지 글 보기'}
          </Typography>
          <ImageUploadButton
            setPreviewImage={(image: string) => setValue('image', image)}
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
          <Typography variant={'h6'}>제목</Typography>
          <TextField {...register('title', { required: 'you need this' })} />
          <Typography variant={'h6'}>글쓴이</Typography>
          <TextField {...register('writer', { required: true })} />
          <Typography variant={'h6'}>내용</Typography>
          <TextField {...register('content', { required: true })} multiline />
          {/* <ToastEditor initialValue="" /> */}
          <ToastViewer/>
          <Stack>
            <Typography variant={'h6'}>공지상태</Typography>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <Controller
                name="announcementNoticeStatus"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} row defaultValue="없음">
                    <FormControlLabel
                      value="없음"
                      control={<Radio />}
                      label="없음"
                    />
                    <FormControlLabel
                      value="즉시"
                      control={<Radio />}
                      label="즉시"
                    />
                    <FormControlLabel
                      value="예약"
                      control={<Radio />}
                      label="예약"
                    />
                  </RadioGroup>
                )}
              />
            </Stack>
            <TextField
              sx={{ width: '10rem' }}
              {...register('reservationDate', {
                required: announcementNoticeStatus === '예약' ? true : false,
                // required: true,
              })}
              disabled={announcementNoticeStatus !== '예약'}
            />
          </Stack>
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button variant={'contained'} onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant={'contained'} onClick={handleSubmit(onSubmit)}>
              등록
            </Button>
          </Stack>
        </Container>
      </Modal>
    </Container>
  )
}

export default Announce
