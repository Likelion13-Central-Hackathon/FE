// 전체 창업 지원사업 목록 조회 (GET)
import { ApiEnvelope } from "../../types/api";
import { BusinessItemProps } from "../../types/business";
import defaultInstance from "../utils/instance";

const getAllBusinessApi = async (
  page: number = 0,
  num: number = 5,
  region: string
): Promise<BusinessItemProps[]> => {
  try {
    const res = await defaultInstance.get<ApiEnvelope<BusinessItemProps[]>>(
      "/startup-supports",
      {
        params: { page, num, region },
      }
    );
    const { httpStatus, isSuccess, data, message } = res.data ?? {};

    if (httpStatus === 200 && isSuccess) {
      console.log("전체 창업 지원사업 목록 조회 성공");
      return data ?? [];
    } else if (httpStatus === 400 && !isSuccess) {
      console.warn("잘못된 region: ", message);
      throw new Error("getAllBusinessApi Error: " + message);
    } else {
      console.warn("전체 창업 지원사업 목록 조회 실패: ", message);
      throw new Error("getAllBusinessApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("getAllBusinessApi Error: " + e);
  }
};

export default getAllBusinessApi;
