// 최신 레포트 상세 조회 API (POST)
import { ApiEnvelope } from "../../types/api";
import { EmailPw, ReportDetail } from "../../types/report";
import defaultInstance from "../utils/instance";

const getReportByEmailApi = async (body: EmailPw): Promise<ReportDetail> => {
  try {
    const res = await defaultInstance.post<ApiEnvelope<ReportDetail>>(
      `/reports/lastest`,
      body
    );
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("최신 레포트 상세 조회 성공");
      return data; // 레포트에 들어갈 많은 내용들
    } else if (httpStatus === 401 && !isSuccess) {
      console.warn("올바르지 않은 이메일 또는 비밀번호: ", message);
      throw new Error("getReportByEmailApi Error: " + message);
    } else if (httpStatus === 404 && !isSuccess) {
      console.warn("존재하지 않는 레포트: ", message);
      throw new Error("getReportByEmailApi Error: " + message);
    } else {
      console.warn("최신 레포트 상세 조회 실패: ", message);
      throw new Error("getReportByEmailApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("getReportByEmailApi Error: " + e);
  }
};

export default getReportByEmailApi;
