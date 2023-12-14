'use client'

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import RowRadioButtonsGroup from './panel/radioGroup'
import SetTeamRole from './panel/SetTeamRole/SetTeamRole'
// import TagAutoComplete from './panel/SetTeamTag/TagAutoComplete'
import { useEffect, useState } from 'react'
import BasicSelect, { ComponentType } from './panel/BasicSelect'
import SetInterview from './panel/SetInterview/SetInterview'
import SetCommunicationToolLink from './panel/SetCommunicationToolLink/SetCommunicationToolLink'
import useToast from '@/hook/useToast'
import SelectRegion from './panel/SelectRegion'
import ImageUploadButton from '@/components/ImageUploadButton'
import Image from 'next/image'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { useRouter } from 'next/navigation'
import { IFormInterview, IRole, ITag, statusEnum } from '@/types/IPostDetail'
import CuButton from '@/components/CuButton'
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
import TagAutoComplete from '@/components/TagAutoComplete'
import axios from 'axios'

const componentName = {
  alignItems: 'center',
}

const CreateTeam = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('project')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [region, setRegion] = useState<string[]>([])
  const [place, setPlace] = useState<string>('')
  const [due, setMonth] = useState<string>('')
  const [teamsize, setTeamsize] = useState<string>('')
  const [link, setCommunicationTool] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [roleList, setRoleList] = useState<IRole[]>([])
  const [interviewList, setInterviewList] = useState<IFormInterview[]>([])
  const [openBasicModal, setOpenBasicModal] = useState(false)
  const [status, setStatus] = useState<statusEnum>(statusEnum.BEFORE)
  const [allTagList, setAllTagList] = useState<ITag[]>([])
  const [isAnswered, setIsAnswered] = useState<boolean>(true)
  const { CuToast, isOpen, openToast, closeToast } = useToast()
  const [toastMessage, setToastMessage] = useState<string>('')
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()

  // axiosInstance
  // axios // 원래는 토큰이 필요없는 요청입니다. 백엔드 작업 기다리는중
  //   .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tag`)
  //   .then((res) => setAllTagList(res.data))
  //   .catch((err) => {
  //     setToastMessage('태그를 불러오는데 실패했습니다.')
  //     openToast()
  //     console.log('서버에서 오는 err', err)
  //   })
  // useSWR을 두번 사용할 수 없는데, axios 요청을 직접 보내면 태그는 불러와지지만 무한요청이 발생함

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/edit/${params.id}`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
  )
  let regionData = undefined

  useEffect(() => {
    console.log(data)
    if (error) {
      console.log('error ocurred!!')
      setToastMessage('데이터를 불러오는데 실패했습니다.')
      openToast()
    } else if (data) {
      regionData = [data.region1, data.region2]
      setTitle(data.title)
      setPreviewImage(data.previewImage)
      setName(data.name)
      setType(data.type)
      setTagList(data.tagList)
      setRegion(regionData)
      setPlace(data.place)
      setMonth(data.due)
      setTeamsize(data.teamsize)
      setCommunicationTool(data.link)
      setContent(data.content)
      setRoleList(data.roleList)
      setInterviewList(data.interviewList)
      setStatus(data.status)
      setAllTagList(data.tagList)
      setIsAnswered(data.isAnswered)
    }
  }, [data])

  const onHandlerFinish = async () => {
    if (type === 'project') {
      setRoleList([{ name: null, number: parseInt(teamsize) }])
    }
    if (
      !image ||
      !title ||
      !name ||
      !due ||
      !region ||
      !place ||
      !link ||
      !tagList ||
      !roleList ||
      !content
    ) {
      alert('빈칸을 모두 채워주세요')
      return
    }
    try {
      if (type === 'project') {
        setRoleList([{ name: null, number: parseInt(teamsize) }])
      }
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/edit/${params.id}`,
        {
          place: place,
          image: previewImage.split(',')[1],
          title: title,
          name: name,
          due: due,
          type: type,
          content: content,
          region: region,
          link: link,
          tagList: tagList,
          roleList: roleList,
          interviewList: interviewList,
          status: status,
        },
      )
      if (response.status === 200) router.push(`/recruit/${response.data}`) // 백엔드에서 리턴값으로 새로생긴 모집글의 id 를 던져줌
    } catch (error) {
      console.log(error)
      setToastMessage('모집글 작성 실패, 다시 시도해주세요')
      openToast()
    }
  }

  return (
    <>
      <Container sx={{ paddingTop: '64px' }}>
        <Box sx={{ paddingBottom: '24px' }}>
          <Typography fontSize={'13px'}>모집 글 쓰기</Typography>
        </Box>
        <Container
          sx={{
            width: '1216px',
            border: '1px solid #000',
            borderRadius: '12px',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '16px',
            paddingRight: '16px',
            backgroundColor: '#18182B',
          }}
        >
          <Stack gap={3}>
            {/* 대표이미지 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <ImageIcon />
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
                <ContentPasteOutlinedIcon />
                <Typography variant="h6">팀 분류</Typography>
              </Stack>
              <RowRadioButtonsGroup
                setValue={setType}
                disabled={true}
                defaultChecked={type}
              />
            </Box>
            {/* 모집글 제목 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <EditOutlinedIcon />
                <Typography variant="h6">모집글 제목</Typography>
              </Stack>
              <TextField
                sx={{ width: '416px' }}
                variant="outlined"
                value={title}
                onChange={(e) => {
                  if (e.target.value.length > 20)
                    setTitle(e.target.value.slice(0, 20) as string)
                  else setTitle(e.target.value as string)
                }}
              />
            </Box>
            {/* 스터디 명 / 프로젝트 명 */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <FormatListBulletedOutlinedIcon />
                <Typography variant="h6">
                  {type === 'STUDY' ? '스터디 명' : '프로젝트 명'}
                </Typography>
              </Stack>
              <TextField
                sx={{ width: '416px' }}
                variant="outlined"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length > 20)
                    setName(e.target.value.slice(0, 20) as string)
                  else setName(e.target.value as string)
                }}
              />
            </Box>
            {/* (프로젝트인 경우만) 역할 추가 */}
            {type === 'STUDY' ? null : (
              <Box>
                <Stack direction={'row'} gap={1} sx={componentName}>
                  <HowToRegOutlinedIcon />
                  <Typography variant="h6">역할</Typography>
                </Stack>
                <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
              </Box>
            )}
            {type === 'STUDY' && (
              <Box>
                <Stack direction={'row'} gap={1} sx={componentName}>
                  <HowToRegOutlinedIcon />
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
                <WifiOutlinedIcon />
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
                <AccessTimeOutlinedIcon />
                <Typography variant="h6">목표기간</Typography>
              </Stack>
              <BasicSelect
                type={ComponentType.Month}
                value={due}
                setValue={setMonth}
              />
            </Box>
            {/* 지역 선택 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <LocationOnOutlinedIcon />
                <Typography variant="h6">지역</Typography>
              </Stack>
              {/* <SelectRegion setValue={setRegion} region={region} /> */}
            </Box>
            {/* 커뮤니케이션 링크 등록 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <InsertLinkOutlinedIcon />
                <Typography variant="h6">소통 링크</Typography>
              </Stack>
              <SetCommunicationToolLink
                setValue={setCommunicationTool}
                value={link}
              />
            </Box>
            {/* 태그 추가 */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <LocalOfferOutlinedIcon />
                <Typography variant="h6">태그</Typography>
              </Stack>
              {allTagList ? (
                <TagAutoComplete
                  tagList={allTagList}
                  datas={tagList}
                  setData={setTagList}
                  style={{ width: '26rem', height: '32px' }}
                />
              ) : null}
            </Box>
            {/* 팀 소개 글 작성 (커스텀에디터 적용되어야 할 부분) */}
            <Box>
              <Stack direction={'row'} gap={1} sx={componentName}>
                <DescriptionOutlinedIcon />
                <Typography variant="h6">팀 소개</Typography>
              </Stack>
              <TextField
                variant="outlined"
                value={content}
                sx={{ width: '1150px', height: 'auto' }}
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
              <Stack direction={'row'} gap={1} sx={componentName}>
                <CreateNewFolderOutlinedIcon />
                <Typography
                  variant="h6"
                  sx={{ paddingRight: '5px', width: '70%' }}
                >
                  모집인원 인터뷰 등록하기
                </Typography>
              </Stack>
              <Button
                sx={{ width: '416px' }}
                variant="outlined"
                onClick={() => setOpenBasicModal(true)}
                disabled={isAnswered}
              >
                {isAnswered
                  ? '이미 등록된 답변이 있습니다.'
                  : '인터뷰 등록하기'}
              </Button>
              <SetInterview
                openBasicModal={openBasicModal}
                handleCloseBasicModal={() => setOpenBasicModal(false)}
                interviewData={interviewList}
                setInterviewData={setInterviewList}
              />
            </Stack>
            {/* 등록, 취소 버튼 */}
            <Stack
              direction={'row'}
              gap={2}
              sx={componentName}
              justifyContent={'flex-end'}
            >
              <CuButton
                message="취소"
                action={() => {
                  router.push(`/recruit/${params.id}`)
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
