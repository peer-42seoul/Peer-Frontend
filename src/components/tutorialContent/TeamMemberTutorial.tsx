import { Content, TitleContianer, TutorialContainer } from './TutorialComponent'

const TeamMemberTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <Content text={'팀원을 관리하는 공간입니다.'} />
        <Content text={'팀원을 내보내거나 리더로 임명할 수 있습니다.'} />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamMemberTutorial
