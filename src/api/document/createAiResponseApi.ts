// AI 첨삭 답변 API(POST)
import { ApiEnvelope } from "../../types/api";
import { CreateAiAnswerRequest, CreateAiAnswerResult } from "../../types/document";
import defaultInstance from "../utils/instance";

export const createAiAnswer = async (
  body: CreateAiAnswerRequest,
): Promise<CreateAiAnswerResult> => {
  try {
    const res = await defaultInstance.post<ApiEnvelope<CreateAiAnswerResult>>(
      "/answers",
      body,
    );

    const { status } = res;
    const { httpStatus, isSuccess, data, message } = res.data ?? {};
    const effectiveStatus = typeof httpStatus === "number" ? httpStatus : status;
    const okHttp = effectiveStatus >= 200 && effectiveStatus < 300;
    const okEnvelope = typeof isSuccess === "boolean" ? isSuccess : okHttp;

    if (okHttp && okEnvelope && data) {
      return data;
    }
    if (effectiveStatus === 500) {
      throw new Error(message ?? "서버 내부에서 알 수 없는 오류가 발생했습니다.");
    }

    throw new Error(message ?? `AI 첨삭 생성 실패(HTTP ${effectiveStatus})`);
  } catch (e: unknown) {
    console.error(e);
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error("createAiAnswer Error: " + msg);
  }
};

export default createAiAnswer;
