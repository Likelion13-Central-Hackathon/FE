// 레포트 상세 조회 API (GET)
import { ApiEnvelope } from "../../types/api";
import { ReportDetail } from "../../types/report";
import defaultInstance from "../utils/instance";

const getReportApi = async (reportId: number): Promise<ReportDetail> => {
  // reportId 오류 예방
  if (!Number.isFinite(reportId) || reportId <= 0) {
    throw new Error("getReportApi Error: 유효하지 않은 reportId");
  }

  try {
    const res = await defaultInstance.get<ApiEnvelope<ReportDetail>>(
      `/reports/${reportId}`
    );
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("레포트 상세 조회 성공");
      return data; // 레포트에 들어갈 많은 내용들
    } else if (httpStatus === 404 && !isSuccess) {
      console.warn("존재하지 않는 reportId: ", message);
      throw new Error("getReportApi Error: " + message);
    } else {
      console.warn("레포트 상세 조회 실패: ", message);
      throw new Error("getReportApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("getReportApi Error: " + e);
  }
};

export default getReportApi;
