import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import asyncHandler from '../utils/asyncHandler';

const validateRequest = (schema: AnyZodObject) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // validation
      await schema.parseAsync({
        body: req.body,
      });
      next();
    },
  );
};

export default validateRequest;
