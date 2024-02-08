import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamApplicantTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀 지원자 목록 보기'} />
        <Content
          text={`
이 팀에 지원을 한 대기자들의 목록이 뜹니다. 모집글 작성 시 적어놓은 질문과 답이 나오고 승인 버튼을 누르면 팀원이 되고, 거절을 누르면 대기자 목록에서 사라집니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamApplicantTutorial
