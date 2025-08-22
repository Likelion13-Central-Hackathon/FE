// 메일 구독 신청 API (POST)
import { ApiEnvelopeNullable } from "../../types/api";
import { SubscribeMailData, SubscribeMailRequest } from "../../types/report";
import defaultInstance from "../utils/instance";

const subscribeMailApi = async (
  body: SubscribeMailRequest
): Promise<SubscribeMailData> => {
  try {
    const res = await defaultInstance.post<
      ApiEnvelopeNullable<SubscribeMailData>
    >(`/email-subscriptions`, body);
    const { httpStatus, isSuccess, data, message } = res.data;

    if (httpStatus === 200 && isSuccess) {
      console.log("메일 구독 신청 성공");
      return data;
    } else {
      console.warn("메일 구독 신청 실패:", message);
      throw new Error("subscribeMailApi Error: " + message);
    }
  } catch (e) {
    console.error(e);
    throw new Error("subscribeMailApi Error: " + e);
  }
};

export default subscribeMailApi;
