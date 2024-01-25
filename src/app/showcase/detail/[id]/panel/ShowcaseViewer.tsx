import { Box, Stack } from '@mui/material'
import React from 'react'
import TeamName from '../../../panel/common/TeamName'
import SkillInput from '../../../panel/common/SkillInput'
import StartEndDateViewer from '../../../panel/common/StartEndDateViewer'
import TeamMembers from '../../../panel/common/TeamMembers'
import { IShowcaseViewerFields } from '@/types/IShowcaseEdit'
import ToastViewer from '@/components/ToastUIViewer'
import LinksViewer from '../../../panel/common/LinksViewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
interface IShowcaseViewerProps {
  data: IShowcaseViewerFields // IShowcase 타입을 import 해야 합니다.
}
const ShowcaseViewer = ({ data }: IShowcaseViewerProps) => {
  return (
    <Stack direction={'column'} spacing={'2.5rem'} sx={{ width: '26rem' }}>
      ## TODO hoslim이 만든 컴포넌트로교체하기
      {/* <InteractiveButtonGroup /> */}
      <Box component="img" src={data?.image} alt="쇼케이스 이미지" />
      <TeamName teamName={data?.name} />
      <StartEndDateViewer start={data?.start} end={data?.end} />
      <SkillInput skills={data?.skills} />
      <TeamMembers members={data?.member} />
      <LinksViewer links={data?.links} />
      <ToastViewer initialValue={data?.content} height="30rem" />
      ## TODO 댓글 추가하기
      {/* <CommentPage /> */}
    </Stack>
  )
}

export default ShowcaseViewer
