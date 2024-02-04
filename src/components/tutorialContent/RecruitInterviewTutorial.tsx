import Image from 'next/image'
import {
  Content,
  SubTitle,
  TitleContianer,
  TutorialContainer,
} from './TutorialComponent'

const RecruiterInterviewTutorial = () => {
  return (
    <TutorialContainer>
      <TitleContianer>
        <SubTitle text={'지원자에게 궁금한 게 있어요!'} />
        <Content
          text={
            '팀원을 모집할 때 물어보고 싶은 질문을 다양한 인터뷰 형태로 남겨보세요. 인터뷰를 등록해서 지원자들의 생각과 각오를 직접 확인해보세요. 여기서 남은 질문은 각 팀 마다의 [팀 설정]에서 확인이 가능합니다.'
          }
        />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text={'인터뷰 등록 방법'} />
        <Content text={'질문을 입력한 뒤 질문 추가를 꼭 눌러주세요!'} />
      </TitleContianer>
      <TitleContianer>
        <SubTitle text="인터뷰 종류" />
        <Image
          src="/images/tutorial/interview-type.svg"
          alt="interviewType"
          width={0}
          height={0}
          style={{ width: '30rem', height: 'auto' }}
        />
      </TitleContianer>
    </TutorialContainer>
  )
}

export default RecruiterInterviewTutorial
