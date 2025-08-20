export type CreateAiAnswerRequest = {
  questionNumber: number;
  userAnswer: string;
};

export type CreateAiAnswerResponse = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: { aiAnswer: string; answerId: number } | null;
  timeStamp: string;
};

const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const BASE_URL = RAW_BASE.replace(/\/+$/, ""); 


const PATH = "/answers";

export async function createAiAnswer(
  body: CreateAiAnswerRequest,
  opts?: { signal?: AbortSignal; token?: string }
): Promise<CreateAiAnswerResponse> {
  const url = `${BASE_URL}${PATH}`; 

  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Idempotency-Key": crypto.randomUUID(),
  };
  if (opts?.token) headers.Authorization = `Bearer ${opts.token}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: opts?.signal,
  });

  const payload = (await res.json()) as CreateAiAnswerResponse;
  if (!res.ok || !payload.isSuccess || !payload.data) {
    throw new Error(payload.message || `HTTP ${res.status}`);
  }
  return payload;
}
