'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Container,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import ImageUploadButton from '@/components/ImageUploadButton'
import { ComponentType } from './fields/BasicSelect'
import { BasicSelect, SelectRegion, SetTeamRole } from './fields'
import { IRecruitWriteField } from '@/types/IRecruitWriteField'
import useAuthStore from '@/states/useAuthStore'
import * as style from '../page.style'
import * as Icon from '@/icons'
import TextFieldWithLabel from '@/components/TextFieldWithLabel'
import FieldWithLabel from '@/components/FieldWithLabel'
import { Controller, useForm } from 'react-hook-form'
import { FormControlLabel } from '@mui/material'
import SkillAutocomplete from '@/components/SkillAutocomplete'
import { ISkill } from '@/types/IUserProfile'
import DynamicToastEditor from '@/components/DynamicToastEditor'
import { Editor } from '@toast-ui/editor'
import Tutorial from '@/components/Tutorial'
import RecruitEditPageTutorial from '@/components/tutorialContent/RecruitEditPageTutorial'
import CuTextModal from '@/components/CuTextModal'
import useModal from '@/hook/useModal'
import useToast from '@/states/useToast'
import InterviewForm from './fields/Interview/InterviewForm'
import { SkillsTutorial } from '@/components/tutorialContent/SkillsTutorial'

