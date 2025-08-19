import { SizeProps } from "./common";

export interface InBoxProps extends SizeProps {
  children?: React.ReactNode;
}

export interface OutBoxProps extends SizeProps {
  children?: React.ReactNode;
  className?: string;
}

// RecommendPlan
export interface RecommendPlanProps {
  createdAt: string;
  steps: string[];
}

// BusinessItem
interface Business {
  title: string;
  suitability: number;
  startDate: string;
  endDate: string;
}

export interface BusinessItemProps {
  business: Business;
}

// ----- 레포트 조회 api용
// 뉴스
export type ReportNews = {
  title: string;
  link: string;
};

// 추천 창업
export type ReportRecommendation = {
  title: string;
  startDate: string;
  endDate: string;
  suitability: number;
};

// 레포트 상세
export type ReportDetail = {
  id: number;
  angle: number;
  researchMethod: string;
  strength: string;
  weakness: string;
  opportunity: string;
  threat: string;
  steps: string[];
  expectedEffect: string;
  createdAt: string;
  newsList: ReportNews[];
  recommendations: ReportRecommendation[];
};
