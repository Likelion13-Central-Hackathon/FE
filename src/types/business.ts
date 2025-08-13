import { regions } from "../data/BusinessData";

// MapBox
export type Region = (typeof regions)[number];
export type RegionName = Region["name"];
