import DynamicToastViewer from '@/components/DynamicToastViewer'
import { Card, Stack, Typography } from '@mui/material'

const PeerPage = () => {
  const initialValue = `
# peer 소개
### 우리는 동료의 힘을 믿습니다.
peer 는 42 seoul (école 42 seoul campus) 학생들이 모여서 만든 커뮤니티 입니다. 우리는 교재, 수업, 교수가 없는 곳에서 동료학습으로 동료들과 함께 토론하고, 문제를 해결하는 법을 배우며 성장해왔습니다. 동료들과 함께하면 더 빨리 배우고, 불가능해 보이던 문제도 해결할 수 있다는 걸 경험했습니다.

### peer는 함께 성장할 동료들을 만날 수 있는 곳 입니다.
다양한 스터디와 프로젝트로 새로운 동료들과 연결될 수 있습니다. 다양한 “스터디/프로젝트의 모집글”, 관련 있는 팀을 모아 볼 수 있는 “히치하이킹”, 다른 동료들의 멋진 결과물을 볼 수 있는 “쇼케이스"로 만나보세요.

2022년 7월 peer가 탄생한 뒤로 약 220 여 개의 스터디/프로젝트, 약 80회 이상의 소규모 세미나가 열렸고, 다 회차의 오프라인 밋업 그리고 300명 규모의 2023 Wassup 42 컨퍼런스 & 네트워크 파티 개최 등의 다양한 행사를 진행해왔습니다. 이 모든 건 새로운 동료들과 교류할 수 있는 기회를 제공하기 위함이었고, 앞으로 peer 웹 서비스와 함께 더 많은 기회를 제공하고자 합니다.

### 귀감이 되는 동료를 칭찬해주세요
함께한 동료를 칭찬해주세요. 다른 사람들에게 동료를 추천해주세요. 여러분의 동료에 대한 긍정적인 피드백은 “피어레벨(추후 반영 예정)”으로 돌려드리고자 합니다.

### 동료들과 협업할 수 있는 편리한 도구를 제공합니다.
스터디/프로젝트 팀만을 위한 공간을 제공합니다. “나의 팀"에서 팀원들과 만나보세요. 팀 공지, 자료, 캘린더 일정관리 등을 한번에 모아서 관리할 수 있습니다.

### peer는 여러분의 성장을 응원합니다.
여러분들이 더 많은 동료들과 연결되고, 다양한 지식과 배움을 나누고, 함께 성장할 수 있는 방향으로 peer는 계속 나아가고자 합니다. 여러분들의 성장을 늘 응원하겠습니다


  `
  return (
    <Card sx={{ padding: '2rem' }}>
      <Stack>
        <Typography variant="Title2">Peer는 어떤 커뮤니티인가</Typography>
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

export default PeerPage
