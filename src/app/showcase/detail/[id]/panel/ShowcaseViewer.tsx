import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import TeamName from '../../../panel/common/TeamName'
import SkillInput from '../../../panel/common/SkillInput'
import StartEndDateViewer from '../../../panel/common/StartEndDateViewer'
import TeamMembers from '../../../panel/common/TeamMembers'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import ToastViewer from '@/components/ToastUIViewer'
import LinksViewer from '../../../panel/common/LinksViewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import * as style from './ShowcaseViewer.style'
import LabelWithIcon from '@/components/LabelWithIcon'
import { FileIcon } from '@/icons'
import * as Style from '../../../panel/common/SkillInput.style'
import useMedia from '@/hook/useMedia'

interface IShowcaseViewerProps {
  data: IShowcaseViewerFields
  postId: number
}

const CoverImage = ({ image }: { image: string }) => {
  return (
    <Box
      component="img"
      src={image}
      alt="쇼케이스 이미지"
      sx={style.imageViewer}
    />
  )
}

const InformationViewer = ({ data }: any) => {
  return (
    <Stack spacing={'0.5rem'} sx={style.InformationViewer}>
      <StartEndDateViewer start={data?.start} end={data?.end} />
      <SkillInput skills={data?.skills} />
      <TeamMembers members={data?.member} />
      <LinksViewer links={data?.links} />
    </Stack>
  )
}

const ContentViewer = ({ content }: { content: string }) => {
  return (
    <Stack sx={{ gap: '0.75rem' }}>
      <LabelWithIcon
        svgIcon={<FileIcon sx={Style.IconStyle} />}
        message="내용"
        color="text.alternative"
      />
      <ToastViewer
        initialValue={content}
        height="30rem"
        sx={{ width: '100%', boxSizing: 'border-box' }}
      />
    </Stack>
  )
}

const ShowcaseViewer = ({ data, postId }: IShowcaseViewerProps) => {
  const { isPc } = useMedia()
  return (
    <>
      {isPc ? (
        <Container sx={style.pcViewer}>
          <Stack>
            <TeamName
              teamName={data?.name}
              author={data.author}
              postId={postId}
              editMode={false}
            />
            <Stack sx={style.InformationViewerBox}>
              <InformationViewer data={data} />
              <Stack
                spacing={'0.5rem'}
                display={'flex'}
                width={'30%'}
                marginBottom={'0.5rem'}
              >
                <CoverImage image={data.image} />
              </Stack>
            </Stack>
          </Stack>
          <ContentViewer content={data?.content} />
        </Container>
      ) : (
        <Container sx={style.mobileViewer}>
          <Stack
            spacing={'0.5rem'}
            display={'flex'}
            width={'100%'}
            marginBottom={'0.5rem'}
          >
            <TeamName
              editMode={false}
              teamName={data?.name}
              author={data.author}
              postId={postId}
            />
            <CoverImage image={data.image} />
          </Stack>
          <InformationViewer data={data} />
          <ContentViewer content={data?.content} />
        </Container>
      )}
    </>
  )
}

export default ShowcaseViewer
