import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamAnnounceTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀 공지사항에서 주의사항'} />
        <Content
          text={`
공지사항으로 적은 글의 삭제와 수정 권한은 글 작성자에게 있습니다.
댓글의 삭제와 수정 권한은 댓글의 작성자에게 권한이 있습니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamAnnounceTutorial
