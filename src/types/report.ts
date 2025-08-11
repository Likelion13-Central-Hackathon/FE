import { SizeProps } from "./common";

export interface InBoxProps extends SizeProps {
  children?: React.ReactNode;
}

export interface OutBoxProps extends SizeProps {
  children?: React.ReactNode;
  className?: string;
}

// RecommendPlan
type StepItem = {
  id: number | string;
  step: string;
};

export interface RecommendPlanProps {
  createdAt: string;
  steps: StepItem[];
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
