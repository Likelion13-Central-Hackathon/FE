import { regions } from "../data/businessData";

// MapBox
export type Region = (typeof regions)[number];
export type RegionName = Region["name"];

// ResultItem, RankItem
type RankItemCommon = {
  title: string;
  startDate: string;
  endDate: string;
  suitability: number;
  agency: string;
  supportArea: string;
};

// 통신용
// type RankItemSimple = RankItemCommon & {
//   recommendedId: number;
// };

type RankItemDetail = RankItemCommon & {
  link: string;
  region: string;
  businessDuration: string;
  target: string;
  contact: string;
  applyMethod: string;
  supportDetails: string;
  targetAge: string;
  isRecruiting: boolean;
  guidanceUrl: string;
  reason: string;
};

export type RankItemProps = {
  rankImg: string;
  item: RankItemCommon;
};

export type ResultItemProps = {
  rankImg: string;
  item: RankItemDetail;
};
