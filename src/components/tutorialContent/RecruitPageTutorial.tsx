import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const RecruitPageTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'이 게시물의 팀원이 되보세요.'} />
        <Content
          text={
            '참여하기를 원하는 게시물의 멤버가 되어 보세요. 지원하기 버튼을 누르면 스터디와 프로젝트에 지원할 수 있습니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'스터디'} />
        <Content text={'자동으로 스터디의 멤버로 지원하게 됩니다.'} />
        <SubTitle text={'프로젝트'} />
        <Content
          text={
            '팀에 설정된 역할에 지원할 수 있습니다. 중복 지원이 가능해 여러 역할을 맡아서 활동할 수 있습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default RecruitPageTutorial
