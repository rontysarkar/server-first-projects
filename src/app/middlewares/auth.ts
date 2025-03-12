import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../utils/asyncHandler';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      //   check token give an a user

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, 'You are unauthorized user');
      }
      // check token is valid

      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          // err
          if (err) {
            throw new AppError(
              status.UNAUTHORIZED,
              'You are unauthorized user',
            );
          }

          const role = (decoded as JwtPayload).role;

          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              status.UNAUTHORIZED,
              'You are unauthorized user',
            );
          }

          // decoded undefined
          req.user = decoded as JwtPayload;
          next();
        },
      );
    },
  );
};

export default auth;
