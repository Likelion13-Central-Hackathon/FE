// 추천 창업 지원사업 목록 조회 (GET)
import { ApiEnvelope } from "../../types/api";
import { RankItemDetail } from "../../types/business";
import defaultInstance from "../utils/instance";

const getRecomBusinessApi = async (
  reportId: number
): Promise<RankItemDetail[]> => {
  // reportId 오류 예방
  if (!Number.isFinite(reportId) || reportId <= 0) {
    throw new Error("getRecomBusinessApi Error: 유효하지 않은 reportId");
  }

  try {
    const res = await defaultInstance.get<ApiEnvelope<RankItemDetail[]>>(
      `/reports/${reportId}/recommendations`
    );
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("추천 창업 지원사업 목록 조회 성공");
      return data; // 레포트에 들어갈 많은 내용들
    } else if (httpStatus === 404 && !isSuccess) {
      console.warn("존재하지 않는 추천 창업 지원사업: ", message);
      throw new Error("getRecomBusinessApi Error: " + message);
    } else {
      console.warn("추천 창업 지원사업 목록 조회 실패: ", message);
      throw new Error("getRecomBusinessApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("getRecomBusinessApi Error: " + e);
  }
};

export default getRecomBusinessApi;
