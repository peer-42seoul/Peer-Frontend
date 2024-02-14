import { Content, TitleContianer, TutorialContainer } from './TutorialComponent'

const TeamJobsTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <Content text={'팀 내 역할을 추가하거나 삭제할 수 있습니다.'} />
        <Content
          text={
            '처음 설정되어 있는 역할은 모집글을 작성할 때 설정한 역할과 같습니다.'
          }
        />
        <Content
          text={
            '역할의 이름이나 그 역할을 담당할 인원의 수를 수정하거나 새로운 역할을 추가할 수 있습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamJobsTutorial
