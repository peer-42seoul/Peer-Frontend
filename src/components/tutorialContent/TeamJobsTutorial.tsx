import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamJobsTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀 역할 추가 / 삭제 하기'} />
        <Content
          text={`
팀 내 역할을 추가하고 삭제하는 부분입니다. 처음 역할은 모집글을 작성할 때 설정한 역할이 들어갑니다. 이후 기존 역할의 수를 조정하거나 새로운 역할을 넣어서 팀원에게 부여할 수 있습니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamJobsTutorial
