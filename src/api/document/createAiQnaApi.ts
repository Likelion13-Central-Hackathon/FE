// AI QnA 생성 API(POST)
import defaultInstance from "../utils/instance";
import type { ApiEnvelope } from "../../types/api";

export type QAItem = { question: string; answer: string };

type Options = {
  signal?: AbortSignal;
  token?: string;
  idempotencyKey?: string;
};

const createAiQnaApi = async (
  answerId: number,
  opts: Options = {}
): Promise<QAItem[]> => {
  try {
    const url = `/answers/${answerId}/questions`;

    const res = await defaultInstance.post<ApiEnvelope<QAItem[]>>(
      url,
      {},
      {
        signal: opts.signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
          ...(opts.idempotencyKey ? { "Idempotency-Key": opts.idempotencyKey } : {}),
        },
        validateStatus: () => true,
      }
    );

    const { status } = res;
    const { isSuccess, httpStatus, message, data } = res.data ?? {};
    const okHttp = status >= 200 && status < 300;
    const okEnvelope = typeof isSuccess === "boolean" ? isSuccess : okHttp;

    if (okHttp && okEnvelope && Array.isArray(data)) {
      return data;
    }

    if (httpStatus === 404) {
      throw new Error("해당 ID에 해당하는 답변을 찾을 수 없습니다.");
    }
    if (httpStatus === 500) {
      throw new Error("서버 내부 오류가 발생했습니다.");
    }
    throw new Error(message ?? `QnA 생성 실패(HTTP ${httpStatus ?? status})`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error("createAiQnaApi Error: " + msg);
  }
};

export default createAiQnaApi;
