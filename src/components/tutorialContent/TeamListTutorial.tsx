import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

export const TeamListTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'자신의 팀을 확인하세요.'} />
        <Content
          text={
            '직접 만든 팀이나 지원한 팀을 볼 수 있습니다. 팀을 클릭하면 팀의 정보를 확인할 수 있습니다. 자세한 팀의 정보를 확인하려면 팀의 멤버가 되어야 합니다. [대기 중] 상태일 때는 팀의 정보를 확인할 수 없습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}
