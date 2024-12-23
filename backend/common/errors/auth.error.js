import { AppError } from './app.error.js';

class MissingAccessTokenError extends AppError {
  constructor(message = 'Access token missing!') {
    super(message, 401, 'ACCESS_TOKEN_MISSING');
  }
}

class InvalidAccessTokenError extends AppError {
  constructor(message = 'Invalid access token!') {
    super(message, 401, 'INVALID_ACCESS_TOKEN');
  }
}

class AccessDeniedError extends AppError {
  constructor(message = 'Access denied!') {
    super(message, 403, 'ACCESS_DENIED');
  }
}

export {
  MissingAccessTokenError,
  InvalidAccessTokenError,
  AccessDeniedError,
};