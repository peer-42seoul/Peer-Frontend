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
          text={`
직접 만든 팀이나 참여 중인 팀을 볼 수 있습니다.
기본적으로 팀이 스터디인지 프로젝트인지를 볼 수 있고, 팀의 이름이 표시됩니다.
팀원이 되면 팀 이름 옆에 자신의 역할이 보입니다.
정보를 확인하고 싶은 팀을 클릭해서 팀만의 공간으로 이동하세요.
`}
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'팀의 상태를 확인하세요.'} />
        <Content
          text={`
자신이 맘에 드는 팀에 지원하게 되면 그 승인을 대기해야 합니다.
[대기 중] 상태일 때는 팀의 정보를 확인할 수 없습니다.
대신 팀을 클릭하면 해당 팀의 모집글로 갈 수 있습니다.
`}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}
