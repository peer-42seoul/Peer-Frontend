import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const RecruitEditPageTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'나만의 팀을 만들어보세요!'} />
        <Content
          text={
            '자신이 원하는 형태의 스터디 / 프로젝트 모임을 만들어 보세요. 세부적인 설정을 통해 자신의 환경에 맞는 동료를 찾을 수 있습니다. 팀원이 해당 게시물에 지원하게 되면 [팀 페이지]의 팀 정보에서 지원 정보를 볼 수 있습니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'역할'} />
        <Content
          text={
            '스터디: 스터디에서 역할은 멤버와 리더로 한정되어 역할 설정이 따로 없습니다.'
          }
        />
        <Content
          text={'프로젝트: 역할 설정을 통해 자세한 직군을 모을 수 있습니다.'}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default RecruitEditPageTutorial
