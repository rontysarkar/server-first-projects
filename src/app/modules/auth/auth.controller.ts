import status from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(status.OK).json({
    success: true,
    message: 'login Successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  res.status(status.OK).json({
    success: true,
    message: 'Change Password Successfully',
    data: result,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);
  const { accessToken } = result;
  res.status(status.OK).json({
    success: true,
    message: 'refresh token  Successfully',
    data: {
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
