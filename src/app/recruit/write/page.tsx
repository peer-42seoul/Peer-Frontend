'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useToast from '@/states/useToast'
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
import CuButton from '@/components/CuButton'
import TagAutoComplete from '@/components/TagAutoComplete'
import axios from 'axios'
import useMedia from '@/hook/useMedia'
import useAuthStore from '@/states/useAuthStore'
import * as style from './page.style'
import LabelWithIcon from '@/components/LabelWithIcon'
// icons
import * as Icon from '@/icons'

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
  const { openToast, closeToast } = useToast()
  const router = useRouter()
  const axiosInstance = useAxiosWithAuth()
  const { isPc } = useMedia()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (!isLogin) router.push('/login')
  }, [isLogin])

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tag`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  useEffect(() => {
    if (error) {
      openToast({
        severity: 'error',
        message: '태그를 불러오지 못했습니다.',
      })
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
    closeToast()
    if (
      (type === 'PROJECT' && doNeedMoreConditionAtProject()) ||
      (type === 'STUDY' && doNeedMoreConditionAtStudy())
    ) {
      openToast({
        severity: 'error',
        message: '필수 입력 항목을 모두 입력해주세요.',
      })
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
      openToast({
        severity: 'error',
        message: error.response.data,
      })
    }
  }

  return (
    <>
      <Container sx={style.containerStyle}>
        {isPc ? (
          <Box sx={{ paddingBottom: '1.5rem' }}>
            <Typography variant="CaptionEmphasis" lineHeight={'normal'}>
              모집 글 쓰기
            </Typography>
          </Box>
        ) : null}
        <Stack spacing={'1.5rem'} sx={style.boxStyle}>
          {/* 대표이미지 */}
          <Box>
            <LabelWithIcon
              svgIcon={
                <Icon.ImageIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
              message="대표이미지"
            />
            <ImageUploadButton
              setImage={setImage}
              setPreviewImage={setPreviewImage}
            >
              {/* 폴백 이미지 바꾸기 */}
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
            <LabelWithIcon
              message="유형"
              svgIcon={
                <Icon.ClipboardIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
            <RowRadioButtonsGroup setValue={setType} />
          </Box>
          {/* 모집글 제목 */}
          <Box>
            <LabelWithIcon
              message="모집글 제목"
              svgIcon={
                <Icon.EditIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
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
            <LabelWithIcon
              message={type === 'STUDY' ? '스터디 명' : '프로젝트 명'}
              svgIcon={
                <Icon.ListIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
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
              <LabelWithIcon
                message="역할"
                svgIcon={
                  <Icon.UserCheckIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              />
              <SetTeamRole roleData={roleList} setRoleData={setRoleList} />
            </Box>
          )}
          {type === 'STUDY' && (
            <Box>
              <LabelWithIcon
                message="모집인원"
                svgIcon={
                  <Icon.UserCheckIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              />
              <BasicSelect
                type={ComponentType.TeamSize}
                value={teamsize}
                setValue={setTeamsize}
              />
            </Box>
          )}
          {/* 온/오프라인 활동방식 선택 */}
          <Box>
            <LabelWithIcon
              message="활동방식"
              svgIcon={
                <Icon.WifiIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
            <BasicSelect
              type={ComponentType.Place}
              value={place}
              setValue={setPlace}
            />
          </Box>
          {/* 목표기간 */}
          <Box>
            <LabelWithIcon
              message="목표기간"
              svgIcon={
                <Icon.PieChartIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
            <BasicSelect
              type={ComponentType.Month}
              value={due}
              setValue={setMonth}
            />
          </Box>
          {/* 지역 선택 */}
          {place === 'ONLINE' ? null : (
            <Box>
              <LabelWithIcon
                message="지역"
                svgIcon={
                  <Icon.LocationIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              />
              <SelectRegion setValue={setRegion} />
            </Box>
          )}
          {/* 커뮤니케이션 링크 등록 */}
          <Box>
            <LabelWithIcon
              message="커뮤니케이션 링크"
              svgIcon={
                <Icon.LinkDiagonalIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
            <SetCommunicationToolLink setValue={setCommunicationTool} />
          </Box>
          {/* 태그 추가 */}
          <Box>
            <LabelWithIcon
              message="기술 스택"
              svgIcon={
                <Icon.TagIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
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
            <LabelWithIcon
              message="팀 소개 글"
              svgIcon={
                <Icon.FileIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
            <TextField
              variant="outlined"
              value={content}
              onChange={(e) => {
                if (e.target.value.length > 1000)
                  setContent(e.target.value.slice(0, 1000) as string)
                else setContent(e.target.value as string)
              }}
              fullWidth
              multiline
            />
          </Box>
          {/* 모집 인터뷰 */}
          <Stack>
            <LabelWithIcon
              message="모집 인터뷰"
              svgIcon={
                <Icon.FolderPlusIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            />
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
          <Stack direction={'row'} gap={2} justifyContent={'flex-end'}>
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
        </Stack>
      </Container>
    </>
  )
}

export default CreateTeam
