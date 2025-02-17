/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: '',
    },
  ];

  if (err instanceof ZodError) {
    const simplFideError = handleZodError(err);
    statusCode = simplFideError?.statusCode;
    message = simplFideError?.message;
    errorSources = simplFideError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simpleFideError = handleValidationError(err);
    statusCode = simpleFideError?.statusCode;
    message = simpleFideError?.message;
    errorSources = simpleFideError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simpleFideError = handleCastError(err);
    statusCode = simpleFideError?.statusCode;
    message = simpleFideError?.message;
    errorSources = simpleFideError?.errorSources;
  } else if (err?.code === 11000) {
    const simpleFideError = handleDuplicateError(err);
    statusCode = simpleFideError?.statusCode;
    message = simpleFideError?.message;
    errorSources = simpleFideError?.errorSources;
  } else if (err instanceof AppError) {
    const simpleFideError = handleDuplicateError(err);
    statusCode = err.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
