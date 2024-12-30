export type ErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: {
      path: string;
      message: string;
    }[];
    stack: string;
  };
};
