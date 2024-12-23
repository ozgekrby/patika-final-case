import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import redisClient from "ok-backend-common/utils/redis-client.js";
import {
  convertToSeconds,
  invalidateAuthToken,
} from "ok-backend-common/utils/jwt-token.js";

const generateAuthToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
    authConfig.jwt_secret,
    { expiresIn: authConfig.auth_token_expires_in }
  );

  await redisClient.set(token, "valid", {
    EX: convertToSeconds(authConfig.auth_token_expires_in),
  });

  return token;
};

const generatePasswordResetToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    authConfig.jwt_secret,
    { expiresIn: authConfig.reset_password_token_expires_in }
  );

  await redisClient.set(token, "valid", {
    EX: convertToSeconds(authConfig.reset_password_token_expires_in),
  });

  return token;
};

const refreshAuthToken = async (user, token) => {
  await invalidateAuthToken(token);
  return await generateAuthToken(user);
};

export {
  generateAuthToken,
  generatePasswordResetToken,
  invalidateAuthToken,
  refreshAuthToken,
};
