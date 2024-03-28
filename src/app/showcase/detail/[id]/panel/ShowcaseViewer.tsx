import { Container, Stack } from '@mui/material'
import React from 'react'
import TeamName from '../../../panel/common/TeamName'
import SkillInput from '../../../panel/common/SkillInput'
import StartEndDateViewer from '../../../panel/common/StartEndDateViewer'
import TeamMembers from '../../../panel/common/TeamMembers'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import LinksViewer from '../../../panel/common/LinksViewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import * as style from './ShowcaseViewer.style'
import LabelWithIcon from '@/components/LabelWithIcon'
import { FileIcon } from '@/icons'
import * as Style from '../../../panel/common/SkillInput.style'
import useMedia from '@/hook/useMedia'
import DynamicToastViewer from '@/components/DynamicToastViewer'
import CuPhotoBox from '@/components/CuPhotoBox'

interface IShowcaseViewerProps {
  data: IShowcaseViewerFields
  postId: number
}

const CoverImage = ({ image }: { image: string }) => {
  return (
    <CuPhotoBox
      style={{
        position: 'relative',
        maxWidth: '100%',
        width: '100%',
        height: '13.6rem',
        margin: 0,
      }}
      src={image}
      alt="이미지"
    />
  )
}

const InformationViewer = ({ data }: any) => {
  return (
    <Stack
      component={'section'}
      spacing={'0.5rem'}
      sx={style.InformationViewer}
    >
      <StartEndDateViewer start={data?.start} end={data?.end} />
      <SkillInput skills={data?.skills} />
      <TeamMembers members={data?.member} />
      <LinksViewer links={data?.links} />
    </Stack>
  )
}

const ContentViewer = ({ content }: { content: string }) => {
  return (
    <Stack component={'section'} sx={{ gap: '0.75rem' }}>
      <LabelWithIcon
        svgIcon={<FileIcon sx={Style.IconStyle} />}
        message="내용"
        color="text.alternative"
      />
      <DynamicToastViewer initialValue={content} />
    </Stack>
  )
}

const ShowcaseViewer = ({ data, postId }: IShowcaseViewerProps) => {
  const { isPc } = useMedia()
  return (
    <>
      {isPc ? (
        // Pc와 모바일의 레이아웃 구조가 달라서 isPc 에 따라서 레이아웃을 다르게 설정
        <Container sx={style.pcViewer}>
          <Stack component={'section'}>
            <TeamName
              teamName={data?.name}
              author={data.author}
              postId={postId}
              editMode={false}
            />
            {/* 쇼케이스 게시 정보 */}
            <Stack component={'section'} sx={style.InformationViewerBox}>
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
          {/* 쇼케이스 게시물 뷰어*/}
          <ContentViewer content={data?.content} />
        </Container>
      ) : (
        <Container component={'main'} sx={style.mobileViewer}>
          {/* 모바일에서는 이미지가 위로 올라가도록 설정. */}
          <Stack
            component={'section'}
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
          {/* 쇼케이스 게시 정보 */}
          <InformationViewer data={data} />
          {/* 쇼케이스 게시물 뷰어*/}
          <ContentViewer content={data?.content} />
        </Container>
      )}
    </>
  )
}

export default ShowcaseViewer
