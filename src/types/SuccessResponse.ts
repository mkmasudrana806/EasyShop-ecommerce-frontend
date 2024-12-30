export type TSuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
