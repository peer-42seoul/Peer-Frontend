import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import useMedia from '@/hook/useMedia'
import CuButton from '../CuButton'
import CuModal from '../CuModal'
import DynamicToastViewer from '../DynamicToastViewer'
import * as style from './DetailPanel.style'

type TBoardType = 'NOTICE' | 'BOARD'

interface IChildrenProps {
  children: React.ReactNode
}

interface IDetailContentContainerProps {
  children: React.ReactNode
  containerTitle: string
  author: boolean
  onClickEditButton?: () => void
}

interface IDetailPageProps extends IChildrenProps {
  boardType: TBoardType
  handleGoBack: () => void
}

interface IStatusMessageProps {
  boardType: TBoardType
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

const title: Record<TBoardType, string> = {
  NOTICE: '공지사항',
  BOARD: '게시글',
}

export const DetailPage = ({
  children,
  boardType,
  handleGoBack,
}: IDetailPageProps) => {
  const { isPc } = useMedia()
  if (isPc) {
    return (
      <Stack sx={style.DetailPage} spacing={'1.5rem'}>
        {children}
      </Stack>
    )
  }
  return (
    <CuModal
      open={true}
      title={title[boardType]}
      onClose={handleGoBack}
      mobileFullSize
    >
      <Stack
        sx={{ ...style.DetailPage, height: '100%', overflowY: 'scroll' }}
        spacing={'1.5rem'}
      >
        {children}
      </Stack>
    </CuModal>
  )
}

export const DetailContentCotainer = ({
  containerTitle,
  children,
  author,
  onClickEditButton,
}: IDetailContentContainerProps) => {
  const { isPc } = useMedia()
  return (
    <Stack sx={isPc ? style.DetailContent : undefined} spacing={'2rem'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>{isPc ? containerTitle : ''}</Typography>
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
  boardType,
  message,
  onClickEditButton,
  author,
}: IStatusMessageProps) => {
  return (
    <DetailContentCotainer
      containerTitle={title[boardType]}
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
  const { isPc } = useMedia()
  return (
    <Stack spacing={isPc ? '1.5rem' : '1rem'}>
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
