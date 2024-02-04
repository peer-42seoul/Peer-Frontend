import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamMemberTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀원 목록 확인하기'} />
        <Content
          text={`
팀원을 관리하는 공간입니다. 팀원을 강제로 내보내거나 리더로 임명시킬 수 있습니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamMemberTutorial
