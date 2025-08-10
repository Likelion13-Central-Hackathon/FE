// 레포트: 추천 창업 계획에 있는 라벨들
export interface PlanLabel {
  width: string;
  title: string;
  desc: string;
}

export const planLabels: PlanLabel[] = [
  {
    width: "20.89vw",
    title: "시장 적합성",
    desc: "고객 니즈에 부합하는 제품/서비스 개발 → 초기 유저 확보",
  },
  {
    width: "18.02vw",
    title: "비즈니스 모델 검증",
    desc: "유료 고객 전환 → 수익 구조 타당성 검증",
  },
  {
    width: "20.16vw",
    title: "브랜드 구축",
    desc: "초기 팬층 + SNS 브랜딩을 통한 충성도 높은 고객 확보",
  },
  {
    width: "20.31vw",
    title: "성장 가능성",
    desc: "확보 데이터 기반으로 투자자 설득 가능 + 파트너십 확장",
  },
] as const;
