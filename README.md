# [peer-web-application 소개](https://peer-study.notion.site/peer-web-application-4357c6a2739348de9476e09b1f81cfce)
[소개 페이지 바로가기](https://peer-study.notion.site/peer-web-application-4357c6a2739348de9476e09b1f81cfce)

## [개발백서](https://drive.google.com/file/d/1yPsjwCqVCJryq3sThUn4MguhNuakDRFa/view?usp=drive_link)
[개발백서 링크](https://drive.google.com/file/d/1yPsjwCqVCJryq3sThUn4MguhNuakDRFa/view?usp=drive_link)

# 컨셉 아트
![peer1](https://github.com/joonseong11/Peer-Frontend/assets/87654307/2a92d7df-4595-421a-841a-553c32539ed7)
![peer2](https://github.com/joonseong11/Peer-Frontend/assets/87654307/12d1fd8a-a334-40bc-8ded-e1f6837f5f1e)
![peer3](https://github.com/joonseong11/Peer-Frontend/assets/87654307/c3d53d18-98d2-4921-9fec-abf0db6fa670)

# 상세
![image](https://github.com/peer-42seoul/Peer-Frontend/assets/87654307/eec4a32b-3768-49c0-9677-67e4a96455a0)
### 기술스택
#### Front-end : mui, typescript, react.js, next.js
#### Back-end : java, spring, mySQL, mongoDB

### 협업을 위한 문서들

**기능정의서** https://docs.google.com/spreadsheets/d/1hV6dizSpFn_dMCbVjFT59eQy7oTNmfK59LVYpfmYhAo/edit?usp=sharing

**세부 기획 정의서** https://docs.google.com/spreadsheets/d/1Dq1gftt09NmDohKkpLfPB9RuKYkbsOXc_iIj7t4yZiM/edit?usp=sharing

**프로토 타입**
https://www.figma.com/file/St064d90S4S7KJU33gjtzO/Peer-Design?type=design&node-id=4297%3A20043&mode=design&t=UqlnjVT9yWuMNCyQ-1

**와이어프레임** 
https://www.figma.com/file/St064d90S4S7KJU33gjtzO/Peer-Design?type=design&node-id=170%3A9803&mode=design&t=UqlnjVT9yWuMNCyQ-1

**세부 디자인**
https://www.figma.com/file/St064d90S4S7KJU33gjtzO/Peer-Design?type=design&node-id=1%3A255&mode=design&t=UqlnjVT9yWuMNCyQ-1

**특이사항**
- peer UI/UX 디자인 가이드 → 디자인시스템 구축 : 일관되지 않고, 중복되는 비효율적인 작업, 확장성 부족의 문제들을 해결하기 위해 디자인 가이드 기반으로 디자인 공통컴포넌트를 제작하였습니다.
- 자동화 : 협업툴로 Git, github를 사용하였습니다. 팀원들간의 pr 마다 랜덤으로 팀원이 배정되는 github 자동화 기능을 활용하여 2명의 peer review를 진행 후 approve → merge 순으로 진행하였습니다.
- CI/CD 로 github Action를 활용하였습니다.
- 기획팀, 디자이너팀, 개발팀 (프론트, 백엔드) 간의 협업으로 진행된 프로젝트 였습니다. 때문에 협업을 위해 시스템적 요소들을 고안하였습니다. 각 팀에 대표자 (리드)를 두어 대표자끼리 빠른 논의 및  의사결정 위주로 진행되었습니다.

### 프론트엔드 팀 구성
- 팀 등록, 어드민 페이지 : 전준성
- 검색, 팀페이지 : 임호성
- 로그인, DnD 레이아웃 : 김우림
- 쪽지, 팀페이지, 팀페이지 DnD 위젯 : 윤정연
- 메인페이지, 모집글, DnD 레이아웃 : 김현지
- 디자인시스템(공통컴포넌트), 프로필, 히치하이킹 : 나현
- 쇼케이스, 쪽지 : 정현섭

### 백엔드 팀 구성
- 알림 및 소켓 : 류한솔
- 회원, 팀 정보 : 송준상
- 회원 및 프로필 정보 : 이주현
- 어드민, 사용자 추적 : 김형찬
- 게시판 및 파일 정보 : 위지혜
- 알림 및 게시판: 채우석

### 기획 팀
- 류한솔, 위지혜, 임호성

### 디자이너 팀
- UI/UX, 디자인 시스템 : 이보람, 양채윤
- 책자 디자인 : 조하연

