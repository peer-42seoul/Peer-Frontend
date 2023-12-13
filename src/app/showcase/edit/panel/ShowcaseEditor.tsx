'use client'
import ImageUploadButton from '@/components/ImageUploadButton'
import { ITag } from '@/types/IPostDetail'
import { IUserProfileLink } from '@/types/IUserProfile'
import {
  Avatar,
  Box,
  InputAdornment,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import {
  // useFieldArray,
  useForm,
} from 'react-hook-form'
import LabelWithIcon from './LabelWithIcon'
import { ImageIcon, ListIcon, TagIcon } from './icons/icons'
import CuTextField from '@/components/CuTextField'
import CuButton from '@/components/CuButton'
import TagChip from '@/components/TagChip'

interface IShowcaseEditorFields {
  image: File[] | null
  tags: ITag[]
  startDate: string
  endDate: string
  links: IUserProfileLink[]
  content: string
}

const ShowcaseImageStyle: SxProps = {
  width: '18.5rem',
  height: '12.5rem',
  objectFit: 'cover',
  borderRadius: '0.25rem',
  border: '1px solid',
  borderColor: 'line.alternative',
}

const IconStyle: SxProps = {
  color: 'text.normal',
  width: '1rem',
  height: '1rem',
}

const ShowcaseEditor = () => {
  const [previewImage, setPreviewImage] = useState<string>('')

  const defaultValues: IShowcaseEditorFields = {
    image: null,
    tags: [],
    startDate: '',
    endDate: '',
    links: [],
    content: '',
  }
  const {
    //  control,
    register,
    setValue,
  } = useForm({
    defaultValues: defaultValues,
  })
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'links',
  // })

  return (
    <form>
      <Stack direction={'column'} spacing={'2.5rem'}>
        <Stack
          direction={'column'}
          spacing={'0.5rem'}
          alignItems={'flex-start'}
        >
          <LabelWithIcon
            svgIcon={<ImageIcon sx={IconStyle} />}
            message={'쇼케이스 대표 이미지'}
          />
          <ImageUploadButton
            setImage={(image: File[]) => {
              setValue('image', image)
            }}
            setPreviewImage={setPreviewImage}
            register={register('image')}
          >
            {previewImage ? (
              <Box
                component={'img'}
                alt="쇼캐이스 대표 이미지"
                src={previewImage ? previewImage : '/images/teamLogo.png'}
                sx={ShowcaseImageStyle}
              />
            ) : (
              <Box
                sx={{
                  ...ShowcaseImageStyle,
                  position: 'relative',
                  backgroundColor: 'background.tertiary',
                }}
              >
                <Typography
                  variant={'Body1'}
                  sx={{
                    color: 'text.normal',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'auto',
                  }}
                >
                  클릭해서 이미지를
                  <br />
                  업로드하세요
                </Typography>
              </Box>
            )}
          </ImageUploadButton>
        </Stack>
        <Stack direction={'column'} spacing={'0.5rem'}>
          <LabelWithIcon
            svgIcon={<ListIcon sx={IconStyle} />}
            message="프로젝트 팀명"
          />
          <Stack direction={'row'} spacing={'6px'} alignItems={'center'}>
            <Avatar src={''} sx={{ width: '2rem', height: '2rem' }} />
            <Typography variant={'Body2'}>프로젝트명 피어</Typography>
          </Stack>
        </Stack>
        <Stack direction={'column'} spacing={'0.5rem'} width={'26rem'}>
          <LabelWithIcon
            svgIcon={<TagIcon sx={IconStyle} />}
            message="기술 스택"
          />
          <CuTextField
            placeholder="등록할 기술을 입력하세요."
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CuButton
                    variant="text"
                    style={{
                      color: 'text.normal',
                      marginRight: '0.75rem',
                      padding: '0rem 0.25rem',
                    }}
                    message="등록"
                    TypographyProps={{ variant: 'CaptionEmphasis' }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Stack
            spacing={0.75}
            py={1}
            flexWrap={'wrap'}
            width={1}
            direction={'row'}
            useFlexGap
          >
            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />

            <TagChip
              name={'React'}
              color={'#FF5833'}
              deleteIcon
              onDelete={() => {
                console.log('delete')
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </form>
  )
}

export default ShowcaseEditor
