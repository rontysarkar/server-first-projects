import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../utils/asyncHandler';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      //   check token give an a user

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, 'You are unauthorized user');
      }

      // check token is valid

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, userId, iat  } = decoded;


      const user = await User.isUserExistByCustomId(userId);

      if (!user) {
        throw new AppError(status.NOT_FOUND, 'User not found');
      }

      // check user is deleted
      const isDeleted = user?.isDeleted;
      if (isDeleted) {
        throw new AppError(status.FORBIDDEN, 'User is Deleted ');
      }

      // check user is blocked
      if (user?.status === 'blocked') {
        throw new AppError(status.FORBIDDEN, 'User is blocked');
      }

      if(user?.passwordChangeAt && User.isJwtIssuedBeforePasswordChange(user.passwordChangeAt,iat as number)){
        throw new AppError(status.UNAUTHORIZED, 'You are unauthorized user');
      }



      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(status.UNAUTHORIZED, 'You are unauthorized user');
      }

      

      // decoded undefined
      req.user = decoded as JwtPayload;
      next();
    },
  );
};

export default auth;
