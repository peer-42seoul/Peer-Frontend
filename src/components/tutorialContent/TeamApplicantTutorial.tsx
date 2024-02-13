import { Content, TitleContianer, TutorialContainer } from './TutorialComponent'

const TeamApplicantTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <Content text={'팀에 지원한 대기자들의 목록을 확인할 수 있습니다.'} />
        <Content
          text={'모집글 작성 시 만든 인터뷰에 대한 지원자의 답변을 확인하고'}
        />
        <Content
          text={
            '승인 버튼을 눌러 팀원으로 추가하거나, 거절 버튼을 눌러 지원을 거절할 수 있습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamApplicantTutorial
