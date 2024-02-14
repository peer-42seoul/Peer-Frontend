import { Content, TitleContianer, TutorialContainer } from './TutorialComponent'

const TeamAnnounceTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <Content
          text={'공지사항 작성과 삭제, 수정은 팀 리더만 할 수 있습니다.'}
        />
        <Content text={'댓글 삭제와 수정은 댓글 작성자만 할 수 있습니다.'} />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamAnnounceTutorial
