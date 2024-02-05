import DynamicToastViewer from '@/components/DynamicToastViewer'
import { Card, Stack, Typography } from '@mui/material'

const MindPage = () => {
  const initialValue = `
# peer의 철학
### école 42 의 핵심 교육 시스템. 동료학습을 어떻게 제대로 활용할 수 있을까?
peer의 출발점은 프랑스의 IT 혁신학교 école 42 입니다. école 42 는 학비, 교재, 교수가 없고, 동료학습(peer-to-peer-learning), 프로젝트 기반 학습(project-based-learning)으로 설계된 혁신적인 교육과정입니다. 올린공대, 미네르바스쿨과 함께 세계 3대 혁신교육대학으로 평가받고있으며. 약 20 여 국가에 50 여 개의 캠퍼스가 운영되고 있습니다. 이 중 과학기술정보통신부 산하의 이노베이션아카데미 재단이 école 42 서울 캠퍼스를 설립 및 운영하고 있습니다.

초창기 42 서울은 코로나 팬데믹의 여파로 école 42 의 커리큘럼과 시스템은 존재하지만, 동료가 없는 상황이었습니다. 그럼에도 불구하고 init6, 피카츄 번개스터디, 팔만코딩경 등 학생들의 주도적이고 자발적인 활동으로 동료학습의 문화와 분위기를 조성하려는 시도들이 계속해서 생겨났습니다. peer도 이런 흐름 속에서 탄생한 커뮤니티 입니다. 

동료학습이란 무엇일까요? 어떻게 보면 교수가 없어도 학습할 수 있는 집단 교육 시스템이라고 평가할 수 있습니다. 그게 가능한 이유는 무엇일까요. 우리는 정보화시대에 살고 있습니다. 마우스 클릭 한 번으로 지구 반대편 MIT 공대의 명교수에게 수업을 들을 수 있죠. 이미 우리는 학습할 교재도, 교사를 가지고 있는 셈입니다. 우리는 그런 값진 정보들을 어떻게 찾고 배울 수 있느냐를 배워야 하는 것이죠. 또한 정보를 검증하고, 습득하고, 적용하는 과정에서 동료들과 토론하며 문제를 해결하는 방법을 훈련하게 됩니다. 

peer의 스터디/프로젝트, 오프더레코드, 모여봐요 과제의 숲, 2023 WASSUP 컨퍼런스 & 파티 등.  peer는 접점이 없던 다양한 학생들이 만날 수 있는 기회를 제공하고 그리하여 혁신교육을 온전히 누릴 수 있도록 이바지해왔던 것 입니다. 

peer는 동료의 힘을 믿습니다. 동료들과 함께 성장하는 것이 더 빠르게 배우고, 불가능해 보였던 문제를 해결하게 만들어 준다고 말입니다.
  `
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">Peer 철학 & 비전</Typography>
        <Typography variant="Caption">생성일자: 2024년 2월 5일</Typography>
        <Typography variant="Caption">수정일자: 2024년 2월 5일</Typography>
      </Stack>
      <br />
      <Stack>
        <Card
          sx={{
            boxShadow: 'none',
            backgroundColor: 'background.secondary',
            padding: '1rem',
          }}
        >
          <DynamicToastViewer initialValue={initialValue} />
        </Card>
      </Stack>
    </Card>
  )
}

export default MindPage
