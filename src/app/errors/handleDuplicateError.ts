/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources } from '../interface/error';

export const handleDuplicateError = (err: any) => {
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${err?.keyValue?.name} is already Exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
