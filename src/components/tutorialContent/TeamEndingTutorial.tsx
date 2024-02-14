import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamEndingTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀 활동 종료란?'} />
        <Content
          text={
            '여러 사유로 팀 활동을 마치게 되었을 때, 팀을 해산하거나 활동을 완료하는 기능입니다.'
          }
        />
        <Content
          text={
            '팀의 상태가 [모집 중], [모집 완료] 일 때에는 팀을 종료할 수 없습니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'팀 활동 종료의 종류'} />
        <Content
          text={
            '1. 팀 나가기: 팀원의 경우 바로 팀에서 나갈 수 있지만, 마지막 남은 리더의 경우 팀 해산하기를 통해 팀에서 나갈 수 있습니다.'
          }
        />
        <Content
          text={
            '2. 팀 해산하기: 팀 활동을 중단하고 팀을 없앱니다. 리더만 팀을 해산할 수 있습니다.'
          }
        />
        <Content
          text={
            '3. 팀 활동 완료: 팀 활동을 완료합니다. 팀 활동을 완료하면 팀 정보를 더 이상 수정할 수 없고 팀 활동에 대한 쇼케이스를 만들 수 있습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamEndingTutorial
