import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const TeamStatusTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'팀 설정 페이지'} />
        <Content
          text={
            '팀의 정보를 설정할 수 있는 페이지입니다. 팀의 정보를 수정한 뒤 수정 버튼을 눌러야 수정이 됩니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'팀 상태에 대한 설명'} />
        <Content
          text={`
1. 모집 중: 팀원을 모집 중인 상태로, 이때는 팀 해산 / 활동 완료 / 팀 나가기를 할 수 없습니다.
`}
        />
        <Content
          text={`
2. 모집 완료: 팀원을 다 모집하고 시작하기 전인 상태입니다. 진행 중으로 상태를 변경해야 진행이 됩니다.
`}
        />
        <Content
          text={`
3. 활동 중: 팀 활동이 진행되고 있는 상태입니다.
`}
        />

        <Content
          text={`
4. 완료: 팀 활동이 완료된 상태로, 이후 팀 정보를 수정하실 수 없습니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default TeamStatusTutorial
