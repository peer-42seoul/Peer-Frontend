import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

export const MainPageTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'스터디와 프로젝트를 찾아요.'} />
        <Content
          text={
            '메인 화면에서 보여질 게시물의 종류를 바꿀 수 있습니다. 스터디 버튼을 눌러 참여할 수 있는 스터디를, 프로젝트 버튼을 눌러 참여할 수 있는 프로젝트를 확인할 수 있습니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'필터를 이용해 맞춤 프로젝트를 찾아요.'} />
        <Content
          text={
            '현재 게시물에 필터를 걸어 좀 더 자세히 볼 수 있는 기능입니다. 사용하는 기술스택부터 목표 기간, 활동 방식과 지역을 선택해서 좀 더 맞는 프로젝트와 스터디를 찾아보세요! 검색을 한 뒤 필터를 적용할 수 있습니다.'
          }
        />
      </TitleContianer>
    </TutorialContainer>
  )
}
