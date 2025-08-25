<h5>Team 아직 한 방 남았다.</h5>

<div align="center">
  <h2> 📐 청년의 시작, 확신으로 바꾸다. [창업할각?] - FE</h2>
  <img width="900" alt="Image" src="https://github.com/user-attachments/assets/69f2e268-e058-4ea0-8a9e-439db8f1bb38" />
</div>

> 청년 창업자를 위한 **AI 기반 맞춤형 코칭 & 지원사업 추천 플랫폼**  
> 초기 창업자의 의사결정과 지원사업 연결을 돕는 [창업할각?] 프론트엔드 레포지토리

<br/>

### 🚀 배포 URL

---

https://likelion13-changuphalgak.netlify.app/

<br/>

### 💻 프로젝트 소개

---

최근 많은 청년들은 창업에 관심을 기울이고 있다. 청년들이 창업생태계를 조성하는 것은 지역경제 활성화의 해결방안이 되기도 한다.<br/>
**창업할각?** 은 단순한 정보 제공 수준을 넘어 **청년 창업자의 시작을 돕는 맞춤형 AI 파트너**라는 새로운 가치를 제시한다.<br/>

<br/>

### 🔍 문제 정의

---

1. **지원 체계를 활용하지 못한 청년들이 창업을 포기**

- 창업지원금, 멘토링, 공간 지원 등 다양한 제도가 존재하지만, 본인에게 맞는 지원 사업을 고르고 합격 여부를 장담하기 어려움

2. **지역 사회 경제에 미치는 부정적 영향**

- 청년들이 창업을 포기한다면 지속 가능한 성장을 추구해야 하는 지역 사회에도 큰 손해
- 실제로 청년창업 기업 수는 전년대비 9.1%가 감소

<br/>

### 💡 해결 방안

---

| 분석할각?                                                                                                             | 선정될각?                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| <img width="900" alt="Image" src="https://github.com/user-attachments/assets/e0edb3d7-924e-4fe5-a640-465efb7d972f" /> | <img width="900"  alt="Image" src="https://github.com/user-attachments/assets/ca0dd534-9d7f-40e5-9ffa-da54f4b00d3b" /> |
| 사용자가 입력한 창업아이템을 기반으로 AI가 유형, 전략을 분석해 swot와 로드맵을 포함한 레포트를 생성합니다.            | AI가 사업 계획서를 첨삭해주고, 지원사업에 선정되기 위한 예상 Q&A를 제공합니다.                                         |

1. **분석할각?**

- 사용자 입력(역량, 자원)을 기반으로 창업 유형/전략 분석
- AI가 SWOT/실행 로드맵 생성, 각도(Angle) 수치화해 레포트 제공
- AI 서버에서 BERT 임베딩 기반으로 수천 건 공고와 빠른 유사도 매칭
- 매주 최신 레포트 생성 후 이메일 전송

2. **선정될각?**

- 사업계획서 문항 답변에 대한 AI 첨삭
- 문항 답변, 첨삭에 기반한 예상 질의응답 제공

<br/>

### 🏆 프로젝트 목표

---

1. 정보 부족과 시행착오를 줄여 **청년 창업 참여를 확대**
2. 청년 **일자리 창출**과 투자 유치 -> 지역 경제의 선순환 촉진
3. 흩어진 자원을 연결 -> 지원 효율을 높임
4. 창업 성공률 향상 -> 청년 정착과 인재 유입으로 **지역 창업 클러스터** 형성
5. 수도권 편중 완화, 균형 발전, 사회적 기업 확산 -> 경제적·사회적 효과 동시 실현

<br/>

### 💰 수익성

---

- 수익 모델: 무료 기본 + 프리미엄 구독
- 확장 경로: 대학·지자체·공공기관과 연계 → 창업 클러스터 형성
- 지역 효과: 청년 정착, 일자리 창출, 균형 발전, 사회적 기업 확산

<br/>

### ✅ 빠른 실행 가이드

- 레포지토리 Clone
- 환경변수 세팅(루트에 `.env` 파일을 생성하고 아래와 같이 설정합니다.)

  ```bash
  ## .env
  VITE_BASE_URL=YOUR_SERVER_ADDRESS
  ```

- 애플리케이션 실행
  ```bash
  npm install
  npm run dev
  ```

<br/>

### 🛠 기술 스택

---

| 역할            | 도구                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Development     | <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white">                                                                                                                                                                                                                           |
| Language        | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white">                                                                                                                                                                                                                                                                                                          |
| Styling         | <img src="https://img.shields.io/badge/Scss-CC6699?style=flat-square&logo=Sass&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Fetching        | <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Main Library    | <img src="https://img.shields.io/badge/Zustand-885630?style=flat-square&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/react--router--dom-CA4245?style=flat-square&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/framer--motion-0055FF?style=flat-square&logoColor=white"> <img src="https://img.shields.io/badge/react--markdown-CB3837?style=flat-square&logoColor=white"> <img src="https://img.shields.io/badge/@react--pdf/renderer-2599ED?style=flat-square&logoColor=white"> |
| Version Control | <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>                                                                                                                                                                                                                                                                                                                              |
| Deploy          | <img src="https://img.shields.io/badge/netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                             |

<br/>

### ❓ 기술적 완성도

---

- **Typescript**

  - 설문 14문항을 기반으로 레포트에 담길 정보 10개 이상, 추천 지원사업에 담길 정보 15개 이상 등 많은 양의 필드를 다룸 → 데이터 구조가 복잡하고 필드 누락, 오타 같은 오류 가능성 높음
  - 입, 출력 스키마를 타입으로 명확히 정의 -> 컴파일 단계에서 오류 조기 발견 가능
  - 자동 완성, 타입 추론 -> 개발 생산성 향상, 프로젝트 안정성 강화

    <br/>
    → 많은 양의 복잡한 필드를 다루는 프로젝트 특성상, 입출력 스키마를 타입으로 정의함으로써 오류를 조기에 발견하고 자동 완성과 타입 추론을 통해 생산성과 안정성을 높임.

<br/>

- **Zustand**
  - “선정될각”의 모든 사용자 답변, AI 답변, QA를 전역 상태로 관리 → PDF, UI에서 동일한 데이터 참조 가능.
  - 코드가 간단, hook 기반 API 만으로 상태 조회/업데이트 가능
  - ref 기반 getSnapshot, useImperativeHandle 없이 전체 상태 수집 및 PDF 다운로드 가능
    <br/>
    → 문항별 상태를 전역에서 일관되게 관리하고, 합본 PDF를 쉽게 만들기 위함

<br/>

### 🔹 브랜치 전략

---

| 브랜치명       | 역할                                                          |
| -------------- | ------------------------------------------------------------- |
| `main`         | 배포 가능한 상태                                              |
| `dev`          | 개발 중(통합 브랜치)                                          |
| issue별 브랜치 | 이름 규칙: 키워드/#이슈번호-페이지이름 -> `design/#12-signup` |

<br/>

> 본 서비스는 청년 스타트업 대표 및 지역 창업동아리 인터뷰 기반으로 설계되었으며, 초기 사용자 피드백을 통해 개선되었습니다.
