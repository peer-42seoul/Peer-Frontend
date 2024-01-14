import { Stack, Typography } from '@mui/material'
import DynamicToastViewer from '../DynamicToastViewer'
import dayjs from 'dayjs'
import CuButton from '../CuButton'
import * as style from './DetailPanel.style'

interface IChildrenProps {
  children: React.ReactNode
}

interface IDetailContentContainerProps {
  children: React.ReactNode
  containerTitle: string
  author: boolean
  onClickEditButton?: () => void
}

interface IStatusMessageProps {
  message: string
  onClickEditButton?: () => void
  author: boolean
}

interface IDetailContentProps {
  title: string
  createdAt: Date
  authorNickname: string
  content: string
}

export const DetailPage = ({ children }: IChildrenProps) => {
  return (
    <Stack sx={style.DetailPage} spacing={'1.5rem'}>
      {children}
    </Stack>
  )
}

export const DetailContentCotainer = ({
  containerTitle,
  children,
  author,
  onClickEditButton,
}: IDetailContentContainerProps) => {
  return (
    <Stack sx={style.DetailContent} spacing={'2rem'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>{containerTitle}</Typography>
        {author && (
          <CuButton
            message={'수정'}
            action={onClickEditButton}
            variant={'text'}
            TypographyProps={{
              color: 'text.alternative',
              variant: 'Caption',
            }}
          />
        )}
      </Stack>
      {children}
    </Stack>
  )
}

export const StatusMessage = ({
  message,
  onClickEditButton,
  author,
}: IStatusMessageProps) => {
  return (
    <DetailContentCotainer
      containerTitle={'공지사항'}
      onClickEditButton={onClickEditButton}
      author={author}
    >
      <Typography
        textAlign={'center'}
        variant={'Body2'}
        color={'text.alternative'}
      >
        {message}
      </Typography>
    </DetailContentCotainer>
  )
}

const ContentTitle = ({ title }: { title: string }) => {
  return (
    <Typography color={'text.strong'} variant={'CaptionEmphasis'}>
      {title}
    </Typography>
  )
}

const Content = ({ content }: { content: string }) => {
  return (
    <Typography color={'text.alternative'} variant={'Body2'}>
      {content}
    </Typography>
  )
}

export const DetailContent = ({
  title,
  createdAt,
  authorNickname,
  content,
}: IDetailContentProps) => {
  return (
    <Stack spacing={'1.5rem'}>
      <Stack spacing={'0.5rem'}>
        <ContentTitle title={'제목'} />
        <Content content={title} />
      </Stack>
      <Stack spacing={'0.5rem'}>
        <ContentTitle title={'작성일'} />
        <Content content={dayjs(createdAt).format('YYYY-MM-DD')} />
      </Stack>
      <Stack spacing={'0.5rem'}>
        <ContentTitle title={'작성자'} />
        <Content content={authorNickname} />
      </Stack>
      <Stack spacing={'0.5rem'}>
        <ContentTitle title={'내용'} />
        <DynamicToastViewer sx={style.Viewer} initialValue={content} />
      </Stack>
    </Stack>
  )
}
