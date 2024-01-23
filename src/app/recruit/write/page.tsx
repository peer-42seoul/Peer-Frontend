'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useToast from '@/hook/useToast'
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import ImageUploadButton from '@/components/ImageUploadButton'
import RowRadioButtonsGroup from '../[id]/edit/panel/radioGroup'
import SetTeamRole from '../[id]/edit/panel/SetTeamRole/SetTeamRole'
import BasicSelect, { ComponentType } from '../[id]/edit/panel/BasicSelect'
import SetInterview from '../[id]/edit/panel/SetInterview/SetInterview'
import SetCommunicationToolLink from '../[id]/edit/panel/SetCommunicationToolLink/SetCommunicationToolLink'
import SelectRegion from '../[id]/edit/panel/SelectRegion'
import { IFormInterview, IRoleWrite, ITag } from '@/types/IPostDetail'
import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import ImageIcon from '@mui/icons-material/Image'
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import CuButton from '@/components/CuButton'
import TagAutoComplete from '@/components/TagAutoComplete'
import axios from 'axios'
import useMedia from '@/hook/useMedia'

const componentName = {
  alignItems: 'center',
}

const interviewButtonMobileStyle = {
  alignItems: 'center',
  with: '100%',
}

const Pc_Container = {
  paddingTop: '64px',
}

const Pc_Style = {
  width: '1216px',
  border: '1px solid #000',
  borderRadius: '12px',
  paddingTop: '24px',
  paddingBottom: '24px',
  paddingLeft: '16px',
  paddingRight: '16px',
  backgroundColor: '#18182B',
}

const Mobile_Container = {}

const Mobile_Style = {
  width: '100%',
  borderRadius: '12px',
  paddingTop: '24px',
  paddingBottom: '24px',
  paddingLeft: '16px',
  paddingRight: '16px',
  overflowY: 'scroll',
  border: '2px solid #000',
  backgroundColor: '#18182B',
}

