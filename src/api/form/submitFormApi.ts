// 창업 아이디어 생성 API(POST)
import { ApiEnvelope } from "../../types/api";
import { FormRequestBody } from "../../utils/form/submitFormRequestBody";
import defaultInstance from "../utils/instance";

export type IdeaCreateResult = { ideaId: number };

const submitFormApi = async (
  body: FormRequestBody
): Promise<IdeaCreateResult> => {
  try {
    const res = await defaultInstance.post<ApiEnvelope<IdeaCreateResult>>(
      `/ideas`,
      body
    );
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 201 && isSuccess) {
      console.log("아이디어 생성 성공");
      return data; // ideaId
    } else if (httpStatus === 409 && !isSuccess) {
      console.warn("중복/충돌:", message);
      throw new Error("submitFormApi Error: " + message);
    } else {
      console.warn("아이디어 생성 실패:", message);
      throw new Error("submitFormApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("submitFormApi Error: " + e);
  }
};

export default submitFormApi;
