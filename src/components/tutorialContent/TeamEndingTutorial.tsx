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
        <SubTitle text={'팀 활동 종료 절차에 대하여'} />
        <Content
          text={
            '여러 사유로 팀 활동을 마치게 되었을 때, 팀을 해산하거나 활동을 완료하는 기능입니다. 모든 기능은 모집이 완료된 이후 사용이 가능합니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'팀 활동 종료의 종류'} />
        <Content
          text={`
1. 팀 나가기: 팀을 나가는 행위로, 팀원의 경우 바로 나갈 수 있지만 마지막 남은 리더의 경우 팀 해산하기를 통해 나갈 수 있습니다.
2. 팀 해산하기: 팀을 없애는 행위로, 리더만이 팀 해산을 할 수 있습니다.
3. 팀 활동 완료: 팀 활동을 완료하였다는 의미로, 이 버튼을 누르면 활동을 완료하므로 팀 정보가 고정되고 쇼케이스를 작성해서 다른 유저에게 보여줄 수 있습니다,
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamEndingTutorial
