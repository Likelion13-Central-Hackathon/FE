// 레포트 생성 API(POST)
import { ApiEnvelope } from "../../types/api";
import defaultInstance from "../utils/instance";

export type ReportCreateResult = { reportId: number };

const createReportApi = async (ideaId: number): Promise<ReportCreateResult> => {
  try {
    const res = await defaultInstance.post<ApiEnvelope<ReportCreateResult>>(
      `/ideas/${ideaId}/reports`,
      {}
    );
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 201 && isSuccess) {
      console.log("레포트 생성 성공");
      return data; // reportId
    } else if (httpStatus === 404 && !isSuccess) {
      console.warn("존재하지 않는 ideaId", message);
      throw new Error("createReportApi Error: " + message);
    } else {
      console.warn("레포트 생성 실패:", message);
      throw new Error("createReportApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("createReportApi Error: " + e);
  }
};

export default createReportApi;
