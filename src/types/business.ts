import { regions } from "../data/businessData";

// MapBox
export type Region = (typeof regions)[number];
export type RegionName = Region["name"];

// ResultItem, RankItem
export type RankImageProps = {
  rankImg: string; // 이미지 경로
};