const CreateTeam = () => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('PROJECT')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [region, setRegion] = useState<string[]>([])
  const [place, setPlace] = useState<string>('')
  const [due, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [link, setCommunicationTool] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [roleList, setRoleList] = useState<IRoleWrite[]>([])
  const [interviewList, setInterviewList] = useState<IFormInterview[]>([])
  const [allTagList, setAllTagList] = useState<ITag[]>()
  const [openBasicModal, setOpenBasicModal] = useState(false)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<string>('')
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const { isPc } = useMedia()

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tag`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (error) {
      setToastMessage('태그를 불러오는데 실패했습니다.')
      openToast()
    } else if (data) {
      setAllTagList(data)
    }
  }, [data])

  const doNeedMoreConditionAtProject = () => {
    if (
      !image ||
      !title ||
      !name ||
      !due ||
      !place ||
      !tagList ||
      !roleList ||
      !content ||
      (place !== 'ONLINE' && !region)
    )
      return true
    else return false
  }

  const doNeedMoreConditionAtStudy = () => {
    if (
      !image ||
      !title ||
      !name ||
      !due ||
      !place ||
      !tagList ||
      !teamsize ||
      !content ||
      (place !== 'ONLINE' && !region)
    )
      return true
    else return false
  }

  const onHandlerFinish = async () => {
    if (
      (type === 'PROJECT' && doNeedMoreConditionAtProject()) ||
      (type === 'STUDY' && doNeedMoreConditionAtStudy())
    ) {
      alert('빈칸을 모두 채워주세요')
      return
    }
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/write`,
        {
          place: place,
          image: previewImage.split(',')[1],
          title: title,
          name: name,
          due: due,
          type: type,
          content: content,
          region: place === 'ONLINE' ? null : region,
          link: link,
          tagList: tagList.map((tag) => tag.tagId),
          roleList: type === 'PROJECT' ? roleList : null,
          interviewList: interviewList,
          max: type === 'STUDY' ? parseInt(teamsize) : null,
        },
      )
      router.push(`/recruit/${response.data}`) // 백엔드에서 리턴값으로 새로생긴 모집글의 id 를 던져줌
    } catch (error: any) {
      console.log('error : ', error)
      setToastMessage(error.response.data)
      openToast()
    }
  }

  return (
    <>
      <Container sx={isPc ? Pc_Container : Mobile_Container}>
        {isPc ? (
          <Box sx={{ paddingBottom: '24px' }}>
            <Typography fontSize={'13px'}>모집 글 쓰기</Typography>
          </Box>
        ) : null}
        <Container sx={isPc ? Pc_Style : Mobile_Style}>
          <Stack gap={3}>
            {/* 대표이미지 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <ImageIcon sx={{ color: 'white' }} />
                <Typography>대표 이미지</Typography>
              </Stack>
              <ImageUploadButton
                setImage={setImage}
                setPreviewImage={setPreviewImage}
              >
                <Box>
                  <Image
                    src={previewImage}
                    width={240}
                    height={160}
                    alt="Picture of the author"
                  />
                </Box>
              </ImageUploadButton>
            </Box>
            {/* 스터디 or 프로젝트 선택 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <ContentPasteOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">팀 분류</Typography>
              </Stack>
              <RowRadioButtonsGroup setValue={setType} />
            </Box>
            {/* 모집글 제목 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <EditOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">모집글 제목</Typography>
              </Stack>
              <TextField
                sx={isPc ? { width: '26rem' } : { width: '100%' }}
                variant="outlined"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length > 20)
                    setTitle(e.target.value.slice(0, 20) as string)
                  else setTitle(e.target.value as string)
                }}
                placeholder="모집글 제목을 입력해주세요."
              />
            </Box>
            {/* 스터디 명 / 프로젝트 명 */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <FormatListBulletedOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">
                  {type === 'STUDY' ? '스터디 명' : '프로젝트 명'}
                </Typography>
              </Stack>
              <TextField
                sx={isPc ? { width: '26rem' } : { width: '100%' }}
                variant="outlined"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 20)
                    setName(e.target.value.slice(0, 20) as string)
                  else setName(e.target.value as string)
                }}
                placeholder="스터디 명 / 프로젝트 명을 입력해주세요."
              />
            </Box>
            {/* (프로젝트인 경우만) 역할 추가 */}
            {type === 'STUDY' ? null : (
              <Box>
                <Stack direction={'row'} gap={1} sx={componentName}>
                  <HowToRegOutlinedIcon sx={{ color: 'white' }} />
                  <Typography variant="h6">역할</Typography>
                </Stack>
                <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
              </Box>
            )}
            {type === 'STUDY' && (
              <Box>
                <Stack direction={'row'} gap={1} sx={componentName}>
                  <HowToRegOutlinedIcon sx={{ color: 'white' }} />
                  <Typography variant="h6">인원</Typography>
                </Stack>
                <BasicSelect
                  type={ComponentType.TeamSize}
                  value={teamsize}
                  setValue={setTeamsize}
                />
              </Box>
            )}
            {/* 온/오프라인 활동방식 선택 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <WifiOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">활동방식</Typography>
              </Stack>
              <BasicSelect
                type={ComponentType.Place}
                value={place}
                setValue={setPlace}
              />
            </Box>
            {/* 목표기간 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <AccessTimeOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">목표기간</Typography>
              </Stack>
              <BasicSelect
                type={ComponentType.Month}
                value={due}
                setValue={setMonth}
              />
            </Box>
            {/* 지역 선택 */}
            {place === 'ONLINE' ? null : (
              <Box>
                <Stack direction={'row'} gap={1} sx={componentName}>
                  <LocationOnOutlinedIcon sx={{ color: 'white' }} />
                  <Typography variant="h6">지역</Typography>
                </Stack>
                <SelectRegion setValue={setRegion} />
              </Box>
            )}
            {/* 커뮤니케이션 링크 등록 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <InsertLinkOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">소통 링크</Typography>
              </Stack>
              <SetCommunicationToolLink setValue={setCommunicationTool} />
            </Box>
            {/* 태그 추가 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <LocalOfferOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">태그</Typography>
              </Stack>
              {allTagList ? (
                <TagAutoComplete
                  tagList={allTagList}
                  datas={tagList}
                  setData={setTagList}
                  style={
                    isPc
                      ? { width: '26rem', height: '2rem' }
                      : { width: '100%', height: '2rem' }
                  }
                />
              ) : null}
            </Box>
            {/* 팀 소개 글 작성 (커스텀에디터 적용되어야 할 부분) */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <DescriptionOutlinedIcon sx={{ color: 'white' }} />
                <Typography variant="h6">팀 소개</Typography>
              </Stack>
              <TextField
                variant="outlined"
                value={content}
                sx={
                  isPc
                    ? { width: '1150px', height: 'auto' }
                    : { width: '100%', height: 'auto' }
                }
                onChange={(e) => {
                  if (e.target.value.length > 1000)
                    setContent(e.target.value.slice(0, 1000) as string)
                  else setContent(e.target.value as string)
                }}
                multiline
              />
            </Box>
            {/* 모집 인터뷰 */}
            <Stack>
              <Stack
                direction={'row'}
                gap={1}
                sx={isPc ? componentName : interviewButtonMobileStyle}
              >
                <CreateNewFolderOutlinedIcon sx={{ color: 'white' }} />
                <Typography
                  variant="h6"
                  sx={{ paddingRight: '5px', width: '70%' }}
                >
                  모집인원 인터뷰 등록하기
                </Typography>
              </Stack>
              <Button
                sx={isPc ? { width: '26rem' } : { width: '100%' }}
                variant="outlined"
                onClick={() => setOpenBasicModal(true)}
              >
                인터뷰 추가
              </Button>
              <SetInterview
                openBasicModal={openBasicModal}
                handleCloseBasicModal={setOpenBasicModal}
                interviewData={interviewList}
                setInterviewData={setInterviewList}
              />
            </Stack>
            {/* 등록, 취소 버튼 */}
            <Stack
              direction={'row'}
              gap={2}
              sx={isPc ? componentName : interviewButtonMobileStyle}
              justifyContent={'flex-end'}
            >
              <CuButton
                message="취소"
                action={() => {
                  router.push('/')
                }}
                variant="outlined"
              />
              <CuButton
                message="등록하기"
                action={onHandlerFinish}
                variant="contained"
              />
            </Stack>
            <CuToast open={isOpen} onClose={closeToast} severity="error">
              <Typography>{toastMessage}</Typography>
            </CuToast>
          </Stack>
        </Container>
      </Container>
      <Box sx={{ height: '70px' }} />
    </>
  )
}

export default CreateTeam
