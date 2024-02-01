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
import SelectRegion from '../[id]/edit/panel/SelectRegion'
import { IFormInterview, IRoleWrite, ITag } from '@/types/IPostDetail'
// import useAxiosWithAuth from '@/api/config'
import useSWR from 'swr'
import CuButton from '@/components/CuButton'
import TagAutoComplete from '@/components/TagAutoComplete'
import axios from 'axios'
import useMedia from '@/hook/useMedia'
import useAuthStore from '@/states/useAuthStore'
import * as style from './page.style'
import * as Icon from '@/icons'
import TextFieldWithLabel from '@/components/TextFieldWithLabel'
import FieldWithLabel from '@/components/FieldWithLabel'
import { Controller, useForm } from 'react-hook-form'

interface IRecruitWriteField {
  place: string
  image: string
  title: string
  name: string
  due: string
  type: string
  content: string
  region: Array<string> | null
  link: string
  tagList: Array<ITag> | null
  roleList: Array<IRoleWrite>
  interviewList: Array<IFormInterview>
  max: number | null
}

const CreateTeam = () => {
  const [image, setImage] = useState<File[]>([])
  const [previewImage, setPreviewImage] = useState<string>(
    '/images/defaultImage.png',
  )
  const [type, setType] = useState<string>('PROJECT')
  const [tagList, setTagList] = useState<ITag[]>([])
  const [teamsize, setTeamsize] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [allTagList, setAllTagList] = useState<ITag[]>()

  const [openBasicModal, setOpenBasicModal] = useState(false)
  const { openToast, closeToast } = useToast()
  const router = useRouter()
  // const axiosInstance = useAxiosWithAuth()
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

  // const doNeedMoreConditionAtProject = () => {
  //   if (
  //     !image ||
  //     !title ||
  //     !name ||
  //     !due ||
  //     !place ||
  //     !tagList ||
  //     !roleList ||
  //     !content ||
  //     (place !== 'ONLINE' && !region)
  //   )
  //     return true
  //   else return false
  // }

  // const doNeedMoreConditionAtStudy = () => {
  //   if (
  //     !image ||
  //     !title ||
  //     !name ||
  //     !due ||
  //     !place ||
  //     !tagList ||
  //     !teamsize ||
  //     !content ||
  //     (place !== 'ONLINE' && !region)
  //   )
  //     return true
  //   else return false
  // }

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IRecruitWriteField>({
    defaultValues: {
      place: '',
      image: '',
      title: '',
      name: '',
      due: '',
      type: '',
      content: '',
      region: null,
      link: '',
      tagList: null,
      roleList: [],
      interviewList: [],
      max: null,
    },
  })

  const onHandlerFinish = async (data: IRecruitWriteField) => {
    closeToast()

    console.log('data : ', data)
    // if (
    //   (type === 'PROJECT' && doNeedMoreConditionAtProject()) ||
    //   (type === 'STUDY' && doNeedMoreConditionAtStudy())
    // ) {
    //   openToast({
    //     severity: 'error',
    //     message: '필수 입력 항목을 모두 입력해주세요.',
    //   })
    //   return
    // }
    // try {
    //   const response = await axiosInstance.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit/write`,
    //     {
    //       place: data.place,
    //       image: previewImage.split(',')[1],
    //       title: data.title,
    //       name: data.name,
    //       due: data.due,
    //       type: type,
    //       content: content,
    //       region: data.place === 'ONLINE' ? null : data.region,
    //       link: data.link,
    //       tagList: tagList.map((tag) => tag.tagId),
    //       roleList: type === 'PROJECT' ? data.roleList : null,
    //       interviewList: data.interviewList,
    //       max: type === 'STUDY' ? parseInt(teamsize) : null,
    //     },
    //   )
    //   router.push(`/recruit/${response.data}`) // 백엔드에서 리턴값으로 새로생긴 모집글의 id 를 던져줌
    // } catch (error: any) {
    //   console.log('error : ', error)
    //   openToast({
    //     severity: 'error',
    //     message: error.response.data,
    //   })
    // }
  }

  const roleList = watch('roleList')
  const interviewList = watch('interviewList')
  const region = watch('region')
  const place = watch('place')

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
        <form onSubmit={handleSubmit(onHandlerFinish)}>
          <Stack spacing={'1.5rem'} sx={style.boxStyle}>
            {/* 대표이미지 */}
            <FieldWithLabel
              labelIcon={
                <Icon.ImageIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
              label="대표이미지"
              id="image"
            >
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
            </FieldWithLabel>
            {/* 스터디 or 프로젝트 선택 */}
            <FieldWithLabel
              label="유형"
              labelIcon={
                <Icon.ClipboardIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            >
              <RowRadioButtonsGroup setValue={setType} />
            </FieldWithLabel>
            {/* 모집글 제목 */}
            <Controller
              render={({ field }) => (
                <TextFieldWithLabel
                  {...field}
                  inputProps={{
                    maxLength: 20,
                  }}
                  label_icon={
                    <Icon.EditIcon
                      sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                    />
                  }
                  label="모집글 제목"
                  placeholder="모집글 제목을 입력해주세요."
                  id="title"
                  error={!!errors?.title}
                  helperText={
                    <Typography
                      variant="Caption"
                      color="error"
                      height={'1.125rem'}
                    >
                      {errors?.title?.message}
                    </Typography>
                  }
                />
              )}
              name="title"
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
                maxLength: {
                  value: 20,
                  message: '20자 이내로 입력해주세요.',
                },
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
              }}
            />

            {/* 스터디 명 / 프로젝트 명 */}
            <Controller
              render={({ field }) => (
                <TextFieldWithLabel
                  {...field}
                  label_icon={
                    <Icon.ListIcon
                      sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                    />
                  }
                  label={type === 'STUDY' ? '스터디 명' : '프로젝트 명'}
                  placeholder="스터디 명 / 프로젝트 명을 입력해주세요."
                  id="name"
                  error={!!errors?.name}
                  helperText={
                    <Typography
                      variant="Caption"
                      color="error"
                      height={'1.125rem'}
                    >
                      {errors?.name?.message}
                    </Typography>
                  }
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              )}
              name="name"
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
                maxLength: {
                  value: 20,
                  message: '20자 이내로 입력해주세요.',
                },
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
              }}
            />
            {/* (프로젝트인 경우만) 역할 추가 */}
            {type === 'STUDY' ? null : (
              <FieldWithLabel
                label="역할"
                labelIcon={
                  <Icon.UserCheckIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              >
                <SetTeamRole
                  roleData={roleList}
                  setRoleData={(value: Array<IRoleWrite>) => {
                    setValue('roleList', value)
                  }}
                />
              </FieldWithLabel>
            )}
            {type === 'STUDY' && (
              <FieldWithLabel
                label="모집인원"
                labelIcon={
                  <Icon.UserCheckIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              >
                <BasicSelect
                  type={ComponentType.TeamSize}
                  value={teamsize}
                  setvalue={setTeamsize}
                />
              </FieldWithLabel>
            )}
            {/* 온/오프라인 활동방식 선택 */}
            <Controller
              render={({ field }) => (
                <FieldWithLabel
                  label="활동방식"
                  labelIcon={
                    <Icon.WifiIcon
                      sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                    />
                  }
                  formHelperText={errors?.place?.message ?? undefined}
                >
                  <BasicSelect
                    type={ComponentType.Place}
                    {...field}
                    error={!!errors?.place}
                  />
                </FieldWithLabel>
              )}
              name="place"
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
              }}
            />

            {/* 목표기간 */}
            <Controller
              render={({ field }) => (
                <FieldWithLabel
                  label="목표기간"
                  labelIcon={
                    <Icon.PieChartIcon
                      sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                    />
                  }
                  id="due"
                >
                  <BasicSelect
                    id="due"
                    type={ComponentType.Month}
                    {...field}
                    error={!!errors?.due}
                  />
                </FieldWithLabel>
              )}
              name="due"
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
              }}
            />
            {/* 지역 선택 */}
            {place === 'ONLINE' ? null : (
              <FieldWithLabel
                label="지역"
                labelIcon={
                  <Icon.LocationIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
              >
                <SelectRegion
                  setValue={(value) => {
                    setValue('region', value)
                  }}
                  region={region ?? undefined}
                />
              </FieldWithLabel>
            )}
            {/* 커뮤니케이션 링크 등록 */}
            <Controller
              render={({ field }) => (
                <TextFieldWithLabel
                  {...field}
                  label="커뮤니케이션 링크"
                  label_icon={
                    <Icon.LinkDiagonalIcon
                      sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                    />
                  }
                  placeholder={'팀 커뮤니케이션 툴 링크를 입력해주세요.'}
                  sx={{ width: '26rem' }}
                  id="link"
                  inputProps={{
                    maxLength: 300,
                  }}
                  error={!!errors?.link}
                  helperText={
                    <Typography
                      variant="Caption"
                      color="error"
                      height={'1.125rem'}
                    >
                      {errors?.link?.message}
                    </Typography>
                  }
                />
              )}
              name="link"
              control={control}
              rules={{
                required: '필수 입력 항목입니다.',
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 300,
                  message: '300자 이내로 입력해주세요.',
                },
              }}
            />

            {/* 태그 추가 */}
            <FieldWithLabel
              label="기술 스택"
              labelIcon={
                <Icon.TagIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            >
              {allTagList ? (
                <TagAutoComplete
                  tagList={allTagList}
                  datas={tagList}
                  setData={setTagList}
                  style={{ width: ['100%', '26rem'] }}
                />
              ) : null}
            </FieldWithLabel>
            {/* 팀 소개 글 작성 (커스텀에디터 적용되어야 할 부분) */}
            <FieldWithLabel
              label="팀 소개 글"
              labelIcon={
                <Icon.FileIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            >
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
            </FieldWithLabel>
            {/* 모집 인터뷰 */}
            <FieldWithLabel
              label="모집 인터뷰"
              labelIcon={
                <Icon.FolderPlusIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
            >
              <Button
                sx={{ width: ['100%', '26rem'] }}
                variant="outlined"
                onClick={() => setOpenBasicModal(true)}
              >
                인터뷰 추가
              </Button>
              <SetInterview
                openBasicModal={openBasicModal}
                handleCloseBasicModal={setOpenBasicModal}
                interviewData={interviewList}
                setInterviewData={(value: Array<IFormInterview>) => {
                  setValue('interviewList', value)
                }}
              />
            </FieldWithLabel>
            {/* 등록, 취소 버튼 */}
            <Stack direction={'row'} gap={2} justifyContent={'flex-end'}>
              <CuButton
                message="취소"
                action={() => {
                  router.push('/')
                }}
                variant="outlined"
              />
              <Button variant="contained" type="submit">
                등록
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </>
  )
}

export default CreateTeam
