import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamBoardTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'게시판 관리'} />
        <Content
          text={
            '게시판 관리 페이지에서 게시판을 추가하거나 삭제할 수 있습니다.'
          }
        />
        <Content text={'게시판 관리는 팀 리더만 할 수 있습니다.'} />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'수정 / 삭제 권한'} />
        <Content text={'게시글 삭제와 수정은 글 작성자만 할 수 있습니다.'} />
        <Content text={'댓글의 삭제와 수정은 댓글 작성자만 할 수 있습니다.'} />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamBoardTutorial
