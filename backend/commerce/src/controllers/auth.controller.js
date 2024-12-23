import { catchAsyncError } from "ok-backend-common/utils/catch-async-error.js";
import * as UserService from "../services/user.service.js";
import { isOtpEnabled } from "../utils/otp.js";

import {
  generateAuthToken,
  generatePasswordResetToken,
  refreshAuthToken,
  invalidateAuthToken,
} from "../utils/jwt-token.js";

import {
  AccountExistsError,
  AccountNotFoundError,
  InvalidCredentialsError,
} from "../errors/auth.error.js";
import { getReqUser } from "../utils/req.js";
import { sendMail } from "ok-backend-common/utils/mailer.js";

const register = catchAsyncError(async (req, res, next) => {
  let isUserExist = await UserService.findByEmail(req.body.email);
  if (isUserExist) {
    return next(new AccountExistsError());
  }

  const user = await UserService.create(req.body);

  if (isOtpEnabled) {
  }

  let token = await generateAuthToken(user);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      token,
    },
  });
});

const login = catchAsyncError(async (req, res, next) => {
  const user = await UserService.findByEmail(req.body.email);
  if (!user) {
    return next(new AccountNotFoundError());
  }

  const isPasswordValid = await user.matchPassword(req.body.password);
  if (!isPasswordValid) {
    return next(new InvalidCredentialsError());
  }

  if (isOtpEnabled) {
  }

  let token = await generateAuthToken(user);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
      token,
    },
  });
});

const verifyOtp = catchAsyncError(async (req, res, next) => {});

const resendOtp = catchAsyncError(async (req, res, next) => {});

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserService.findByEmail(req.body.email);
  if (!user) {
    return next(new AccountNotFoundError());
  }

  const resetToken = await generatePasswordResetToken(user);
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  await sendMail({
    to: user.email,
    subject: "Şifre Sıfırlama Talebi",
    html: `Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın: \n\n ${resetUrl}`,
  });
});

const resetPassword = catchAsyncError(async (req, res, next) => {});

const checkAuth = catchAsyncError(async (req, res, next) => {
  const user = await getReqUser(req);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    },
  });
});

const logout = catchAsyncError(async (req, res, next) => {
  await invalidateAuthToken(req.token);

  res.status(200).json({
    success: true,
    message: "Successfully signed out",
  });
});

export {
  register,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  checkAuth,
  logout,
};
