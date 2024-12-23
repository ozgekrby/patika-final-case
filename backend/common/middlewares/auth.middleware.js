import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import redisClient from '../utils/redis-client.js';
import {
  MissingAccessTokenError,
  InvalidAccessTokenError,
  AccessDeniedError
} from '../errors/index.js'

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new MissingAccessTokenError())
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === 'undefined') {
    return next(new MissingAccessTokenError())
  }

  const tokenStatus = await redisClient.get(token);
  if (tokenStatus !== 'valid') {
    return next(new InvalidAccessTokenError())
  }

  jwt.verify(token, authConfig.jwt_secret, (err, user) => {
    if (err) {
      return next(new InvalidAccessTokenError())
    }
    req.user = user;
    req.token = token;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user.roles.some(role => roles.includes(role))) {
      return next(new AccessDeniedError())
    }
    next();
  };
};

export {
  authenticateToken,
  authorizeRoles
};