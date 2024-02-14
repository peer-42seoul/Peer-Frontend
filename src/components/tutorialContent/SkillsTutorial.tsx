import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

export const SkillsTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'기술 스택이나 스킬을 찾아보세요.'} />
        <Content text={'기술 스택이나 스킬을 선택하여 태그를 추가해보세요.'} />
        <Content
          text={'검색어를 입력하면 스킬 이름이 자동완성되어 보여집니다.'}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}
