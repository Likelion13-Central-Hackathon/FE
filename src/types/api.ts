export type ApiEnvelope<T> = {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
  timeStamp: string;
};
