import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // check user is exist

  const isUserExist = await User.isUserExistByCustomId(payload.id);

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, 'User not found');
  }

  // check user is deleted
  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, 'User is deleted');
  }

  // check user is blocked
  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'User is Blocked');
  }

  // checking password is correct
  const passwordMatch = await User.isPasswordMatch(
    payload.password,
    isUserExist?.password,
  );

  if (!passwordMatch) {
    throw new AppError(status.FORBIDDEN, 'Password is incorrect');
  }

  // create access token and send to client

  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '365d',
    },
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist?.needsPasswordChange,
  };
};

const changePassword = async (
  reqUser: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.isUserExistByCustomId(reqUser.userId);

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

  // check olg password match
  const passwordMatch = await User.isPasswordMatch(
    payload.oldPassword,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(status.FORBIDDEN, 'old password is incorrect');
  }

  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: user.id,
      role: user.role,
    },
    {
      password: hashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // check token is valid

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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

  if (
    user?.passwordChangeAt &&
    User.isJwtIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(status.UNAUTHORIZED, 'You are unauthorized user');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