const CreateTeamEditor = ({
  defaultValues,
  submitHandler,
  editorRef,
  editorType,
  isAnswered,
  isSubmitting,
}: {
  defaultValues: IRecruitWriteField
  submitHandler: (data: IRecruitWriteField) => Promise<void>
  editorRef: React.MutableRefObject<Editor | null>
  editorType: 'edit' | 'write'
  isAnswered?: boolean
  isSubmitting?: boolean
}) => {
  const [completedInterview, setCompletedInterview] = useState(false)

  const router = useRouter()

  const { openToast, closeToast } = useToast()

  const { isLogin } = useAuthStore()

  useEffect(() => {
    if (!isLogin) router.push('/login')
  }, [isLogin])

  const {
    openModal: openCompleteModal,
    closeModal: closeCompleteModal,
    isOpen: isCompleteOpen,
  } = useModal()
  const {
    openModal: openCancelModal,
    closeModal: closeCancelModal,
    isOpen: isCancelOpen,
  } = useModal()

  const {
    openModal: openInterviewModal,
    closeModal: closeInterviewModal,
    isOpen: isInterviewOpen,
  } = useModal()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
    setError,
    clearErrors,
  } = useForm<IRecruitWriteField>({
    defaultValues: defaultValues,
    mode: 'all',
  })

  const handleComplete = () => {
    closeToast()
    if (!image) {
      setError('image', {
        type: 'required',
        message: '필수 입력 항목입니다.',
      })
    }
    trigger().then(() => {
      if (!isValid) {
        openToast({
          severity: 'error',
          message: '문제가 있는 입력란이 있어요. 확인해주세요!',
        })
        return
      }
      openCompleteModal()
    })
  }

  const region = watch('region')
  const place = watch('place')
  const image = watch('image')
  const type = watch('type')
  const tagList = watch('tagList')

  return (
    <>
      <Container sx={style.containerStyle}>
        <Box
          sx={{
            paddingBottom: ['0.75rem', '1.5rem'],
            paddingLeft: ['0.25rem', undefined],
            paddingTop: ['0.75rem', undefined],
          }}
        >
          <Typography variant="CaptionEmphasis" lineHeight={'normal'}>
            모집 글 쓰기
          </Typography>
          <Tutorial
            title="모집 글 쓰는 방법"
            content={<RecruitEditPageTutorial />}
          />
        </Box>
        <form onSubmit={handleSubmit(submitHandler)} id="recruit-form">
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
              formHelperText={errors?.image?.message ?? undefined}
            >
              <ImageUploadButton
                id="image"
                setPreviewImage={(value: string) => {
                  setValue('image', value)
                }}
                sx={{ width: ['100%', 'content-fit'], maxWidth: '26rem', p: 0 }}
                disabled={editorType === 'edit'}
                onChange={() => {
                  clearErrors('image')
                }}
              >
                <Stack
                  direction={'column'}
                  spacing={'0.5rem'}
                  sx={{ width: ['100%', '26rem'] }}
                >
                  {/* 폴백 이미지 바꾸기 */}
                  {image && (
                    <Box
                      component={'img'}
                      src={image}
                      alt="Thumbnail"
                      sx={{
                        width: '100%',
                        maxWidth: '26rem',
                        objectFit: 'cover',
                        borderRadius: '0.75rem',
                      }}
                    />
                  )}
                  {/* 스타일만 따오도록 사용하는 컴포넌트를 div로 설정해주었습니다. */}
                  <Button
                    component="div"
                    variant="outlined"
                    startIcon={
                      <Icon.PlusIcon
                        color={errors.image ? 'error' : 'primary'}
                      />
                    }
                    sx={{ width: ['100%', '26rem'] }}
                    color={errors.image ? 'error' : 'primary'}
                  >
                    대표이미지 등록
                  </Button>
                </Stack>
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
              formHelperText={errors?.type?.message ?? undefined}
            >
              <Controller
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <Stack spacing={'0.5rem'} direction={'row'}>
                      <FormControlLabel
                        value="STUDY"
                        control={
                          <Radio sx={style.radioButtonStyle} size="small" />
                        }
                        label={
                          <Typography
                            variant={'Caption'}
                            color={'text.alternative'}
                          >
                            스터디
                          </Typography>
                        }
                        disabled={editorType === 'edit'}
                      />
                      <FormControlLabel
                        value="PROJECT"
                        control={
                          <Radio sx={style.radioButtonStyle} size="small" />
                        }
                        label={
                          <Typography
                            variant={'Caption'}
                            color={'text.alternative'}
                          >
                            프로젝트
                          </Typography>
                        }
                        disabled={editorType === 'edit'}
                      />
                    </Stack>
                  </RadioGroup>
                )}
                name="type"
                control={control}
                rules={{
                  required: '필수 입력 항목입니다.',
                }}
              />
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
                  placeholder="모집글 제목을 입력하세요."
                  id="title"
                  error={!!errors?.title}
                  sx={{ width: ['100%', '26rem'] }}
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
                  placeholder={`${
                    type === 'STUDY' ? '스터디' : '프로젝트'
                  } 이름을 입력하세요.`}
                  id="name"
                  error={!!errors?.name}
                  sx={{ width: ['100%', '26rem'] }}
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
            {type === 'PROJECT' ? (
              <SetTeamRole
                control={control}
                trigger={trigger}
                editorType={editorType}
              />
            ) : (
              // (스터디인 경우만) 모집인원 선택
              <Controller
                render={({ field }) => (
                  <FieldWithLabel
                    label="모집인원"
                    labelIcon={
                      <Icon.TwoPeopleIcon
                        sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                      />
                    }
                    formHelperText={errors?.max?.message ?? undefined}
                  >
                    <BasicSelect
                      {...field}
                      type={ComponentType.TeamSize}
                      error={!!errors?.max}
                      disabled={editorType === 'edit'}
                    />
                  </FieldWithLabel>
                )}
                name="max"
                control={control}
                rules={{
                  required: '필수 입력 항목입니다.',
                }}
              />
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
                  formHelperText={errors?.due?.message ?? undefined}
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
            {place !== 'ONLINE' && (
              <FieldWithLabel
                label="지역"
                labelIcon={
                  <Icon.LocationIcon
                    sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                  />
                }
                formHelperText={
                  errors?.region?.large?.message ||
                  errors?.region?.small?.message ||
                  undefined
                }
              >
                <SelectRegion region={region} control={control} />
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
                  placeholder={
                    '소통을 위해 사용하는 링크를 입력하세요. 예시) 카카오톡 오픈채팅'
                  }
                  sx={{ width: ['100%', '26rem'] }}
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
                minLength: {
                  value: 2,
                  message: '2자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 300,
                  message: '300자 이내로 입력해주세요.',
                },
                validate: {
                  pattern: (value) => {
                    if (!value) return true
                    const regex =
                      // eslint-disable-next-line no-useless-escape
                      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/
                    return regex.test(value) || '유효한 url을 입력하세요.'
                  },
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
              endIconButton={
                <Tutorial
                  title="기술 스택 추가 방법"
                  content={<SkillsTutorial />}
                />
              }
            >
              <Controller
                render={({ field }) => (
                  <SkillAutocomplete
                    setSkillList={(value: Array<ISkill>) => {
                      setValue('tagList', value)
                    }}
                    skillList={tagList}
                    type="TAG"
                    field={field}
                    error={!!errors?.tagList}
                    trigger={trigger}
                    placeholder="프로젝트에 필요한 기술을 입력하세요."
                    autocompleteSx={{ width: ['100%', '26rem'] }}
                  />
                )}
                control={control}
                name="tagList"
                rules={{ required: true }}
              />
            </FieldWithLabel>
            {/* 팀 소개 글 작성 (커스텀에디터 적용되어야 할 부분) */}
            <FieldWithLabel
              label="팀 소개 글"
              labelIcon={
                <Icon.FileIcon
                  sx={{ ...style.iconStyleBase, color: 'text.normal' }}
                />
              }
              sx={{ width: '100%' }}
            >
              <Box width={'100%'}>
                <DynamicToastEditor
                  initialValue="팀 소개 글 입니다."
                  editorRef={editorRef}
                />
              </Box>
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
              {(completedInterview || defaultValues.interviewList.length) && (
                <Typography
                  variant="Caption"
                  color={'primary'}
                  height={'2rem'}
                  width={'fit-content'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  인터뷰 작성 완료
                </Typography>
              )}
              <Button
                sx={{ width: ['100%', '26rem'] }}
                variant="outlined"
                onClick={() => {
                  openInterviewModal()
                }}
                disabled={isAnswered}
                startIcon={
                  !completedInterview && (
                    <Icon.PlusIcon
                      sx={{ ...style.iconStyleBase, color: 'primary' }}
                    />
                  )
                }
              >
                인터뷰{' '}
                {completedInterview || defaultValues.interviewList.length
                  ? '수정하기 '
                  : '추가'}
              </Button>
            </FieldWithLabel>
            {/* 등록, 취소 버튼 */}
            <Stack
              direction={'row'}
              spacing={'1rem'}
              justifyContent={['space-between', 'flex-end']}
            >
              <Button
                onClick={() => {
                  openCancelModal()
                }}
                variant="text"
                sx={{
                  color: 'primary',
                  width: ['100%', '8.75rem'],
                  height: '3rem',
                }}
              >
                취소
              </Button>
              <Button
                variant="contained"
                onClick={handleComplete}
                sx={{ width: ['100%', '8.75rem'], height: '3rem' }}
              >
                {isSubmitting
                  ? '제출 중 ...'
                  : editorType === 'write'
                    ? '등록하기'
                    : '수정하기'}
              </Button>
            </Stack>
          </Stack>
          <CuTextModal
            open={isCompleteOpen}
            onClose={closeCompleteModal}
            title="등록하시겠어요?"
            content={
              editorType === 'write'
                ? '등록하기를 누르면 팀원 모집이 시작돼요.'
                : '수정하기를 누르면 팀원 모집이 수정돼요.'
            }
            textButton={{
              text: '취소',
              onClick: closeCompleteModal,
            }}
            containedButton={{
              text: editorType === 'write' ? '등록하기' : '수정하기',
              onClick: () => {
                handleSubmit(submitHandler)()
              },
              isLoading: isSubmitting,
            }}
          />
        </form>
      </Container>
      <CuTextModal
        open={isCancelOpen}
        onClose={closeCancelModal}
        title="다음에 할까요?"
        content="다양한 멤버들과 함께 새로운 도전을 시작해 보세요."
        textButton={{
          text: '취소',
          onClick: closeCancelModal,
        }}
        containedButton={{
          text: '나가기',
          onClick: () => {
            router.replace('/')
          },
        }}
      />
      <InterviewForm
        control={control}
        closeModal={closeInterviewModal}
        isOpen={isInterviewOpen}
        trigger={trigger}
        setCompletedInterview={setCompletedInterview}
      />
    </>
  )
}

export default CreateTeamEditor
